import { defineConfig, devices } from "@playwright/test";

const port = process.env.CI ? 4173 : 5173;
const command = process.env.CI
  ? `pnpm --filter web exec vite preview --host 127.0.0.1 --port ${port} --strictPort`
  : `pnpm --filter web exec vite --host 127.0.0.1 --port ${port} --strictPort`;

export default defineConfig({
  testDir: "apps/web/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
