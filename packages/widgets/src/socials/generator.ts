import type { DisplayStyle, WidgetGenerateContext } from "@readme-canvas/core";
import { buildShieldMarkdown } from "@readme-canvas/integrations";
import type { SocialItem, SocialsConfig } from "./schema";

function iconSrc(logo: string | null): string | null {
  if (!logo) {
    return null;
  }

  if (/^https?:\/\//.test(logo)) {
    return logo;
  }

  return `https://cdn.simpleicons.org/${logo}`;
}

function renderItem(
  item: SocialItem,
  style: DisplayStyle,
  color: string,
): string | null {
  const name = item.name.trim();
  const url = item.url.trim();

  if (!name || !url) {
    return null;
  }

  if (style === "text") {
    return `[${name}](${url})`;
  }

  if (style === "badges") {
    const badge = buildShieldMarkdown({
      label: name,
      color,
      logo: item.logo,
    });
    return `[${badge}](${url})`;
  }

  const src = iconSrc(item.logo);

  if (!src) {
    return `[${name}](${url})`;
  }

  return `<a href="${url}"><img src="${src}" alt="${name}" height="32" /></a>`;
}

export function generateMarkdown({
  section,
  theme,
}: WidgetGenerateContext<SocialsConfig>): string {
  const parts = section.config.items
    .map((item) =>
      renderItem(item, section.config.style, theme.tokens.primary),
    )
    .filter((part): part is string => part != null);

  if (parts.length === 0) {
    return "";
  }

  const body =
    section.config.style === "text" ? parts.join(" · ") : parts.join(" ");
  const heading = section.config.heading.trim();

  return heading ? `## ${heading}\n\n${body}` : body;
}
