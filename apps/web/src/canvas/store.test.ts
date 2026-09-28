import { describe, expect, it } from "vitest";
import { createCanvasStore } from "./store";

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("createCanvasStore", () => {
  it("imports a GitHub profile through the injected fetch", async () => {
    const store = createCanvasStore(async () =>
      jsonResponse(200, {
        login: "octocat",
        name: "The Octocat",
        bio: "Mascot",
        avatar_url: "https://example.com/avatar.png",
        html_url: "https://github.com/octocat",
        followers: 1,
        following: 2,
        public_repos: 3,
      }),
    );

    store.getState().setUsernameInput("octocat");
    await store.getState().importProfile();

    expect(store.getState().status).toBe("success");
    expect(store.getState().profile?.username).toBe("octocat");
    expect(store.getState().errorMessage).toBeNull();
  });

  it("stores a GitHubProfileError message on 404", async () => {
    const store = createCanvasStore(async () =>
      jsonResponse(404, { message: "Not Found" }),
    );

    store.getState().setUsernameInput("missing");
    await store.getState().importProfile();

    expect(store.getState().status).toBe("error");
    expect(store.getState().errorMessage).toMatch(/not found/i);
    expect(store.getState().profile).toBeNull();
  });

  it("wraps unexpected failures", async () => {
    const store = createCanvasStore(async () => {
      throw new TypeError("boom");
    });

    store.getState().setUsernameInput("octocat");
    await store.getState().importProfile();

    expect(store.getState().status).toBe("error");
    expect(store.getState().errorMessage).toBe("Failed to reach the GitHub API");
  });
});
