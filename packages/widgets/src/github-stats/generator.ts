import type { WidgetGenerateContext } from "@readme-canvas/core";
import { buildStatsExtendedMarkdown } from "@readme-canvas/integrations";
import { STATS_CARD_ALTS, statsParamsFromConfig } from "./card";
import { normalizeGithubStatsConfig, type GithubStatsConfig } from "./schema";

export function generateMarkdown({
  profile,
  theme,
  section,
}: WidgetGenerateContext<GithubStatsConfig>): string {
  const config = normalizeGithubStatsConfig(section.config);
  const params = statsParamsFromConfig(config, profile, theme);

  if (!params) {
    return "";
  }

  const card = buildStatsExtendedMarkdown(
    params,
    STATS_CARD_ALTS[params.card ?? "stats"],
  );
  const heading = config.heading.trim();

  return heading ? `## ${heading}\n\n${card}` : card;
}
