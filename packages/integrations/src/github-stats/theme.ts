import type { Theme } from "@readme-canvas/core";

const GITHUB_README_STATS_THEMES: Record<string, string> = {
  "github-light": "default",
  "github-dark": "dark",
  "cursor-light": "graywhite",
  "cursor-dark": "radical",
  "linear-light": "default",
  "linear-dark": "tokyonight",
  "notion-light": "default",
  "notion-dark": "dark",
  "wise-light": "merko",
  "wise-dark": "chartreuse-dark",
};

export function resolveGithubReadmeStatsTheme(theme: Theme): string {
  return (
    GITHUB_README_STATS_THEMES[theme.id] ??
    (theme.mode === "dark" ? "dark" : "default")
  );
}
