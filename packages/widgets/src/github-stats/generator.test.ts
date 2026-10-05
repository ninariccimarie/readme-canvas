import { describe, expect, it } from "vitest";
import {
  STATS_EXTENDED_ORIGIN,
  buildStatsExtendedMarkdown,
  resolveGithubReadmeStatsTheme,
} from "@readme-canvas/integrations";
import { generateContext, profileFixture, themeFixture } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import {
  githubStatsDefaultConfig,
  githubStatsSchema,
  type GithubStatsConfig,
} from "./schema";

function config(partial: Partial<GithubStatsConfig>): GithubStatsConfig {
  return { ...githubStatsDefaultConfig, ...partial };
}

describe("github-stats schema", () => {
  it("accepts the default config", () => {
    expect(githubStatsSchema.parse(githubStatsDefaultConfig)).toEqual(
      githubStatsDefaultConfig,
    );
  });

  it("rejects an unknown card type", () => {
    expect(
      githubStatsSchema.safeParse(config({ card: "streak" as never })).success,
    ).toBe(false);
  });
});

describe("github-stats generateMarkdown", () => {
  it("wraps the stats card for the profile username", () => {
    const markdown = generateMarkdown(
      generateContext(githubStatsDefaultConfig, "github-stats"),
    );
    const card = buildStatsExtendedMarkdown(
      {
        card: "stats",
        username: profileFixture.username,
        theme: resolveGithubReadmeStatsTheme(themeFixture),
      },
      "GitHub stats",
    );

    expect(markdown).toContain("## GitHub Stats");
    expect(markdown).toContain(card);
    expect(markdown).toContain(STATS_EXTENDED_ORIGIN);
  });

  it("builds a top-langs card", () => {
    const markdown = generateMarkdown(
      generateContext(config({ card: "top-langs", heading: "" }), "github-stats"),
    );
    const url = new URL(
      markdown.match(/https:\/\/github-stats-extended\.vercel\.app[^)\s]+/)?.[0] ??
        "",
    );

    expect(url.pathname).toBe("/api/top-langs");
    expect(url.searchParams.get("username")).toBe(profileFixture.username);
  });

  it("requires a repo for pin cards", () => {
    expect(
      generateMarkdown(
        generateContext(config({ card: "pin", heading: "" }), "github-stats"),
      ),
    ).toBe("");

    const markdown = generateMarkdown(
      generateContext(
        config({ card: "pin", heading: "", repo: "hello-world" }),
        "github-stats",
      ),
    );

    expect(markdown).toContain("/api/pin");
    expect(markdown).toContain("repo=hello-world");
  });

  it("requires a gist id for gist cards", () => {
    expect(
      generateMarkdown(
        generateContext(config({ card: "gist", heading: "" }), "github-stats"),
      ),
    ).toBe("");

    const markdown = generateMarkdown(
      generateContext(
        config({ card: "gist", heading: "", gistId: "abc123" }),
        "github-stats",
      ),
    );

    expect(markdown).toContain("/api/gist");
    expect(markdown).toContain("id=abc123");
  });

  it("appends extra query params for custom cards", () => {
    const markdown = generateMarkdown(
      generateContext(
        config({
          card: "custom",
          heading: "",
          extraQuery: "hide=stars&custom_title=Octo",
        }),
        "github-stats",
      ),
    );
    const url = new URL(
      markdown.match(/https:\/\/github-stats-extended\.vercel\.app[^)\s]+/)?.[0] ??
        "",
    );

    expect(url.searchParams.get("hide")).toBe("stars");
    expect(url.searchParams.get("custom_title")).toBe("Octo");
  });

  it("lets extra query overwrite default show_icons", () => {
    const markdown = generateMarkdown(
      generateContext(
        config({ heading: "", extraQuery: "show_icons=false" }),
        "github-stats",
      ),
    );
    const url = new URL(
      markdown.match(/https:\/\/github-stats-extended\.vercel\.app[^)\s]+/)?.[0] ??
        "",
    );

    expect(url.searchParams.get("show_icons")).toBe("false");
  });

  it("defaults a partial config to the stats card", () => {
    const markdown = generateMarkdown(
      generateContext(
        { heading: "", username: "octocat" } as GithubStatsConfig,
        "github-stats",
      ),
    );
    const url = new URL(
      markdown.match(/https:\/\/github-stats-extended\.vercel\.app[^)\s]+/)?.[0] ??
        "",
    );

    expect(url.pathname).toBe("/api");
    expect(url.searchParams.get("username")).toBe("octocat");
  });

  it("prefers the configured username", () => {
    const markdown = generateMarkdown(
      generateContext(config({ heading: "", username: "torvalds" }), "github-stats"),
    );

    expect(markdown).toContain("username=torvalds");
    expect(markdown).not.toContain(`username=${profileFixture.username}`);
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
