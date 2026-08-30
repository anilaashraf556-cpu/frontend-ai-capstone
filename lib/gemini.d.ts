export const GEMINI_MODEL_CANDIDATES: string[];
export const GEMINI_MODEL: string;

export function buildFallbackCarePlan(
  plant?: string,
  problem?: string
): {
  summary: string;
  environment: string;
  lighting: string;
  watering: string;
  soil: string;
  temperature: string;
  problemAnalysis: string;
  tips: string[];
};

export function parseGeminiJsonResponse(
  rawText: string | undefined,
  fallbackPlan?: {
    summary: string;
    environment: string;
    lighting: string;
    watering: string;
    soil: string;
    temperature: string;
    problemAnalysis: string;
    tips: string[];
  }
): any;
