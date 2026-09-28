import type { WidgetRenderProps } from "@readme-canvas/core";
import type { BlogPostsConfig } from "./schema";

export function Preview({ section, theme }: WidgetRenderProps<BlogPostsConfig>) {
  const heading = section.config.heading.trim();

  return (
    <section style={{ color: theme.tokens.text }}>
      {heading ? <h2>{heading}</h2> : null}
      <p style={{ color: theme.tokens.secondary }}>
        Posts appear here after the Blog Post Workflow GitHub Action runs.
      </p>
    </section>
  );
}
