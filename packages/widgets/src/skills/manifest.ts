import type { WidgetManifest } from "@readme-canvas/core";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import { skillsDefaultConfig, skillsSchema, type SkillsConfig } from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<SkillsConfig> = {
  id: "skills",
  name: "Skills",
  category: "profile",
  description: "Languages and tools as icons, text, or Shields badges.",
  defaultConfig: skillsDefaultConfig,
  schema: skillsSchema,
  Preview,
  Settings,
  generateMarkdown,
  requiredIntegrations: ["shields"],
};
