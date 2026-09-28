export interface GithubStatsParams {
  username: string;
  theme?: string;
}

export function buildGithubStatsUrl(params: GithubStatsParams): string {
  const url = new URL("https://github-readme-stats.vercel.app/api");
  url.searchParams.set("username", params.username);
  url.searchParams.set("show_icons", "true");

  if (params.theme) {
    url.searchParams.set("theme", params.theme);
  }

  return url.toString();
}

export function buildGithubStatsMarkdown(params: GithubStatsParams): string {
  return `![GitHub stats](${buildGithubStatsUrl(params)})`;
}
