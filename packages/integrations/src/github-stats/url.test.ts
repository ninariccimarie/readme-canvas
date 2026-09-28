import { describe, expect, it } from "vitest";
import type { Theme } from "@readme-canvas/core";
import { resolveGithubReadmeStatsTheme } from "./theme";
import { buildGithubStatsUrl } from "./url";

const darkGithub: Theme = {
  id: "github-dark",
  name: "GitHub",
  family: "github",
  mode: "dark",
  tokens: {
    primary: "#4493f8",
    secondary: "#9198a1",
    accent: "#3fb950",
    background: "#0d1117",
    text: "#e6edf3",
  },
};

describe("buildGithubStatsUrl", () => {
  it("includes username and theme query params", () => {
    const url = new URL(
      buildGithubStatsUrl({ username: "octocat", theme: "dark" }),
    );

    expect(url.hostname).toBe("github-readme-stats.vercel.app");
    expect(url.searchParams.get("username")).toBe("octocat");
    expect(url.searchParams.get("theme")).toBe("dark");
  });
});

describe("resolveGithubReadmeStatsTheme", () => {
  it("maps a README Canvas theme onto an upstream theme name", () => {
    expect(resolveGithubReadmeStatsTheme(darkGithub)).toBe("dark");
  });
});
