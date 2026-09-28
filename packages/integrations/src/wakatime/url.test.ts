import { describe, expect, it } from "vitest";
import { buildWakaTimeUrl } from "./url";

describe("buildWakaTimeUrl", () => {
  it("includes username and theme query params", () => {
    const url = new URL(
      buildWakaTimeUrl({ username: "octocat", theme: "merko" }),
    );

    expect(url.origin).toBe("https://github-stats-extended.vercel.app");
    expect(url.pathname).toBe("/api/wakatime");
    expect(url.searchParams.get("username")).toBe("octocat");
    expect(url.searchParams.get("theme")).toBe("merko");
  });
});
