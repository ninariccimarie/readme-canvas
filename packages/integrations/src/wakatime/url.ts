export interface WakaTimeParams {
  username: string;
  theme?: string;
}

export function buildWakaTimeUrl(params: WakaTimeParams): string {
  const url = new URL("https://github-readme-stats.vercel.app/api/wakatime");
  url.searchParams.set("username", params.username);

  if (params.theme) {
    url.searchParams.set("theme", params.theme);
  }

  return url.toString();
}

export function buildWakaTimeMarkdown(params: WakaTimeParams): string {
  return `![WakaTime](${buildWakaTimeUrl(params)})`;
}
