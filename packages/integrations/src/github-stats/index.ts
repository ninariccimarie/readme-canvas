import type { Integration } from "@readme-canvas/core";
import { resolveGithubReadmeStatsTheme } from "./theme";

export const integration: Integration = {
  id: "github-stats",
  name: "GitHub Stats Extended",
  docsUrl: "https://github.com/stats-organization/github-stats-extended",
  supportsTheming: true,
  resolveTheme: resolveGithubReadmeStatsTheme,
  setupInstructions: () => [
    {
      title: "GitHub Stats Extended",
      body: "Cards are loaded from github-stats-extended. Pin the public instance or deploy your own if the shared API is rate-limited. No repository secrets are required for public stats.",
    },
  ],
};
