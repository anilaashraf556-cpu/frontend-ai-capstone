
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import {
  GEMINI_MODEL,
  buildFallbackCarePlan,
  parseGeminiJsonResponse,
} from "../lib/gemini.js";

dotenv.config({ path: ".env.local" });

const app = express();

// Basic API protection
const MAX_PLANT_LENGTH = 100;
const MAX_PROBLEM_LENGTH = 500;

app.use(cors());
app.use(express.json({ limit: "10kb" }));

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is missing from .env.local");
}

const ai = new GoogleGenAI({
  apiKey,
});

app.post("/api/care-plan", async (req, res) => {
  try {
    const { plant, problem } = req.body;

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

    // Problem validation
    if (
      problem !== undefined &&
      problem !== null &&
      typeof problem !== "string"
    ) {
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

    const prompt = `
You are PlantCare AI, a helpful plant-care assistant for beginner plant owners.

The user wants help caring for this plant:

Plant name: ${plant.trim()}

${
  problem?.trim()
    ? `The user reports this problem: ${problem.trim()}`
    : "The user has not reported a specific problem."
}

Create a simple and practical care plan.

Return ONLY valid JSON using this exact structure:

{
  "summary": "short overview of the plant and its general care",
  "environment": "where this plant generally grows best and suitable environment",
  "lighting": "simple lighting guidance",
  "watering": "simple watering guidance",
  "soil": "simple soil and drainage guidance",
  "temperature": "simple temperature guidance",
  "problemAnalysis": "if a problem was provided, explain possible causes and safe actions; otherwise return an empty string",
  "tips": [
    "tip 1",
    "tip 2",
    "tip 3",
    "tip 4"
  ]
}

Important:
- Use simple language suitable for beginners.
- Do not assume the user knows technical plant-care terms.
- Do not claim to diagnose a plant disease with certainty.
- If discussing a plant problem, provide possible causes rather than a definite diagnosis.
- Keep each section concise and practical.
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

    res.json(result);
  } catch (error) {
    console.error("AI error:", error);

    const fallbackPlan = buildFallbackCarePlan(plant, problem);
    res.status(200).json(fallbackPlan);
  }
});

app.listen(3001, () => {
  console.log("PlantCare AI server running on http://localhost:3001");
});