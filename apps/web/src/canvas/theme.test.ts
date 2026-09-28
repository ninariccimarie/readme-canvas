import { describe, expect, it } from "vitest";
import { currentTheme } from "./theme";

describe("currentTheme", () => {
  it("resolves a family and mode from the theme engine", () => {
    const theme = currentTheme("cursor", "dark");

    expect(theme.family).toBe("cursor");
    expect(theme.mode).toBe("dark");
    expect(theme.tokens.background).toBeTruthy();
  });

  it("falls back to GitHub light for an unknown family", () => {
    const theme = currentTheme("missing", "dark");

    expect(theme.id).toBe("github-light");
  });
});
