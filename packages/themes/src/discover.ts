/// <reference types="vite/client" />

import type { ThemeFamily } from "./family";

interface ThemeFamilyModule {
  family: ThemeFamily;
}

const modules = import.meta.glob<ThemeFamilyModule>("./*/index.ts", {
  eager: true,
});

export function discoverFamilies(): ThemeFamily[] {
  return Object.values(modules)
    .map((module) => module.family)
    .filter((family): family is ThemeFamily => family != null)
    .sort((left, right) => left.id.localeCompare(right.id));
}
