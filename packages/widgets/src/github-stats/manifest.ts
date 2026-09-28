import type { WidgetManifest } from "@readme-canvas/core";
import { githubStatsIntegration } from "@readme-canvas/integrations";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import {
  githubStatsDefaultConfig,
  githubStatsSchema,
  type GithubStatsConfig,
} from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<GithubStatsConfig> = {
  id: "github-stats",
  name: "GitHub Stats",
  category: "stats",
  description: "GitHub Stats Extended cards: stats, top languages, pin, gist, or custom query params.",
  defaultConfig: githubStatsDefaultConfig,
  schema: githubStatsSchema,
  Preview,
  Settings,
  generateMarkdown,
  requiredIntegrations: ["github-stats"],
  setupInstructions: (ctx) => githubStatsIntegration.setupInstructions(ctx),
};
