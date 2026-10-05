import { describe, expect, it } from "vitest";
import {
  buildStaticBadgeMarkdown,
  shieldColorParam,
} from "@readme-canvas/integrations";
import { generateContext, themeFixture } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import {
  normalizeSkillsConfig,
  skillsDefaultConfig,
  skillsSchema,
  type SkillItem,
  type SkillsConfig,
} from "./schema";

const typescript: SkillItem = {
  id: "typescript",
  name: "TypeScript",
  url: "https://www.typescriptlang.org",
  catalogId: "typescript",
  logo: "typescript",
  logoColor: "",
  logoSize: "",
  label: "",
  labelColor: "",
  color: "",
  link: "",
};

function config(partial: Partial<SkillsConfig>): SkillsConfig {
  return { ...skillsDefaultConfig, items: [typescript], ...partial };
}

function badgeUrl(markdown: string): URL {
  return new URL(markdown.match(/https:\/\/img\.shields\.io\/badge\/[^)\s]+/)?.[0] ?? "");
}

describe("skills schema", () => {
  it("accepts the default config", () => {
    expect(skillsSchema.parse(skillsDefaultConfig)).toEqual(skillsDefaultConfig);
  });

  it("rejects an unknown badge style", () => {
    expect(
      skillsSchema.safeParse({ ...skillsDefaultConfig, style: "pills" }).success,
    ).toBe(false);
  });

  it("maps legacy display styles to flat", () => {
    expect(normalizeSkillsConfig({ style: "badges" as never, items: [] }).style).toBe(
      "flat",
    );
  });
});

describe("skills generateMarkdown", () => {
  it("renders a heading and a linked static badge", () => {
    const markdown = generateMarkdown(generateContext(config({}), "skills"));
    const expected = buildStaticBadgeMarkdown({
      message: "TypeScript",
      color: themeFixture.tokens.primary,
      style: "flat",
      logo: "typescript",
    });

    expect(markdown).toContain("## Skills");
    expect(markdown).toContain(`[${expected}](https://www.typescriptlang.org)`);
  });

  it("puts the skill name and theme color in the badge path", () => {
    const markdown = generateMarkdown(generateContext(config({}), "skills"));
    const url = badgeUrl(markdown);

    expect(url.origin).toBe("https://img.shields.io");
    expect(url.pathname).toBe(
      `/badge/TypeScript-${shieldColorParam(themeFixture.tokens.primary)}`,
    );
    expect(url.searchParams.get("style")).toBe("flat");
    expect(url.searchParams.get("logo")).toBe("typescript");
  });

  it("applies the section style to every badge", () => {
    const markdown = generateMarkdown(
      generateContext(config({ style: "for-the-badge" }), "skills"),
    );

    expect(badgeUrl(markdown).searchParams.get("style")).toBe("for-the-badge");
  });

  it("uses per-item query params and color overrides", () => {
    const markdown = generateMarkdown(
      generateContext(
        config({
          items: [
            {
              ...typescript,
              url: null,
              logoColor: "white",
              logoSize: "auto",
              label: "lang",
              labelColor: "#111111",
              color: "#007ACC",
            },
          ],
        }),
        "skills",
      ),
    );
    const url = badgeUrl(markdown);

    expect(url.pathname).toBe("/badge/TypeScript-007ACC");
    expect(url.searchParams.get("logoColor")).toBe("white");
    expect(url.searchParams.get("logoSize")).toBe("auto");
    expect(url.searchParams.get("label")).toBe("lang");
    expect(url.searchParams.get("labelColor")).toBe("111111");
    expect(url.searchParams.get("color")).toBeNull();
    expect(url.searchParams.get("link")).toBeNull();
  });

  it("sets the link query param when provided", () => {
    const markdown = generateMarkdown(
      generateContext(
        config({
          items: [
            {
              ...typescript,
              url: null,
              link: "https://www.typescriptlang.org",
            },
          ],
        }),
        "skills",
      ),
    );

    expect(badgeUrl(markdown).searchParams.get("link")).toBe(
      "https://www.typescriptlang.org",
    );
  });

  it("omits empty skills and empty query params", () => {
    const markdown = generateMarkdown(
      generateContext(
        config({
          heading: "",
          items: [
            { ...typescript, url: null, name: "  " },
            { ...typescript, url: null, id: "go", name: "Go", logo: "" },
          ],
        }),
        "skills",
      ),
    );
    const url = badgeUrl(markdown);

    expect(markdown.startsWith("![Go](")).toBe(true);
    expect(url.searchParams.get("logo")).toBeNull();
    expect(markdown).not.toContain("TypeScript");
  });
});
