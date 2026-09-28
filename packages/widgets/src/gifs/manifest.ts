import type { WidgetManifest } from "@readme-canvas/core";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import { gifDefaultConfig, gifSchema, type GifConfig } from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<GifConfig> = {
  id: "gifs",
  name: "GIF",
  category: "media",
  description: "An animated image, optionally wrapped in a link.",
  defaultConfig: gifDefaultConfig,
  schema: gifSchema,
  Preview,
  Settings,
  generateMarkdown,
};
