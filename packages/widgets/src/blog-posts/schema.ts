import { z } from "zod";

export const blogPostsSchema = z.object({
  heading: z.string(),
});

export type BlogPostsConfig = z.infer<typeof blogPostsSchema>;

export const blogPostsDefaultConfig: BlogPostsConfig = {
  heading: "Blog Posts",
};
