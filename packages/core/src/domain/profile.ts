export interface Profile {
  username: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string | null;
  profileUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
  blog: string | null;
  twitterUsername: string | null;
  location: string | null;
  company: string | null;
}
