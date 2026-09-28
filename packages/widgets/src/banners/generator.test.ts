import { describe, expect, it } from "vitest";
import { generateContext } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { bannerDefaultConfig, bannerSchema } from "./schema";

describe("banner schema", () => {
  it("accepts the default config", () => {
    expect(bannerSchema.parse(bannerDefaultConfig)).toEqual(bannerDefaultConfig);
  });
});

describe("banner generateMarkdown", () => {
  it("returns an empty string without an image URL", () => {
    expect(generateMarkdown(generateContext(bannerDefaultConfig, "banners"))).toBe(
      "",
    );
  });

  it("wraps the image in a link when href is set", () => {
    const markdown = generateMarkdown(
      generateContext(
        {
          imageUrl: "https://example.com/banner.png",
          alt: "Hello",
          href: "https://example.com",
          width: "100%",
        },
        "banners",
      ),
    );

    expect(markdown).toBe(
      '<a href="https://example.com"><img src="https://example.com/banner.png" alt="Hello" width="100%" /></a>',
    );
  });
});
