import type { WidgetGenerateContext } from "@readme-canvas/core";
import {
  buildWakaTimeMarkdown,
  resolveGithubReadmeStatsTheme,
} from "@readme-canvas/integrations";
import type { WakaTimeConfig } from "./schema";

export function generateMarkdown({
  profile,
  theme,
  section,
}: WidgetGenerateContext<WakaTimeConfig>): string {
  const username = section.config.username.trim() || profile?.username || "";

  if (!username) {
    return "";
  }

  const card = buildWakaTimeMarkdown({
    username,
    theme: resolveGithubReadmeStatsTheme(theme),
  });
  const heading = section.config.heading.trim();

  return heading ? `## ${heading}\n\n${card}` : card;
}
