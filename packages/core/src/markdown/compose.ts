import type { ReadmeDocument } from "../domain/document";
import type { Theme } from "../domain/theme";
import { visibleSections } from "../layout/sections";
import type { WidgetRegistry } from "../registry/widget";

export interface ComposeMarkdownInput {
  document: ReadmeDocument;
  theme: Theme;
  widgets: WidgetRegistry;
}

export function composeMarkdown({
  document,
  theme,
  widgets,
}: ComposeMarkdownInput): string {
  const chunks: string[] = [];

  for (const section of visibleSections(document.layout)) {
    const widget = widgets.get(section.widgetId);

    if (!widget) {
      continue;
    }

    const markdown = widget
      .generateMarkdown({
        section,
        profile: document.profile,
        theme,
      })
      .trim();

    if (markdown.length === 0) {
      continue;
    }

    chunks.push(markdown);
  }

  return chunks.join("\n\n");
}
