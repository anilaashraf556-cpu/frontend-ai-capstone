export const GEMINI_MODEL_CANDIDATES = [
  "gemini-3.6-flash",
  "gemini-2.5-flash",
  "gemini-1.5-flash",
];

export const GEMINI_MODEL = process.env.GEMINI_MODEL || GEMINI_MODEL_CANDIDATES[0];

export function buildFallbackCarePlan(plant, problem) {
  const plantName = (plant || "your plant").trim() || "your plant";
  const issue = (problem || "").trim();

  return {
    summary: `${plantName} usually benefits from steady care, consistent moisture, and a stable environment.`,
    environment: `Place ${plantName} in a bright spot with good airflow and avoid sudden temperature swings.`,
    lighting: issue
      ? "Use bright, indirect light and move the plant away from harsh afternoon sun if leaves are stressed."
      : "Provide bright, indirect light for healthy growth and even leaf color.",
    watering: issue
      ? "Water only when the soil is slightly dry, and avoid leaving the roots in soggy soil."
      : "Water when the top layer of soil feels dry, then allow excess water to drain fully.",
    soil: "Use a light, well-draining mix with drainage holes so roots stay healthy and oxygenated.",
    temperature: "Keep temperatures moderate and avoid cold drafts or heat blasts from vents and windows.",
    problemAnalysis: issue
      ? `A common cause is environmental stress. Check watering, light, and drainage first, then make small adjustments instead of over-correcting.`
      : "",
    tips: [
      "Check the soil before watering to prevent overwatering.",
      "Rotate the plant a little each week for even growth.",
      "Clean dust from leaves so the plant can photosynthesize better.",
      "Watch for signs of stress such as yellowing, drooping, or soft stems.",
    ],
  };
}

export function parseGeminiJsonResponse(rawText, fallbackPlan) {
  if (typeof rawText !== "string") {
    return fallbackPlan || buildFallbackCarePlan("your plant", "");
  }

  let text = rawText.trim();

  if (!text) {
    return fallbackPlan || buildFallbackCarePlan("your plant", "");
  }

  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}");

  if (startIndex !== -1 && endIndex > startIndex) {
    text = text.slice(startIndex, endIndex + 1);
  }

  try {
    return JSON.parse(text);
  } catch {
    return fallbackPlan || buildFallbackCarePlan("your plant", "");
  }
}
