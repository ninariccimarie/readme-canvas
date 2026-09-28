import type { WidgetRenderProps } from "@readme-canvas/core";
import type { BannerConfig } from "./schema";

export function Preview({ section, theme }: WidgetRenderProps<BannerConfig>) {
  const src = section.config.imageUrl.trim();

  if (!src) {
    return (
      <p style={{ color: theme.tokens.secondary }}>Add a banner image URL.</p>
    );
  }

  const img = (
    <img
      src={src}
      alt={section.config.alt}
      style={{ width: section.config.width.trim() || "100%" }}
    />
  );

  return section.config.href.trim() ? (
    <a href={section.config.href}>{img}</a>
  ) : (
    img
  );
}
