import type { WidgetGenerateContext } from "@readme-canvas/core";
import type { AboutConfig } from "./schema";

export function generateMarkdown({
  profile,
  section,
}: WidgetGenerateContext<AboutConfig>): string {
  const name =
    section.config.headline.trim() ||
    profile?.name ||
    profile?.username ||
    "";
  const bio = section.config.body.trim() || profile?.bio || "";
  const chunks: string[] = [];

  if (section.config.showAvatar && profile?.avatarUrl) {
    chunks.push(
      `<img src="${profile.avatarUrl}" width="120" alt="${name || "avatar"}" />`,
    );
  }

  if (name) {
    chunks.push(`# ${name}`);
  }

  if (bio) {
    chunks.push(bio);
  }

  return chunks.join("\n\n");
}
