import type { WidgetManifest } from "@readme-canvas/core";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import { tableDefaultConfig, tableSchema, type TableConfig } from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<TableConfig> = {
  id: "tables",
  name: "Table",
  category: "content",
  description: "A Markdown table with a caption, columns, and rows.",
  defaultConfig: tableDefaultConfig,
  schema: tableSchema,
  Preview,
  Settings,
  generateMarkdown,
};
