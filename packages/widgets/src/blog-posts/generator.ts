import type { WidgetGenerateContext } from "@readme-canvas/core";
import { buildBlogPostMarkers } from "@readme-canvas/integrations";
import type { BlogPostsConfig } from "./schema";

export function generateMarkdown({
  section,
}: WidgetGenerateContext<BlogPostsConfig>): string {
  const markers = buildBlogPostMarkers();
  const heading = section.config.heading.trim();

  return heading ? `## ${heading}\n\n${markers}` : markers;
}
