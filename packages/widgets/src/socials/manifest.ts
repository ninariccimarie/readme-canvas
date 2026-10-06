import type { WidgetManifest } from "@readme-canvas/core";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import { socialsDefaultConfig, socialsSchema, type SocialsConfig } from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<SocialsConfig> = {
  id: "socials",
  name: "Socials",
  category: "profile",
  description: "Links to social platforms as Shields.io static badges with Simple Icons logos.",
  defaultConfig: socialsDefaultConfig,
  schema: socialsSchema,
  Preview,
  Settings,
  generateMarkdown,
  requiredIntegrations: ["shields"],
};
