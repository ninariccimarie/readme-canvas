import type { WidgetRenderProps } from "@readme-canvas/core";
import { buildStatsExtendedUrl } from "@readme-canvas/integrations";
import { STATS_CARD_ALTS, statsParamsFromConfig } from "./card";
import { normalizeGithubStatsConfig, type GithubStatsConfig } from "./schema";

export function Preview({
  profile,
  theme,
  section,
}: WidgetRenderProps<GithubStatsConfig>) {
  const config = normalizeGithubStatsConfig(section.config);
  const params = statsParamsFromConfig(config, profile, theme);
  const heading = config.heading.trim();

  if (!params) {
    const hint =
      config.card === "pin"
        ? "Add a GitHub username and repository to pin."
        : config.card === "gist"
          ? "Add a gist id to show a gist card."
          : "Add a GitHub username to show stats.";

    return <p style={{ color: theme.tokens.secondary }}>{hint}</p>;
  }

  const alt = STATS_CARD_ALTS[params.card ?? "stats"];

  return (
    <section style={{ color: theme.tokens.text }}>
      {heading ? <h2>{heading}</h2> : null}
      <img src={buildStatsExtendedUrl(params)} alt={alt} />
    </section>
  );
}
