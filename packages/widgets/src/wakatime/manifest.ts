import type { WidgetManifest } from "@readme-canvas/core";
import { wakaTimeIntegration } from "@readme-canvas/integrations";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import { wakaTimeDefaultConfig, wakaTimeSchema, type WakaTimeConfig } from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<WakaTimeConfig> = {
  id: "wakatime",
  name: "WakaTime",
  category: "stats",
  description: "A WakaTime coding-time card rendered by GitHub Stats Extended.",
  defaultConfig: wakaTimeDefaultConfig,
  schema: wakaTimeSchema,
  Preview,
  Settings,
  generateMarkdown,
  requiredIntegrations: ["wakatime"],
  setupInstructions: (ctx) => wakaTimeIntegration.setupInstructions(ctx),
};
