import { buildStatsExtendedUrl } from "../github-stats/url";

export interface WakaTimeParams {
  username: string;
  theme?: string;
}

export function buildWakaTimeUrl(params: WakaTimeParams): string {
  return buildStatsExtendedUrl({
    card: "wakatime",
    username: params.username,
    theme: params.theme,
  });
}

export function buildWakaTimeMarkdown(params: WakaTimeParams): string {
  return `![WakaTime](${buildWakaTimeUrl(params)})`;
}
