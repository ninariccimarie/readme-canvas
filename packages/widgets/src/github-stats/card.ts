import type { Profile, Theme } from "@readme-canvas/core";
import {
  parseExtraQuery,
  resolveGithubReadmeStatsTheme,
  type StatsExtendedCard,
  type StatsExtendedParams,
} from "@readme-canvas/integrations";
import type { GithubStatsConfig } from "./schema";

export const STATS_CARD_ALTS: Record<StatsExtendedCard, string> = {
  stats: "GitHub stats",
  "top-langs": "Top languages",
  wakatime: "WakaTime",
  pin: "Repo pin",
  gist: "Gist",
  custom: "GitHub stats",
};

export function statsParamsFromConfig(
  config: GithubStatsConfig,
  profile: Profile | null,
  theme: Theme,
): StatsExtendedParams | null {
  const extraParams = parseExtraQuery(config.extraQuery ?? "");
  const username =
    (config.username ?? "").trim() ||
    profile?.username ||
    extraParams.username ||
    "";
  const repo = (config.repo ?? "").trim() || extraParams.repo || "";
  const gistId = (config.gistId ?? "").trim() || extraParams.id || "";
  const card = config.card ?? "stats";

  if (card === "gist") {
    if (!gistId) {
      return null;
    }

    return {
      card,
      gistId,
      username: username || undefined,
      theme: resolveGithubReadmeStatsTheme(theme),
      extraParams,
    };
  }

  if (card === "pin") {
    if (!username || !repo) {
      return null;
    }

    return {
      card,
      username,
      repo,
      theme: resolveGithubReadmeStatsTheme(theme),
      extraParams,
    };
  }

  if (!username) {
    return null;
  }

  return {
    card,
    username,
    theme: resolveGithubReadmeStatsTheme(theme),
    extraParams,
  };
}
