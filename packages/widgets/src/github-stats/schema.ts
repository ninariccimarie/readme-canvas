import { z } from "zod";

export const statsCardSchema = z.enum([
  "stats",
  "top-langs",
  "pin",
  "gist",
  "custom",
]);

export const githubStatsSchema = z.object({
  heading: z.string(),
  username: z.string(),
  card: statsCardSchema,
  repo: z.string(),
  gistId: z.string(),
  extraQuery: z.string(),
});

export type GithubStatsConfig = z.infer<typeof githubStatsSchema>;

export const githubStatsDefaultConfig: GithubStatsConfig = {
  heading: "GitHub Stats",
  username: "",
  card: "stats",
  repo: "",
  gistId: "",
  extraQuery: "",
};

export function normalizeGithubStatsConfig(
  config: Partial<GithubStatsConfig>,
): GithubStatsConfig {
  return { ...githubStatsDefaultConfig, ...config };
}
