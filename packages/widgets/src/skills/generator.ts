import type { DisplayStyle, WidgetGenerateContext } from "@readme-canvas/core";
import { buildShieldMarkdown } from "@readme-canvas/integrations";
import type { SkillItem, SkillsConfig } from "./schema";

function iconSrc(logo: string | null): string | null {
  if (!logo) {
    return null;
  }

  if (/^https?:\/\//.test(logo)) {
    return logo;
  }

  return `https://cdn.simpleicons.org/${logo}`;
}

function wrapLink(url: string | null, inner: string): string {
  const href = url?.trim();
  return href ? `[${inner}](${href})` : inner;
}

function renderItem(
  item: SkillItem,
  style: DisplayStyle,
  color: string,
): string | null {
  const name = item.name.trim();

  if (!name) {
    return null;
  }

  if (style === "text") {
    return wrapLink(item.url, name);
  }

  if (style === "badges") {
    const badge = buildShieldMarkdown({
      label: name,
      color,
      logo: item.logo,
    });
    return wrapLink(item.url, badge);
  }

  const src = iconSrc(item.logo);

  if (!src) {
    return wrapLink(item.url, name);
  }

  const image = `<img src="${src}" alt="${name}" height="32" />`;
  const href = item.url?.trim();
  return href ? `<a href="${href}">${image}</a>` : image;
}

export function generateMarkdown({
  section,
  theme,
}: WidgetGenerateContext<SkillsConfig>): string {
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
