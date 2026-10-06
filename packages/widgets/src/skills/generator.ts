import type { WidgetGenerateContext } from "@readme-canvas/core";
import { buildStaticBadgeMarkdown } from "@readme-canvas/integrations";
import { staticBadgeParamsFromSkill } from "./badge";
import { normalizeSkillsConfig, type SkillsConfig } from "./schema";

function wrapLink(url: string | null, inner: string): string {
  const href = url?.trim();
  return href ? `[${inner}](${href})` : inner;
}

export function generateMarkdown({
  section,
  theme,
}: WidgetGenerateContext<SkillsConfig>): string {
  const config = normalizeSkillsConfig(section.config);
  const parts = config.items
    .map((item) => {
      const params = staticBadgeParamsFromSkill(
        item,
        config.style,
        theme.tokens.primary,
      );

      if (!params) {
        return null;
      }

      return wrapLink(item.url, buildStaticBadgeMarkdown(params));
    })
    .filter((part): part is string => part != null);

  if (parts.length === 0) {
    return "";
  }

  const heading = config.heading.trim();
  const body = parts.join(" ");

  return heading ? `## ${heading}\n\n${body}` : body;
}
