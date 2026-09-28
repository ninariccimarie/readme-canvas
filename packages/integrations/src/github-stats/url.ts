export const STATS_EXTENDED_ORIGIN = "https://github-stats-extended.vercel.app";

export const STATS_EXTENDED_PATHS = {
  stats: "/api",
  "top-langs": "/api/top-langs",
  wakatime: "/api/wakatime",
  pin: "/api/pin",
  gist: "/api/gist",
  custom: "/api",
} as const;

export type StatsExtendedCard = keyof typeof STATS_EXTENDED_PATHS;

export interface StatsExtendedParams {
  card?: StatsExtendedCard;
  username?: string;
  repo?: string;
  gistId?: string;
  theme?: string;
  extraParams?: Record<string, string>;
}

export interface GithubStatsParams {
  username: string;
  theme?: string;
}

function decodePart(value: string): string {
  try {
    return decodeURIComponent(value.replaceAll("+", " "));
  } catch {
    return value;
  }
}

export function parseExtraQuery(raw: string): Record<string, string> {
  const params: Record<string, string> = {};
  const source = raw.trim().replace(/^\?/, "");

  if (source.length === 0) {
    return params;
  }

  const pairs = source.split(/[&\n]/);

  for (const pair of pairs) {
    const trimmed = pair.trim();

    if (trimmed.length === 0) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    const key = decodePart(
      separator === -1 ? trimmed : trimmed.slice(0, separator),
    ).trim();
    const value =
      separator === -1 ? "" : decodePart(trimmed.slice(separator + 1));

    if (key.length > 0) {
      params[key] = value;
    }
  }

  return params;
}

export function buildStatsExtendedUrl(params: StatsExtendedParams): string {
  const card = params.card ?? "stats";
  const url = new URL(STATS_EXTENDED_PATHS[card], STATS_EXTENDED_ORIGIN);
  const extras = params.extraParams ?? {};

  if (params.username) {
    url.searchParams.set("username", params.username);
  }

  if (params.repo) {
    url.searchParams.set("repo", params.repo);
  }

  if (params.gistId) {
    url.searchParams.set("id", params.gistId);
  }

  if (card === "stats" || card === "custom") {
    url.searchParams.set("show_icons", "true");
  }

  if (params.theme) {
    url.searchParams.set("theme", params.theme);
  }

  for (const [key, value] of Object.entries(extras)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}

export function buildStatsExtendedMarkdown(
  params: StatsExtendedParams,
  alt = "GitHub stats",
): string {
  return `![${alt}](${buildStatsExtendedUrl(params)})`;
}

export function buildGithubStatsUrl(params: GithubStatsParams): string {
  return buildStatsExtendedUrl({
    card: "stats",
    username: params.username,
    theme: params.theme,
  });
}

export function buildGithubStatsMarkdown(params: GithubStatsParams): string {
  return buildStatsExtendedMarkdown(
    {
      card: "stats",
      username: params.username,
      theme: params.theme,
    },
    "GitHub stats",
  );
}
