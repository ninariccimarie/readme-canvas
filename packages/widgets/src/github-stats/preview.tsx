import type { WidgetRenderProps } from "@readme-canvas/core";
import {
  buildGithubStatsUrl,
  resolveGithubReadmeStatsTheme,
} from "@readme-canvas/integrations";
import type { GithubStatsConfig } from "./schema";

export function Preview({
  profile,
  theme,
  section,
}: WidgetRenderProps<GithubStatsConfig>) {
  const username = section.config.username.trim() || profile?.username || "";
  const heading = section.config.heading.trim();

  if (!username) {
    return (
      <p style={{ color: theme.tokens.secondary }}>
        Add a GitHub username to show stats.
      </p>
    );
  }

  return (
    <section style={{ color: theme.tokens.text }}>
      {heading ? <h2>{heading}</h2> : null}
      <img
        src={buildGithubStatsUrl({
          username,
          theme: resolveGithubReadmeStatsTheme(theme),
        })}
        alt="GitHub stats"
      />
    </section>
  );
}
