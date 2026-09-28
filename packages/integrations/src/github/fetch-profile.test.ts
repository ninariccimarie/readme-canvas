import { describe, expect, it } from "vitest";
import { GitHubProfileError } from "./error";
import { fetchGithubProfile } from "./fetch-profile";

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("fetchGithubProfile", () => {
  it("returns a mapped profile for a 200 response", async () => {
    const profile = await fetchGithubProfile("octocat", async () =>
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

    expect(profile.username).toBe("octocat");
    expect(profile.name).toBe("The Octocat");
    expect(profile.bio).toBe("Mascot");
    expect(profile.avatarUrl).toBe("https://example.com/avatar.png");
    expect(profile.followers).toBe(1);
    expect(profile.following).toBe(2);
    expect(profile.publicRepos).toBe(3);
  });

  it("throws GitHubProfileError on 404", async () => {
    const error = await fetchGithubProfile("missing", async () =>
      jsonResponse(404, { message: "Not Found" }),
    ).catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(GitHubProfileError);
    expect(error).toMatchObject({ status: 404 });
  });

  it("wraps network failures in GitHubProfileError", async () => {
    const error = await fetchGithubProfile("octocat", async () => {
      throw new TypeError("Failed to fetch");
    }).catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(GitHubProfileError);
    expect(error).toMatchObject({ status: null });
    expect(error).not.toBeInstanceOf(TypeError);
  });
});
