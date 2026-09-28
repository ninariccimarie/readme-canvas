import type { ColorMode, ThemeId } from "./ids";

export interface ThemeTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  family: string;
  mode: ColorMode;
  tokens: ThemeTokens;
}
