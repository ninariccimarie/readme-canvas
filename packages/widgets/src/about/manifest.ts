import type { WidgetManifest } from "@readme-canvas/core";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import { aboutDefaultConfig, aboutSchema, type AboutConfig } from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<AboutConfig> = {
  id: "about",
  name: "About Me",
  category: "profile",
  description: "Name, bio, and optional avatar from the GitHub profile.",
  defaultConfig: aboutDefaultConfig,
  schema: aboutSchema,
  Preview,
  Settings,
  generateMarkdown,
};
