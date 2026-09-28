import type { Integration } from "@readme-canvas/core";

export const integration: Integration = {
  id: "github",
  name: "GitHub",
  docsUrl: "https://docs.github.com/en/rest/users/users",
  supportsTheming: false,
  setupInstructions: () => [
    {
      title: "Public profile import",
      body: "README Canvas calls the unauthenticated GitHub REST API. The unauthenticated rate limit is 60 requests per hour per IP. Authentication is not required for the MVP.",
    },
  ],
};
