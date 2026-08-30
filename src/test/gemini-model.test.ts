import { describe, expect, it } from "vitest";
import { GEMINI_MODEL, GEMINI_MODEL_CANDIDATES } from "../../lib/gemini.js";

describe("Gemini model configuration", () => {
  it("uses a supported Gemini model name", () => {
    expect(GEMINI_MODEL_CANDIDATES).toContain(GEMINI_MODEL);
    expect(GEMINI_MODEL).toMatch(/^gemini-(1\.5|2\.0|2\.5|3\.6)/);
  });
});
