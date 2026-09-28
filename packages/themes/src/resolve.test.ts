import { describe, expect, it } from "vitest";
import { THEME_TOKEN_KEYS } from "./family";
import { listFamilies, listThemes, resolveTheme } from "./resolve";

const familyIds = ["cursor", "github", "linear", "notion", "wise"] as const;

describe("theme families", () => {
  it("discovers exactly five families", () => {
    const families = listFamilies();

    expect(families.map((family) => family.id)).toEqual([...familyIds]);
  });

  it("exposes all five tokens in light and dark", () => {
    for (const family of listFamilies()) {
      for (const mode of ["light", "dark"] as const) {
        expect(Object.keys(family.tokens[mode]).sort()).toEqual(
          [...THEME_TOKEN_KEYS].sort(),
        );
      }
    }
  });

  it("uses different background and text in light vs dark", () => {
    for (const family of listFamilies()) {
      expect(family.tokens.light.background).not.toBe(
        family.tokens.dark.background,
      );
      expect(family.tokens.light.text).not.toBe(family.tokens.dark.text);
    }
  });
});

describe("resolveTheme", () => {
  it("returns the matching pack for family and mode", () => {
    const theme = resolveTheme("github", "dark");
    const family = listFamilies().find((item) => item.id === "github");

    expect(theme).toMatchObject({
      id: "github-dark",
      name: "GitHub",
      family: "github",
      mode: "dark",
      tokens: family?.tokens.dark,
    });
  });

  it("returns undefined for an unknown family", () => {
    expect(resolveTheme("missing", "light")).toBeUndefined();
  });
});

describe("theme discovery integration", () => {
  it("resolves ten themes from five families", () => {
    const themes = listThemes();

    expect(themes).toHaveLength(10);
    expect(themes.filter((theme) => theme.mode === "light")).toHaveLength(5);
    expect(themes.filter((theme) => theme.mode === "dark")).toHaveLength(5);
  });
});
