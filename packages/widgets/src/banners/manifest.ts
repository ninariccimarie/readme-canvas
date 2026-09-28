import type { WidgetManifest } from "@readme-canvas/core";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import { bannerDefaultConfig, bannerSchema, type BannerConfig } from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<BannerConfig> = {
  id: "banners",
  name: "Banner",
  category: "media",
  description: "A full-width header or hero image for the README.",
  defaultConfig: bannerDefaultConfig,
  schema: bannerSchema,
  Preview,
  Settings,
  generateMarkdown,
};
