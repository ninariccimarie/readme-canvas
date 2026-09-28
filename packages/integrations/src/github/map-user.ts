import type { Profile } from "@readme-canvas/core";

export interface GithubUserResponse {
  login?: string;
  name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  html_url?: string | null;
  followers?: number;
  following?: number;
  public_repos?: number;
  blog?: string | null;
  twitter_username?: string | null;
  location?: string | null;
  company?: string | null;
}

function emptyToNull(value: string | null | undefined): string | null {
  if (value == null) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

export function mapGithubUser(payload: GithubUserResponse): Profile {
  const username = emptyToNull(payload.login);

  if (!username) {
    throw new Error("GitHub user payload is missing login");
  }

  return {
    username,
    name: emptyToNull(payload.name),
    bio: emptyToNull(payload.bio),
    avatarUrl: emptyToNull(payload.avatar_url),
    profileUrl:
      emptyToNull(payload.html_url) ?? `https://github.com/${username}`,
    followers: payload.followers ?? 0,
    following: payload.following ?? 0,
    publicRepos: payload.public_repos ?? 0,
    blog: emptyToNull(payload.blog),
    twitterUsername: emptyToNull(payload.twitter_username),
    location: emptyToNull(payload.location),
    company: emptyToNull(payload.company),
  };
}
