import { describe, expect, it } from "vitest";
import { generateContext } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { dividerDefaultConfig, dividerSchema } from "./schema";

describe("divider schema", () => {
  it("accepts the default config", () => {
    expect(dividerSchema.parse(dividerDefaultConfig)).toEqual(
      dividerDefaultConfig,
    );
  });
});

describe("divider generateMarkdown", () => {
  it("emits a markdown rule for the line kind", () => {
    expect(
      generateMarkdown(generateContext(dividerDefaultConfig, "dividers")),
    ).toBe("---");
  });

  it("emits an image when kind is image", () => {
    const markdown = generateMarkdown(
      generateContext(
        {
          kind: "image",
          imageUrl: "https://example.com/line.gif",
          alt: "divider",
        },
        "dividers",
      ),
    );

    expect(markdown).toBe(
      '<img src="https://example.com/line.gif" alt="divider" />',
    );
  });
});
