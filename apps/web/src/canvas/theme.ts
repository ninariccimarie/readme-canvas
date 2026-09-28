import type { ColorMode, Theme } from "@readme-canvas/core";
import { resolveTheme } from "@readme-canvas/themes";

export function currentTheme(familyId: string, mode: ColorMode): Theme {
  const theme =
    resolveTheme(familyId, mode) ?? resolveTheme("github", "light");

  if (!theme) {
    throw new Error("No themes are registered");
  }

  return theme;
}
