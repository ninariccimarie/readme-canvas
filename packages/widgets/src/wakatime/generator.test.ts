import { describe, expect, it } from "vitest";
import {
  buildWakaTimeMarkdown,
  resolveGithubReadmeStatsTheme,
} from "@readme-canvas/integrations";
import { generateContext, profileFixture, themeFixture } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { wakaTimeDefaultConfig, wakaTimeSchema } from "./schema";

describe("wakatime schema", () => {
  it("accepts the default config", () => {
    expect(wakaTimeSchema.parse(wakaTimeDefaultConfig)).toEqual(
      wakaTimeDefaultConfig,
    );
  });
});

describe("wakatime generateMarkdown", () => {
  it("wraps the adapter card for the profile username", () => {
    const markdown = generateMarkdown(
      generateContext(wakaTimeDefaultConfig, "wakatime"),
    );
    const card = buildWakaTimeMarkdown({
      username: profileFixture.username,
      theme: resolveGithubReadmeStatsTheme(themeFixture),
    });

    expect(markdown).toContain("## WakaTime");
    expect(markdown).toContain(card);
    expect(markdown).toContain("/api/wakatime");
  });

  it("returns an empty string without a username", () => {
    expect(
      generateMarkdown({
        ...generateContext(wakaTimeDefaultConfig, "wakatime"),
        profile: null,
      }),
    ).toBe("");
  });
});
