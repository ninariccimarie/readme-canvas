import { describe, expect, it } from "vitest";
import { generateContext, profileFixture } from "../testing/fixtures";
import { generateMarkdown } from "./generator";
import { aboutDefaultConfig, aboutSchema } from "./schema";

describe("about schema", () => {
  it("accepts the default config", () => {
    expect(aboutSchema.parse(aboutDefaultConfig)).toEqual(aboutDefaultConfig);
  });

  it("rejects invalid config", () => {
    expect(aboutSchema.safeParse({ showAvatar: "yes" }).success).toBe(false);
  });
});

describe("about generateMarkdown", () => {
  it("includes name and bio from the profile fixture", () => {
    const markdown = generateMarkdown(
      generateContext(aboutDefaultConfig, "about"),
    );

    expect(markdown).toContain(profileFixture.name);
    expect(markdown).toContain(profileFixture.bio);
    expect(markdown).toContain(profileFixture.avatarUrl);
  });

  it("prefers headline and body overrides", () => {
    const markdown = generateMarkdown(
      generateContext(
        { showAvatar: false, headline: "Hello", body: "Builder" },
        "about",
      ),
    );

    expect(markdown).toContain("# Hello");
    expect(markdown).toContain("Builder");
    expect(markdown).not.toContain(profileFixture.avatarUrl);
  });
});
