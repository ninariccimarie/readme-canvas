import { describe, expect, it } from "vitest";
import {
  BLOG_POST_LIST_END,
  BLOG_POST_LIST_START,
  buildBlogPostMarkers,
} from "@readme-canvas/integrations";
import { generateContext } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { blogPostsDefaultConfig, blogPostsSchema } from "./schema";

describe("blog-posts schema", () => {
  it("accepts the default config", () => {
    expect(blogPostsSchema.parse(blogPostsDefaultConfig)).toEqual(
      blogPostsDefaultConfig,
    );
  });
});

describe("blog-posts generateMarkdown", () => {
  it("wraps the workflow markers with a heading", () => {
    const markdown = generateMarkdown(
      generateContext(blogPostsDefaultConfig, "blog-posts"),
    );

    expect(markdown).toContain("## Blog Posts");
    expect(markdown).toContain(buildBlogPostMarkers());
    expect(markdown).toContain(BLOG_POST_LIST_START);
    expect(markdown).toContain(BLOG_POST_LIST_END);
  });

  it("emits only markers when the heading is empty", () => {
    expect(
      generateMarkdown(generateContext({ heading: "" }, "blog-posts")),
    ).toBe(buildBlogPostMarkers());
  });
});
