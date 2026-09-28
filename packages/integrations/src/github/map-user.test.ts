import { describe, expect, it } from "vitest";
import { mapGithubUser } from "./map-user";

describe("mapGithubUser", () => {
  it("maps a GitHub user payload onto Profile", () => {
    const profile = mapGithubUser({
      login: "octocat",
      name: "The Octocat",
      bio: "GitHub mascot",
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/octocat",
      followers: 4000,
      following: 9,
      public_repos: 8,
      blog: "https://github.blog",
      twitter_username: "github",
      location: "San Francisco",
      company: "GitHub",
    });

    expect(profile).toMatchObject({
      username: "octocat",
      name: "The Octocat",
      bio: "GitHub mascot",
      avatarUrl: "https://example.com/avatar.png",
      followers: 4000,
      following: 9,
      publicRepos: 8,
    });
  });

  it("treats empty optional strings as null", () => {
    const profile = mapGithubUser({
      login: "octocat",
      name: "  ",
      bio: "",
      blog: null,
    });

    expect(profile.name).toBeNull();
    expect(profile.bio).toBeNull();
    expect(profile.blog).toBeNull();
  });
});
