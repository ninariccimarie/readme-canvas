export const BLOG_POST_LIST_START = "<!-- BLOG-POST-LIST:START -->";
export const BLOG_POST_LIST_END = "<!-- BLOG-POST-LIST:END -->";

export function buildBlogPostMarkers(): string {
  return `${BLOG_POST_LIST_START}\n${BLOG_POST_LIST_END}`;
}
