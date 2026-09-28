# README Canvas

A free and open-source visual builder for GitHub profile READMEs.

README Canvas is not a Markdown editor and not another stats generator. It is a visual orchestration platform: paste a GitHub username, arrange sections, pick a theme, and copy production-ready Markdown. You should never need to write the README by hand.

It discovers existing GitHub profile tools, wraps them, and makes them configurable. It does not rebuild those tools.

## How it works

1. Paste a GitHub username.
2. Fetch public profile information.
3. Configure sections with dropdowns, toggles, and drag-and-drop.
4. Select a theme.
5. Watch the visual preview and generated Markdown update together.
6. Copy the Markdown.
7. Follow the in-app setup instructions to put it on GitHub.

## Phase 1

The first release is the complete generation workflow.

**Included**

- Public GitHub profile import (no login)
- Widgets: About, Socials, Skills, Blog Posts, Statistics, Banners, Dividers, GIFs, Tables
- Themes: GitHub, Cursor, Linear, Notion, Wise (light and dark)
- Integrations: Shields.io, GitHub Stats, WakaTime, Blog Post Workflow
- Live preview and Markdown, both always visible
- One-click copy and generated setup steps

**Not included**

- User accounts or cloud saves
- Custom theme editors
- Widget marketplaces or plugin installation

## Contributing

This project is built so you can add a feature without learning the whole app:

- **Widget** — a README section (About, Socials, a new card). Add a folder under `packages/widgets/`.
- **Theme** — a color palette. Add a folder under `packages/themes/`.
- **Integration** — a wrapper around an existing tool. Add a folder under `packages/integrations/`.

Do not change `apps/web` to register a widget, theme, or integration. If that seems required, the architecture is wrong.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the file layout, tests, and pull request conventions.

## Build and deploy

```text
pnpm install
pnpm dev          # Vite app at apps/web
pnpm test
pnpm typecheck
pnpm build
```

GitHub Actions runs lint, typecheck, tests, and a production build on every pull request and on every push to `main`.

Production is Cloudflare Pages. A deploy runs only after CI passes on `main`. Pull requests do not deploy. Do not connect this repository to Cloudflare’s native Git build — GitHub Actions is the only publisher.

Required GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## License

See [LICENSE](./LICENSE).
