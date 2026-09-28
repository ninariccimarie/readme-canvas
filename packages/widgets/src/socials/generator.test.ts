import { describe, expect, it } from "vitest";
import { generateContext, themeFixture } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import {
  socialsDefaultConfig,
  socialsSchema,
  type SocialsConfig,
} from "./schema";

const github = {
  id: "github",
  name: "GitHub",
  url: "https://github.com/octocat",
  logo: "github",
  platformId: "github",
};

function config(partial: Partial<SocialsConfig>): SocialsConfig {
  return { ...socialsDefaultConfig, items: [github], ...partial };
}

describe("socials schema", () => {
  it("accepts the default config", () => {
    expect(socialsSchema.parse(socialsDefaultConfig)).toEqual(
      socialsDefaultConfig,
    );
  });

  it("rejects an unknown display style", () => {
    expect(
      socialsSchema.safeParse({ ...socialsDefaultConfig, style: "cards" })
        .success,
    ).toBe(false);
  });
});

describe("socials generateMarkdown", () => {
  it("renders text links", () => {
    const markdown = generateMarkdown(
      generateContext(config({ style: "text" }), "socials"),
    );

    expect(markdown).toContain("[GitHub](https://github.com/octocat)");
  });

  it("renders icons from simple-icons slugs", () => {
    const markdown = generateMarkdown(
      generateContext(config({ style: "icons" }), "socials"),
    );

    expect(markdown).toContain("cdn.simpleicons.org/github");
    expect(markdown).toContain('href="https://github.com/octocat"');
  });

  it("renders Shields badges with the theme color", () => {
    const markdown = generateMarkdown(
      generateContext(config({ style: "badges" }), "socials"),
    );
    const url = new URL(
      markdown.match(/https:\/\/img\.shields\.io\/static\/v1[^)\s]+/)?.[0] ?? "",
    );

    expect(url.origin + url.pathname).toBe("https://img.shields.io/static/v1");
    expect(url.searchParams.get("label")).toBe("GitHub");
    expect(url.searchParams.get("logo")).toBe("github");
    expect(url.searchParams.get("color")).toBe(
      themeFixture.tokens.primary.replace("#", ""),
    );
  });
});
