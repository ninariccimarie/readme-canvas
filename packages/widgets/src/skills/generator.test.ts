import { describe, expect, it } from "vitest";
import { generateContext, themeFixture } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { skillsDefaultConfig, skillsSchema, type SkillsConfig } from "./schema";

const typescript = {
  id: "typescript",
  name: "TypeScript",
  url: "https://www.typescriptlang.org",
  logo: "typescript",
  catalogId: "typescript",
};

function config(partial: Partial<SkillsConfig>): SkillsConfig {
  return { ...skillsDefaultConfig, items: [typescript], ...partial };
}

describe("skills schema", () => {
  it("accepts the default config", () => {
    expect(skillsSchema.parse(skillsDefaultConfig)).toEqual(skillsDefaultConfig);
  });

  it("rejects an unknown display style", () => {
    expect(
      skillsSchema.safeParse({ ...skillsDefaultConfig, style: "pills" }).success,
    ).toBe(false);
  });
});

describe("skills generateMarkdown", () => {
  it("renders a heading and text links", () => {
    const markdown = generateMarkdown(
      generateContext(config({ style: "text" }), "skills"),
    );

    expect(markdown).toContain("## Skills");
    expect(markdown).toContain(
      "[TypeScript](https://www.typescriptlang.org)",
    );
  });

  it("renders Shields badges with the theme color", () => {
    const markdown = generateMarkdown(
      generateContext(config({ style: "badges" }), "skills"),
    );
    const url = new URL(
      markdown.match(/https:\/\/img\.shields\.io\/static\/v1[^)\s]+/)?.[0] ?? "",
    );

    expect(url.origin + url.pathname).toBe("https://img.shields.io/static/v1");
    expect(url.searchParams.get("label")).toBe("TypeScript");
    expect(url.searchParams.get("color")).toBe(
      themeFixture.tokens.primary.replace("#", ""),
    );
  });
});
