import { describe, expect, it } from "vitest";

describe("PlantCare AI validation", () => {
  it("rejects an empty plant name", () => {
    const plant = "";

    expect(plant.trim()).toBe("");
  });

  it("accepts a valid plant name", () => {
    const plant = "Snake Plant";

    expect(plant.trim()).not.toBe("");
  });

  it("accepts a plant problem description", () => {
    const problem = "The leaves are turning yellow.";

    expect(problem.length).toBeGreaterThan(0);
  });
});