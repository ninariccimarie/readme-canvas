import type { Profile } from "@readme-canvas/core";
import { GitHubProfileError } from "./error";
import { mapGithubUser, type GithubUserResponse } from "./map-user";

const GITHUB_API_USER = "https://api.github.com/users";

export async function fetchGithubProfile(
  username: string,
  fetchImpl: typeof fetch = fetch,
): Promise<Profile> {
  const trimmed = username.trim();

  if (trimmed.length === 0) {
    throw new GitHubProfileError("GitHub username is required", null);
  }

  let response: Response;

  try {
    response = await fetchImpl(
      `${GITHUB_API_USER}/${encodeURIComponent(trimmed)}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "readme-canvas",
        },
      },
    );
  } catch (cause) {
    throw new GitHubProfileError(
      "Failed to reach the GitHub API",
      null,
      { cause },
    );
  }

  if (response.status === 404) {
    throw new GitHubProfileError(
      `GitHub user "${trimmed}" was not found`,
      404,
    );
  }

  if (!response.ok) {
    throw new GitHubProfileError(
      `GitHub API returned ${response.status}`,
      response.status,
    );
  }

  const payload = (await response.json()) as GithubUserResponse;
  return mapGithubUser(payload);
}
