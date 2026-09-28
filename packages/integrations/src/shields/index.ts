import type { Integration, Theme } from "@readme-canvas/core";
import { shieldColorFromHex } from "./url";

export const integration: Integration = {
  id: "shields",
  name: "Shields.io",
  docsUrl: "https://shields.io",
  supportsTheming: true,
  resolveTheme: (theme: Theme) => shieldColorFromHex(theme.tokens.primary),
  setupInstructions: () => [
    {
      title: "Badges",
      body: "Social and skill badges are rendered as Shields.io images. No extra GitHub setup is required.",
    },
  ],
};
