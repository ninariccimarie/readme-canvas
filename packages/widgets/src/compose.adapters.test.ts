import { composeMarkdown } from "@readme-canvas/core";
import {
  BLOG_POST_LIST_START,
  buildGithubStatsMarkdown,
  buildWakaTimeMarkdown,
  resolveGithubReadmeStatsTheme,
} from "@readme-canvas/integrations";
import { describe, expect, it } from "vitest";
import { blogPostsDefaultConfig } from "./blog-posts/schema";
import { toWidgetRegistry } from "./discover";
import { githubStatsDefaultConfig } from "./github-stats/schema";
import { profileFixture, themeFixture } from "./testing/fixtures";
import { wakaTimeDefaultConfig } from "./wakatime/schema";

describe("composeMarkdown with adapter widgets", () => {
  it("joins GitHub Stats and Blog Posts, and omits disabled WakaTime", () => {
    const markdown = composeMarkdown({
      document: {
        profile: profileFixture,
        themeId: themeFixture.id,
        mode: themeFixture.mode,
        layout: {
          version: 1,
          sections: [
            {
              id: "stats-1",
              widgetId: "github-stats",
              enabled: true,
              config: githubStatsDefaultConfig,
            },
            {
              id: "blog-1",
              widgetId: "blog-posts",
              enabled: true,
              config: blogPostsDefaultConfig,
            },
            {
              id: "waka-1",
              widgetId: "wakatime",
              enabled: false,
              config: wakaTimeDefaultConfig,
            },
          ],
        },
      },
      theme: themeFixture,
      widgets: toWidgetRegistry(),
    });
    const statsTheme = resolveGithubReadmeStatsTheme(themeFixture);

    expect(markdown).toContain(
      buildGithubStatsMarkdown({
        username: profileFixture.username,
        theme: statsTheme,
      }),
    );
    expect(markdown).toContain(BLOG_POST_LIST_START);
    expect(markdown).not.toContain(
      buildWakaTimeMarkdown({
        username: profileFixture.username,
        theme: statsTheme,
      }),
    );
    expect(markdown.indexOf("GitHub Stats")).toBeLessThan(
      markdown.indexOf("Blog Posts"),
    );
  });
});
