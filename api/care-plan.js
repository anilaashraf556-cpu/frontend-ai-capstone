import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { plant, problem } = req.body;

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
    });

    const prompt = `
You are PlantCare AI, a helpful plant-care assistant for beginner plant owners.

The user wants help caring for this plant:

Plant name: ${plant}

${
  problem
    ? `The user reports this problem: ${problem}`
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
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("AI returned an empty response.");
    }

    const result = JSON.parse(text);

    return res.status(200).json(result);
  } catch (error) {
    console.error("AI error:", error);

    return res.status(500).json({
      error: "Unable to generate the care plan right now.",
    });
  }
}