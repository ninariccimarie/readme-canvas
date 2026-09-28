import type { Integration } from "@readme-canvas/core";

export const integration: Integration = {
  id: "blog-post-workflow",
  name: "Blog Post Workflow",
  docsUrl: "https://github.com/gautamkrishnar/blog-post-workflow",
  supportsTheming: false,
  setupInstructions: () => [
    {
      title: "Add the GitHub Action",
      body: "Create .github/workflows/blog-post.yml in the profile repository. Use gautamkrishnar/blog-post-workflow to replace the BLOG-POST-LIST markers on a schedule. README Canvas only emits the markers; it does not scrape your blog.",
    },
  ],
};
