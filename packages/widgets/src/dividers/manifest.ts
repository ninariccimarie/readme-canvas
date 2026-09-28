import type { WidgetManifest } from "@readme-canvas/core";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import { dividerDefaultConfig, dividerSchema, type DividerConfig } from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<DividerConfig> = {
  id: "dividers",
  name: "Divider",
  category: "layout",
  description: "A horizontal rule or image used to separate sections.",
  defaultConfig: dividerDefaultConfig,
  schema: dividerSchema,
  Preview,
  Settings,
  generateMarkdown,
};
