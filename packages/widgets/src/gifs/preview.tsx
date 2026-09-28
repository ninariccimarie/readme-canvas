import type { WidgetRenderProps } from "@readme-canvas/core";
import type { GifConfig } from "./schema";

export function Preview({ section, theme }: WidgetRenderProps<GifConfig>) {
  const src = section.config.src.trim();

  if (!src) {
    return <p style={{ color: theme.tokens.secondary }}>Add a GIF URL.</p>;
  }

  const img = (
    <img
      src={src}
      alt={section.config.alt}
      style={section.config.width.trim() ? { width: section.config.width } : undefined}
    />
  );

  return section.config.href.trim() ? (
    <a href={section.config.href}>{img}</a>
  ) : (
    img
  );
}
