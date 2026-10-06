import { describe, expect, it } from "vitest";
import {
  buildStaticBadgeMarkdown,
  shieldColorParam,
} from "@readme-canvas/integrations";
import { generateContext, profileFixture, themeFixture } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import {
  normalizeSocialsConfig,
  socialsDefaultConfig,
  socialsSchema,
  type SocialItem,
  type SocialsConfig,
} from "./schema";

const github: SocialItem = {
  id: "github",
  name: "GitHub",
  url: "https://github.com/octocat",
  platformId: "github",
  logo: "github",
  logoColor: "",
  logoSize: "",
  label: "",
  labelColor: "",
  color: "",
  link: "",
};

function config(partial: Partial<SocialsConfig>): SocialsConfig {
  return { ...socialsDefaultConfig, items: [github], ...partial };
}

function badgeUrl(markdown: string): URL {
  return new URL(markdown.match(/https:\/\/img\.shields\.io\/badge\/[^)\s]+/)?.[0] ?? "");
}

describe("socials schema", () => {
  it("accepts the default config", () => {
    expect(socialsSchema.parse(socialsDefaultConfig)).toEqual(socialsDefaultConfig);
  });

  it("rejects an unknown badge style", () => {
    expect(
      socialsSchema.safeParse({ ...socialsDefaultConfig, style: "cards" }).success,
    ).toBe(false);
  });

  it("maps legacy display styles to flat", () => {
    expect(normalizeSocialsConfig({ style: "icons" as never, items: [] }).style).toBe(
      "flat",
    );
  });
});

describe("socials generateMarkdown", () => {
  it("renders a linked static badge", () => {
    const markdown = generateMarkdown(
      generateContext(config({ heading: "Socials" }), "socials"),
    );
    const expected = buildStaticBadgeMarkdown({
      message: "GitHub",
      color: themeFixture.tokens.primary,
      style: "flat",
      logo: "github",
    });

    expect(markdown).toContain("## Socials");
    expect(markdown).toContain(`[${expected}](${profileFixture.profileUrl})`);
  });

  it("puts the name and theme color in the badge path", () => {
    const markdown = generateMarkdown(generateContext(config({}), "socials"));
    const url = badgeUrl(markdown);

    expect(url.origin).toBe("https://img.shields.io");
    expect(url.pathname).toBe(
      `/badge/GitHub-${shieldColorParam(themeFixture.tokens.primary)}`,
    );
    expect(url.searchParams.get("style")).toBe("flat");
    expect(url.searchParams.get("logo")).toBe("github");
    expect(url.searchParams.get("link")).toBeNull();
  });

  it("applies the section style to every badge", () => {
    const markdown = generateMarkdown(
      generateContext(config({ style: "for-the-badge" }), "socials"),
    );

    expect(badgeUrl(markdown).searchParams.get("style")).toBe("for-the-badge");
  });

  it("uses per-item query params including link", () => {
    const markdown = generateMarkdown(
      generateContext(
        config({
          items: [
            {
              ...github,
              url: "",
              logoColor: "white",
              logoSize: "auto",
              label: "social",
              labelColor: "#111111",
              color: "#000000",
              link: "https://github.com/octocat",
            },
          ],
        }),
        "socials",
      ),
    );
    const url = badgeUrl(markdown);

    expect(url.pathname).toBe("/badge/GitHub-000000");
    expect(url.searchParams.get("logoColor")).toBe("white");
    expect(url.searchParams.get("logoSize")).toBe("auto");
    expect(url.searchParams.get("label")).toBe("social");
    expect(url.searchParams.get("labelColor")).toBe("111111");
    expect(url.searchParams.get("link")).toBe("https://github.com/octocat");
    expect(markdown.startsWith("![GitHub](")).toBe(true);
  });
});
