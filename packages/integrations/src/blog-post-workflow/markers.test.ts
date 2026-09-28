import { describe, expect, it } from "vitest";
import { integration } from "./index";
import {
  BLOG_POST_LIST_END,
  BLOG_POST_LIST_START,
  buildBlogPostMarkers,
} from "./markers";

describe("buildBlogPostMarkers", () => {
  it("emits start and end comment markers", () => {
    const markdown = buildBlogPostMarkers();

    expect(markdown).toContain(BLOG_POST_LIST_START);
    expect(markdown).toContain(BLOG_POST_LIST_END);
    expect(markdown.startsWith(BLOG_POST_LIST_START)).toBe(true);
    expect(markdown.endsWith(BLOG_POST_LIST_END)).toBe(true);
  });
});

describe("blog-post-workflow setup", () => {
  it("returns non-empty setup steps", () => {
    const steps = integration.setupInstructions({
      profile: null,
      theme: {
        id: "github-light",
        name: "GitHub",
        family: "github",
        mode: "light",
        tokens: {
          primary: "#0969da",
          secondary: "#656d76",
          accent: "#1a7f37",
          background: "#ffffff",
          text: "#1f2328",
        },
      },
    });

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]?.body.length).toBeGreaterThan(0);
  });
});
