import { describe, expect, it } from "vitest";
import { generateContext } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { tableDefaultConfig, tableSchema } from "./schema";

describe("table schema", () => {
  it("accepts the default config", () => {
    expect(tableSchema.parse(tableDefaultConfig)).toEqual(tableDefaultConfig);
  });
});

describe("table generateMarkdown", () => {
  it("returns an empty string for a blank table", () => {
    expect(generateMarkdown(generateContext(tableDefaultConfig, "tables"))).toBe(
      "",
    );
  });

  it("renders a caption and markdown table", () => {
    const markdown = generateMarkdown(
      generateContext(
        {
          caption: "Projects",
          columns: ["Name", "Link"],
          rows: [["Canvas", "https://example.com"]],
        },
        "tables",
      ),
    );

    expect(markdown).toBe(
      [
        "**Projects**",
        "",
        "| Name | Link |",
        "| --- | --- |",
        "| Canvas | https://example.com |",
      ].join("\n"),
    );
  });

  it("escapes pipe characters in cells", () => {
    const markdown = generateMarkdown(
      generateContext(
        {
          caption: "",
          columns: ["A|B"],
          rows: [["1|2"]],
        },
        "tables",
      ),
    );

    expect(markdown).toContain("| A\\|B |");
    expect(markdown).toContain("| 1\\|2 |");
  });
});
