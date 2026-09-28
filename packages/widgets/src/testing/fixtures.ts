import type {
  Profile,
  Theme,
  WidgetGenerateContext,
} from "@readme-canvas/core";

export const themeFixture: Theme = {
  id: "github-light",
  name: "GitHub",
  family: "github",
  mode: "light",
  tokens: {
    primary: "#0969da",
    secondary: "#656d76",
    accent: "#1a7f37",
    background: "#ffffff",
    text: "#1f2328",
  },
};

export const profileFixture: Profile = {
  username: "octocat",
  name: "The Octocat",
  bio: "GitHub mascot",
  avatarUrl: "https://example.com/avatar.png",
  profileUrl: "https://github.com/octocat",
  followers: 1,
  following: 1,
  publicRepos: 8,
  blog: null,
  twitterUsername: null,
  location: null,
  company: null,
};

export function generateContext<TConfig>(
  config: TConfig,
  widgetId: string,
): WidgetGenerateContext<TConfig> {
  return {
    profile: profileFixture,
    theme: themeFixture,
    section: {
      id: `${widgetId}-1`,
      widgetId,
      enabled: true,
      config,
    },
  };
}
