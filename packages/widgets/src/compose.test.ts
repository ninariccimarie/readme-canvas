import { composeMarkdown } from "@readme-canvas/core";
import { describe, expect, it } from "vitest";
import { aboutDefaultConfig } from "./about/schema";
import { toWidgetRegistry } from "./discover";
import { dividerDefaultConfig } from "./dividers/schema";
import { skillsDefaultConfig } from "./skills/schema";
import { profileFixture, themeFixture } from "./testing/fixtures";

describe("composeMarkdown with local widgets", () => {
  it("joins About, Socials badges, and a Divider, and omits disabled Skills", () => {
    const markdown = composeMarkdown({
      document: {
        profile: profileFixture,
        themeId: themeFixture.id,
        mode: themeFixture.mode,
        layout: {
          version: 1,
          sections: [
            {
              id: "about-1",
              widgetId: "about",
              enabled: true,
              config: aboutDefaultConfig,
            },
            {
              id: "socials-1",
              widgetId: "socials",
              enabled: true,
              config: {
                heading: "Socials",
                style: "badges",
                items: [
                  {
                    id: "github",
                    name: "GitHub",
                    url: profileFixture.profileUrl,
                    logo: "github",
                    platformId: "github",
                  },
                ],
              },
            },
            {
              id: "divider-1",
              widgetId: "dividers",
              enabled: true,
              config: dividerDefaultConfig,
            },
            {
              id: "skills-1",
              widgetId: "skills",
              enabled: false,
              config: {
                ...skillsDefaultConfig,
                items: [
                  {
                    id: "typescript",
                    name: "TypeScript",
                    url: null,
                    logo: "typescript",
                    catalogId: "typescript",
                  },
                ],
              },
            },
          ],
        },
      },
      theme: themeFixture,
      widgets: toWidgetRegistry(),
    });

    expect(markdown).toContain(`# ${profileFixture.name}`);
    expect(markdown).toContain("## Socials");
    expect(markdown).toContain("img.shields.io/static/v1");
    expect(markdown).toContain("---");
    expect(markdown).not.toContain("TypeScript");
    expect(markdown.indexOf(profileFixture.name ?? "")).toBeLessThan(
      markdown.indexOf("## Socials"),
    );
    expect(markdown.indexOf("## Socials")).toBeLessThan(markdown.indexOf("---"));
  });
});
