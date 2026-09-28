import type { WidgetGenerateContext } from "@readme-canvas/core";
import {
  buildGithubStatsMarkdown,
  resolveGithubReadmeStatsTheme,
} from "@readme-canvas/integrations";
import type { GithubStatsConfig } from "./schema";

export function generateMarkdown({
  profile,
  theme,
  section,
}: WidgetGenerateContext<GithubStatsConfig>): string {
  const username = section.config.username.trim() || profile?.username || "";

  if (!username) {
    return "";
  }

  const card = buildGithubStatsMarkdown({
    username,
    theme: resolveGithubReadmeStatsTheme(theme),
  });
  const heading = section.config.heading.trim();

  return heading ? `## ${heading}\n\n${card}` : card;
}
