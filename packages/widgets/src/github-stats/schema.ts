import { z } from "zod";

export const githubStatsSchema = z.object({
  heading: z.string(),
  username: z.string(),
});

export type GithubStatsConfig = z.infer<typeof githubStatsSchema>;

export const githubStatsDefaultConfig: GithubStatsConfig = {
  heading: "GitHub Stats",
  username: "",
};
