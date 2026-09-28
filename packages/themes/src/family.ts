import type { ColorMode, ThemeTokens } from "@readme-canvas/core";

export const THEME_TOKEN_KEYS = [
  "primary",
  "secondary",
  "accent",
  "background",
  "text",
] as const satisfies ReadonlyArray<keyof ThemeTokens>;

export interface ThemeFamily {
  id: string;
  name: string;
  tokens: Record<ColorMode, ThemeTokens>;
}
