import type { WidgetManifest } from "@readme-canvas/core";
import { blogPostWorkflowIntegration } from "@readme-canvas/integrations";
import { generateMarkdown } from "./generator";
import { Preview } from "./preview";
import {
  blogPostsDefaultConfig,
  blogPostsSchema,
  type BlogPostsConfig,
} from "./schema";
import { Settings } from "./settings";

export const manifest: WidgetManifest<BlogPostsConfig> = {
  id: "blog-posts",
  name: "Blog Posts",
  category: "content",
  description:
    "Markers for gautamkrishnar/blog-post-workflow. README Canvas does not scrape your blog.",
  defaultConfig: blogPostsDefaultConfig,
  schema: blogPostsSchema,
  Preview,
  Settings,
  generateMarkdown,
  requiredIntegrations: ["blog-post-workflow"],
  setupInstructions: (ctx) =>
    blogPostWorkflowIntegration.setupInstructions(ctx),
};
