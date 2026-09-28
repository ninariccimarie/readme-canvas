import type { WidgetGenerateContext } from "@readme-canvas/core";
import type { DividerConfig } from "./schema";

export function generateMarkdown({
  section,
}: WidgetGenerateContext<DividerConfig>): string {
  if (section.config.kind === "image") {
    const src = section.config.imageUrl.trim();

    if (!src) {
      return "";
    }

    return `<img src="${src}" alt="${section.config.alt}" />`;
  }

  return "---";
}
