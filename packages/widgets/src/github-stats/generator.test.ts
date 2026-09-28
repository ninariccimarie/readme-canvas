import { describe, expect, it } from "vitest";
import {
  buildGithubStatsMarkdown,
  resolveGithubReadmeStatsTheme,
} from "@readme-canvas/integrations";
import { generateContext, profileFixture, themeFixture } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { githubStatsDefaultConfig, githubStatsSchema } from "./schema";

describe("github-stats schema", () => {
  it("accepts the default config", () => {
    expect(githubStatsSchema.parse(githubStatsDefaultConfig)).toEqual(
      githubStatsDefaultConfig,
    );
  });
});

describe("github-stats generateMarkdown", () => {
  it("wraps the adapter card for the profile username", () => {
    const markdown = generateMarkdown(
      generateContext(githubStatsDefaultConfig, "github-stats"),
    );
    const card = buildGithubStatsMarkdown({
      username: profileFixture.username,
      theme: resolveGithubReadmeStatsTheme(themeFixture),
    });

    expect(markdown).toContain("## GitHub Stats");
    expect(markdown).toContain(card);
  });

  it("prefers the configured username", () => {
    const markdown = generateMarkdown(
      generateContext(
        { heading: "", username: "torvalds" },
        "github-stats",
      ),
    );

    expect(markdown).toContain(
      buildGithubStatsMarkdown({
        username: "torvalds",
        theme: resolveGithubReadmeStatsTheme(themeFixture),
      }),
    );
    expect(markdown).not.toContain(profileFixture.username);
  });

  it("returns an empty string without a username", () => {
    expect(
      generateMarkdown({
        ...generateContext(githubStatsDefaultConfig, "github-stats"),
        profile: null,
      }),
    ).toBe("");
  });
});
