import { describe, expect, it } from "vitest";
import { hexForColorInput } from "./hex";

describe("hexForColorInput", () => {
  it("normalizes six-digit hex with or without a hash", () => {
    expect(hexForColorInput("#007ACC")).toBe("#007acc");
    expect(hexForColorInput("007ACC")).toBe("#007acc");
  });

  it("returns the fallback for named colors and empty values", () => {
    expect(hexForColorInput("white")).toBe("#000000");
    expect(hexForColorInput("")).toBe("#000000");
    expect(hexForColorInput("white", "#ffffff")).toBe("#ffffff");
  });
});
