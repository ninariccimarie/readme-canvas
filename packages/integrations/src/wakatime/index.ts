import type { Integration } from "@readme-canvas/core";
import { resolveGithubReadmeStatsTheme } from "../github-stats/theme";

export const integration: Integration = {
  id: "wakatime",
  name: "WakaTime",
  docsUrl: "https://wakatime.com",
  supportsTheming: true,
  resolveTheme: resolveGithubReadmeStatsTheme,
  setupInstructions: () => [
    {
      title: "Connect WakaTime",
      body: "Create a WakaTime account and use the same username as GitHub, or pass your WakaTime username. Coding-time cards are rendered by GitHub Stats Extended. README Canvas does not run a tracker of its own.",
    },
  ],
};
