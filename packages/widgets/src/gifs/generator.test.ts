import { describe, expect, it } from "vitest";
import { generateContext } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { gifDefaultConfig, gifSchema } from "./schema";

describe("gif schema", () => {
  it("accepts the default config", () => {
    expect(gifSchema.parse(gifDefaultConfig)).toEqual(gifDefaultConfig);
  });
});

describe("gif generateMarkdown", () => {
  it("returns an empty string without a src", () => {
    expect(generateMarkdown(generateContext(gifDefaultConfig, "gifs"))).toBe("");
  });

  it("emits an image tag", () => {
    const markdown = generateMarkdown(
      generateContext(
        {
          src: "https://example.com/wave.gif",
          alt: "wave",
          href: "",
          width: "200",
        },
        "gifs",
      ),
    );

    expect(markdown).toBe(
      '<img src="https://example.com/wave.gif" alt="wave" width="200" />',
    );
  });
});
