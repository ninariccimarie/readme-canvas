import { describe, expect, it } from "vitest";
import { discoverWidgets } from "./discover";

describe("discoverWidgets", () => {
  it("returns the local widget manifests discovered by glob", () => {
    const widgets = discoverWidgets();

    expect(widgets.map((widget) => widget.id)).toEqual([
      "about",
      "banners",
      "blog-posts",
      "dividers",
      "gifs",
      "github-stats",
      "skills",
      "socials",
      "tables",
      "wakatime",
    ]);
    expect(
      widgets.every((widget) => typeof widget.generateMarkdown === "function"),
    ).toBe(true);
  });
});
