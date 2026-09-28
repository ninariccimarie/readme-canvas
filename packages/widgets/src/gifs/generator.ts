import type { WidgetGenerateContext } from "@readme-canvas/core";
import type { GifConfig } from "./schema";

export function generateMarkdown({
  section,
}: WidgetGenerateContext<GifConfig>): string {
  const src = section.config.src.trim();

  if (!src) {
    return "";
  }

  const width = section.config.width.trim();
  const widthAttr = width ? ` width="${width}"` : "";
  const img = `<img src="${src}" alt="${section.config.alt}"${widthAttr} />`;
  const href = section.config.href.trim();

  return href ? `<a href="${href}">${img}</a>` : img;
}
