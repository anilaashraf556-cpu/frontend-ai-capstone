import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const { plant, problem } = req.body || {};

    if (!plant || !plant.trim()) {
      return res.status(400).json({
        error: "Plant name is required.",
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
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 700,
        temperature: 0.3,
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    const result = JSON.parse(text);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Care plan API error:", error);

    return res.status(500).json({
      error:
        "The AI service is temporarily unavailable. Please try again in a moment.",
    });
  }
}