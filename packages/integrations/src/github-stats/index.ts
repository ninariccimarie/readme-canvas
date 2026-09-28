import type { Integration } from "@readme-canvas/core";
import { resolveGithubReadmeStatsTheme } from "./theme";

export const integration: Integration = {
  id: "github-stats",
  name: "GitHub Stats",
  docsUrl: "https://github.com/anuraghazra/github-readme-stats",
  supportsTheming: true,
  resolveTheme: resolveGithubReadmeStatsTheme,
  setupInstructions: () => [
    {
      title: "GitHub Readme Stats",
      body: "Cards are loaded from github-readme-stats. Pin the public instance or deploy your own if the shared API is rate-limited. No repository secrets are required for public stats.",
    },
  ],
};
