export { discoverIntegrations } from "./discover";
export { GitHubProfileError } from "./github/error";
export { fetchGithubProfile } from "./github/fetch-profile";
export { mapGithubUser, type GithubUserResponse } from "./github/map-user";
export { integration as githubIntegration } from "./github/index";
export {
  buildShieldMarkdown,
  buildShieldUrl,
  shieldColorFromHex,
  type ShieldBadgeParams,
} from "./shields/url";
export { integration as shieldsIntegration } from "./shields/index";
