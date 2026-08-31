import { GoogleGenAI } from "@google/genai";
import {
  GEMINI_MODEL,
  buildFallbackCarePlan,
  parseGeminiJsonResponse,
} from "../lib/gemini.js";

// Production hygiene: max execution time for serverless
export const config = {
  maxDuration: 60,
};

// Simple in-memory rate limiter: 10 requests per minute per IP
const rateLimitStore = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const limit = 10; // requests per minute
  const window = 60000; // 1 minute in ms

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, []);
  }

  const timestamps = rateLimitStore.get(ip);
  const recentRequests = timestamps.filter((t) => now - t < window);

  if (recentRequests.length >= limit) {
    return true;
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);
  return false;
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  const window = 60000;

  for (const [ip, timestamps] of rateLimitStore.entries()) {
    const recentRequests = timestamps.filter((t) => now - t < window);
    if (recentRequests.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      rateLimitStore.set(ip, recentRequests);
    }
  }
}, 30000);

// Constants for input validation
const MAX_PLANT_LENGTH = 100;
const MAX_PROBLEM_LENGTH = 500;
const MAX_BODY_SIZE = 10240; // 10kb in bytes

export default async function handler(req, res) {
  // Set content-type for all responses
  res.setHeader("Content-Type", "application/json");

  // Rate limiting check
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: "Too many requests. Please wait before trying again.",
    });
  }
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    // Check body size
    const contentLength = parseInt(req.headers["content-length"] || "0", 10);
    if (contentLength > MAX_BODY_SIZE) {
      return res.status(413).json({
        error: "Request body is too large.",
      });
    }

    const { plant, problem } = req.body || {};

    // Plant name validation
    if (!plant || typeof plant !== "string" || !plant.trim()) {
      return res.status(400).json({
        error: "Plant name is required.",
      });
    }

    // Plant name length protection
    if (plant.trim().length > MAX_PLANT_LENGTH) {
      return res.status(400).json({
        error: `Plant name must be ${MAX_PLANT_LENGTH} characters or fewer.`,
      });
    }

    // Problem type validation
    if (problem !== undefined && problem !== null && typeof problem !== "string") {
      return res.status(400).json({
        error: "Plant problem must be text.",
      });
    }

    // Problem length protection
    if (problem && problem.trim().length > MAX_PROBLEM_LENGTH) {
      return res.status(400).json({
        error: `Problem description must be ${MAX_PROBLEM_LENGTH} characters or fewer.`,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing.");
      return res.status(500).json({
        error: "AI service is not configured.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        timeout: 30000,
      },
    });

    const prompt = `
You are PlantCare AI.

Create a short, practical plant care plan for a beginner.

Plant: ${plant.trim()}

Problem:
${problem?.trim() || "No specific problem reported."}

Return ONLY valid JSON:

{
  "summary": "short overview",
  "environment": "best environment",
  "lighting": "lighting advice",
  "watering": "watering advice",
  "soil": "soil and drainage advice",
  "temperature": "temperature advice",
  "problemAnalysis": "possible causes and safe actions, or empty string",
  "tips": ["tip 1", "tip 2", "tip 3", "tip 4"]
}

Keep every field concise.
Do not diagnose diseases with certainty.
Use simple language.
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 700,
        temperature: 0.3,
      },
    });

    const text = response.text;
    const result = parseGeminiJsonResponse(
      text,
      buildFallbackCarePlan(plant, problem)
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Care plan API error:", error);

    // Ensure fallback response always has valid data
    const safePlant = typeof plant === "string" ? plant : "your plant";
    const safeProblem = typeof problem === "string" ? problem : "";
    return res.status(200).json(
      buildFallbackCarePlan(safePlant, safeProblem)
    );
  }
}