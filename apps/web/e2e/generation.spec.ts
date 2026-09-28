import { expect, test } from "@playwright/test";
import {
  mockGithubUser,
  octocatPayload,
  stubClipboard,
  stubRemoteAssets,
} from "./fixtures";

test.describe("README generation workflow", () => {
  test.beforeEach(async ({ page }) => {
    await stubRemoteAssets(page);
    await stubClipboard(page);
  });

  test("imports a profile, composes Markdown, copies it, and shows setup steps", async ({
    page,
  }) => {
    await mockGithubUser(page, "octocat", 200, octocatPayload);
    await page.goto("/");

    await expect(page.getByRole("region", { name: "Section controls" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Visual preview" })).toBeVisible();
    await expect(
      page.getByRole("region", { name: "Generated Markdown" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Copy" })).toBeDisabled();

    await page.getByLabel("Headline").fill("Hello Canvas");
    await expect(page.getByRole("region", { name: "Visual preview" })).toContainText(
      "Hello Canvas",
    );
    await expect(page.getByRole("region", { name: "Generated Markdown" })).toContainText(
      "# Hello Canvas",
    );

    await page.getByRole("button", { name: "Copy" }).click();
    await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
    expect(await page.evaluate(() => (window as { __copied?: string }).__copied)).toBe(
      "# Hello Canvas",
    );

    await page.getByLabel("Add a section").selectOption("dividers");
    await expect(page.getByRole("region", { name: "Generated Markdown" })).toContainText(
      "---",
    );

    await page.getByLabel("GitHub username").first().fill("octocat");
    await page.getByRole("button", { name: "Import profile" }).click();
    await expect(page.getByText("Imported The Octocat (@octocat)")).toBeVisible();

    await page.getByLabel("Add a section").selectOption("github-stats");
    await expect(page.getByText("GitHub Readme Stats")).toBeVisible();
    await expect(page.getByRole("region", { name: "Generated Markdown" })).toContainText(
      "github-readme-stats.vercel.app",
    );
    await expect(page.getByRole("region", { name: "Generated Markdown" })).toContainText(
      "username=octocat",
    );

    await page.getByRole("switch", { name: "Enable About Me" }).click();
    await expect(
      page.getByRole("region", { name: "Generated Markdown" }),
    ).not.toContainText("# Hello Canvas");

    await page.getByLabel("Color mode").selectOption("dark");
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(page.getByRole("region", { name: "Generated Markdown" })).toContainText(
      "theme=dark",
    );
  });

  test("shows an alert when the GitHub user is missing", async ({ page }) => {
    await mockGithubUser(page, "missing", 404, { message: "Not Found" });
    await page.goto("/");

    await page.getByLabel("GitHub username").fill("missing");
    await page.getByRole("button", { name: "Import profile" }).click();

    await expect(page.getByRole("alert")).toContainText(
      'GitHub user "missing" was not found',
    );
  });
});
