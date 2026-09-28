export interface SocialPlatform {
  id: string;
  name: string;
  logo: string;
}

export const SOCIAL_PLATFORMS: readonly SocialPlatform[] = [
  { id: "github", name: "GitHub", logo: "github" },
  { id: "x", name: "X", logo: "x" },
  { id: "linkedin", name: "LinkedIn", logo: "linkedin" },
  { id: "youtube", name: "YouTube", logo: "youtube" },
  { id: "instagram", name: "Instagram", logo: "instagram" },
  { id: "discord", name: "Discord", logo: "discord" },
  { id: "twitch", name: "Twitch", logo: "twitch" },
  { id: "mastodon", name: "Mastodon", logo: "mastodon" },
];
