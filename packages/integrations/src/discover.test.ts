import { describe, expect, it } from "vitest";
import { discoverIntegrations } from "./discover";

describe("discoverIntegrations", () => {
  it("registers the five MVP adapters", () => {
    expect(discoverIntegrations().map((integration) => integration.id)).toEqual(
      [
        "blog-post-workflow",
        "github",
        "github-stats",
        "shields",
        "wakatime",
      ],
    );
  });
});
