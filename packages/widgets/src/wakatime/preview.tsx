import type { WidgetRenderProps } from "@readme-canvas/core";
import {
  buildWakaTimeUrl,
  resolveGithubReadmeStatsTheme,
} from "@readme-canvas/integrations";
import type { WakaTimeConfig } from "./schema";

export function Preview({
  profile,
  theme,
  section,
}: WidgetRenderProps<WakaTimeConfig>) {
  const username = section.config.username.trim() || profile?.username || "";
  const heading = section.config.heading.trim();

  if (!username) {
    return (
      <p style={{ color: theme.tokens.secondary }}>
        Add a WakaTime username to show coding stats.
      </p>
    );
  }

  return (
    <section style={{ color: theme.tokens.text }}>
      {heading ? <h2>{heading}</h2> : null}
      <img
        src={buildWakaTimeUrl({
          username,
          theme: resolveGithubReadmeStatsTheme(theme),
        })}
        alt="WakaTime"
      />
    </section>
  );
}
