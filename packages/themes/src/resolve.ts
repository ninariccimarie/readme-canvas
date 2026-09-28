import type { ColorMode, Theme } from "@readme-canvas/core";
import { discoverFamilies } from "./discover";
import type { ThemeFamily } from "./family";

export function listFamilies(): ThemeFamily[] {
  return discoverFamilies();
}

export function getFamily(familyId: string): ThemeFamily | undefined {
  return discoverFamilies().find((family) => family.id === familyId);
}

export function resolveTheme(
  familyId: string,
  mode: ColorMode,
): Theme | undefined {
  const family = getFamily(familyId);

  if (!family) {
    return undefined;
  }

  return {
    id: `${family.id}-${mode}`,
    name: family.name,
    family: family.id,
    mode,
    tokens: family.tokens[mode],
  };
}

export function listThemes(): Theme[] {
  return listFamilies().flatMap((family) => {
    const light = resolveTheme(family.id, "light");
    const dark = resolveTheme(family.id, "dark");
    return [light, dark].filter((theme): theme is Theme => theme != null);
  });
}
