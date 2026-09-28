import type { Page } from "@playwright/test";

export const octocatPayload = {
  login: "octocat",
  name: "The Octocat",
  bio: "GitHub mascot",
  avatar_url: "https://example.com/avatar.png",
  html_url: "https://github.com/octocat",
  followers: 1,
  following: 1,
  public_repos: 8,
};

export async function stubRemoteAssets(page: Page) {
  const emptySvg = "<svg xmlns=\"http://www.w3.org/2000/svg\"/>";

  await page.route("https://github-stats-extended.vercel.app/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      body: emptySvg,
    }),
  );
  await page.route("https://avatars.githubusercontent.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "image/png",
      body: Buffer.from(""),
    }),
  );
  await page.route("https://img.shields.io/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "image/svg+xml",
      body: emptySvg,
    }),
  );
}

export async function mockGithubUser(
  page: Page,
  username: string,
  status: number,
  body: unknown,
) {
  await page.route(`https://api.github.com/users/${username}`, (route) =>
    route.fulfill({
      status,
      contentType: "application/json",
      body: JSON.stringify(body),
    }),
  );
}

export async function stubClipboard(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          (window as unknown as { __copied?: string }).__copied = text;
        },
        readText: async () =>
          (window as unknown as { __copied?: string }).__copied ?? "",
      },
    });
  });
}
