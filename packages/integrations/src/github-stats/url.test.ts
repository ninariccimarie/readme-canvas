import { describe, expect, it } from "vitest";
import type { Theme } from "@readme-canvas/core";
import { resolveGithubReadmeStatsTheme } from "./theme";
import {
  STATS_EXTENDED_ORIGIN,
  buildGithubStatsUrl,
  buildStatsExtendedUrl,
  parseExtraQuery,
} from "./url";

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

describe("buildStatsExtendedUrl", () => {
  it("uses the GitHub Stats Extended host for the stats card", () => {
    const url = new URL(
      buildGithubStatsUrl({ username: "octocat", theme: "dark" }),
    );

    expect(url.origin).toBe(STATS_EXTENDED_ORIGIN);
    expect(url.pathname).toBe("/api");
    expect(url.searchParams.get("username")).toBe("octocat");
    expect(url.searchParams.get("theme")).toBe("dark");
    expect(url.searchParams.get("show_icons")).toBe("true");
  });

  it("builds top-langs, pin, and gist paths", () => {
    expect(
      new URL(
        buildStatsExtendedUrl({ card: "top-langs", username: "octocat" }),
      ).pathname,
    ).toBe("/api/top-langs");

    const pin = new URL(
      buildStatsExtendedUrl({
        card: "pin",
        username: "octocat",
        repo: "hello-world",
      }),
    );
    expect(pin.pathname).toBe("/api/pin");
    expect(pin.searchParams.get("repo")).toBe("hello-world");

    const gist = new URL(
      buildStatsExtendedUrl({ card: "gist", gistId: "abc123" }),
    );
    expect(gist.pathname).toBe("/api/gist");
    expect(gist.searchParams.get("id")).toBe("abc123");
  });

  it("merges extra query params after defaults", () => {
    const url = new URL(
      buildStatsExtendedUrl({
        card: "custom",
        username: "octocat",
        extraParams: { show_icons: "false", hide: "stars" },
      }),
    );

    expect(url.searchParams.get("show_icons")).toBe("false");
    expect(url.searchParams.get("hide")).toBe("stars");
  });
});

describe("parseExtraQuery", () => {
  it("parses query strings and newline pairs", () => {
    expect(parseExtraQuery("?hide=stars&show_icons=false")).toEqual({
      hide: "stars",
      show_icons: "false",
    });
    expect(parseExtraQuery("custom_title=Hello World\nhide_rank=true")).toEqual({
      custom_title: "Hello World",
      hide_rank: "true",
    });
  });
});

describe("resolveGithubReadmeStatsTheme", () => {
  it("maps a README Canvas theme onto an upstream theme name", () => {
    expect(resolveGithubReadmeStatsTheme(darkGithub)).toBe("dark");
  });
});
