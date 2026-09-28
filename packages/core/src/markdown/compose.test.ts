import { describe, expect, it } from "vitest";
import { z } from "zod";
import type { Layout } from "../domain/section";
import type { Profile } from "../domain/profile";
import type { Theme } from "../domain/theme";
import type { ReadmeDocument } from "../domain/document";
import type { WidgetManifest } from "../registry/widget";
import { composeMarkdown } from "./compose";
import { moveSection } from "../layout/sections";

const Empty = () => null;

const theme: Theme = {
  id: "test-light",
  name: "Test",
  family: "test",
  mode: "light",
  tokens: {
    primary: "#111111",
    secondary: "#222222",
    accent: "#333333",
    background: "#ffffff",
    text: "#000000",
  },
};

const profile: Profile = {
  username: "octocat",
  name: "The Octocat",
  bio: "GitHub mascot",
  avatarUrl: "https://example.com/avatar.png",
  profileUrl: "https://github.com/octocat",
  followers: 1,
  following: 1,
  publicRepos: 8,
  blog: null,
  twitterUsername: null,
  location: null,
  company: null,
};

function fakeWidget(
  id: string,
  markdown: (config: { text: string }) => string,
): WidgetManifest<{ text: string }> {
  return {
    id,
    name: id,
    category: "content",
    description: id,
    defaultConfig: { text: "" },
    schema: z.object({ text: z.string() }),
    Preview: Empty,
    Settings: Empty,
    generateMarkdown: ({ section }) => markdown(section.config),
  };
}

function documentFrom(layout: Layout): ReadmeDocument {
  return {
    profile,
    layout,
    themeId: theme.id,
    mode: theme.mode,
  };
}

function layoutOf(
  ...sections: Array<{
    id: string;
    widgetId: string;
    text: string;
    enabled?: boolean;
  }>
): Layout {
  return {
    version: 1,
    sections: sections.map((section) => ({
      id: section.id,
      widgetId: section.widgetId,
      enabled: section.enabled ?? true,
      config: { text: section.text },
    })),
  };
}

const alpha = fakeWidget("alpha", (config) => config.text);
const beta = fakeWidget("beta", (config) => config.text);
const blank = fakeWidget("blank", () => "   ");
const widgets = new Map<string, WidgetManifest>([
  [alpha.id, alpha],
  [beta.id, beta],
  [blank.id, blank],
]);

describe("composeMarkdown", () => {
  it("returns an empty string for an empty layout", () => {
    expect(
      composeMarkdown({
        document: documentFrom({ version: 1, sections: [] }),
        theme,
        widgets,
      }),
    ).toBe("");
  });

  it("omits disabled sections", () => {
    const markdown = composeMarkdown({
      document: documentFrom(
        layoutOf(
          { id: "1", widgetId: "alpha", text: "Hello" },
          { id: "2", widgetId: "beta", text: "Hidden", enabled: false },
        ),
      ),
      theme,
      widgets,
    });

    expect(markdown).toBe("Hello");
  });

  it("joins widget output with a blank line", () => {
    const markdown = composeMarkdown({
      document: documentFrom(
        layoutOf(
          { id: "1", widgetId: "alpha", text: "One" },
          { id: "2", widgetId: "beta", text: "Two" },
        ),
      ),
      theme,
      widgets,
    });

    expect(markdown).toBe("One\n\nTwo");
  });

  it("skips unknown widget ids", () => {
    const markdown = composeMarkdown({
      document: documentFrom(
        layoutOf(
          { id: "1", widgetId: "missing", text: "Nope" },
          { id: "2", widgetId: "alpha", text: "Yes" },
        ),
      ),
      theme,
      widgets,
    });

    expect(markdown).toBe("Yes");
  });

  it("skips whitespace-only generator output", () => {
    const markdown = composeMarkdown({
      document: documentFrom(
        layoutOf(
          { id: "1", widgetId: "blank", text: "" },
          { id: "2", widgetId: "alpha", text: "Kept" },
        ),
      ),
      theme,
      widgets,
    });

    expect(markdown).toBe("Kept");
  });

  it("follows layout order after moveSection", () => {
    const original = layoutOf(
      { id: "1", widgetId: "alpha", text: "First" },
      { id: "2", widgetId: "beta", text: "Second" },
    );
    const reordered = moveSection(original, "2", 0);

    expect(
      composeMarkdown({
        document: documentFrom(reordered),
        theme,
        widgets,
      }),
    ).toBe("Second\n\nFirst");
  });
});

describe("composeMarkdown integration", () => {
  it("runs two fake widgets through layout and composer", () => {
    const markdown = composeMarkdown({
      document: documentFrom(
        layoutOf(
          { id: "about", widgetId: "alpha", text: "# About" },
          { id: "skills", widgetId: "beta", text: "- TypeScript" },
        ),
      ),
      theme,
      widgets,
    });

    expect(markdown).toBe("# About\n\n- TypeScript");
  });
});
