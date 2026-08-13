# Contributing to README Canvas

Thank you for contributing. README Canvas is a visual builder for GitHub profile READMEs. Read this before opening a pull request.

## Start here

Read [`README.md`](./README.md) for product scope (what we build, what we do not).

If a pull request changes user-facing behavior, update `README.md` in the same change set. If it changes how contributors add widgets, themes, or integrations, update this file.

## Where to contribute

The repo is a monorepo. Application chrome lives in `apps/web`. Almost all product features land in packages:

| You want to add | Put it here | Do not edit |
| --- | --- | --- |
| A README section (About, Socials, a new card type) | `packages/widgets/` | `apps/web`, `packages/core` |
| A color palette | `packages/themes/` | `apps/web`, widgets |
| A wrapper around an existing tool (Shields, stats, WakaTime) | `packages/integrations/` | widgets (except to *call* the adapter) |

If adding a widget, theme, or integration requires changing application logic, the architecture is wrong. Stop and ask before patching `apps/web`.

## Add a widget

A widget is a user-facing section on the canvas (About, Socials, GitHub Stats). It is not an HTTP client.

1. Create a folder under `packages/widgets/src/<id>/`.
2. Add the self-contained files:

```text
packages/widgets/src/<id>/
├── manifest.ts       # id, name, category, schema, preview, settings, generateMarkdown
├── schema.ts         # Zod config + defaults
├── generator.ts      # Markdown only. No React.
├── preview.tsx       # README-faithful visual
├── settings.tsx      # sidebar controls
├── component.tsx     # optional canvas override; default is preview
└── README.md         # how to use this widget
```

3. Export a `manifest` from `manifest.ts`. Discovery is glob-based (`./*/manifest.ts`). Do not register the widget in `apps/web`.
4. If the widget wraps an existing GitHub-profile tool, call an adapter in `packages/integrations`. Do not inline upstream URLs.
5. Add unit tests next to `generator.ts`.
6. Stop. Do not edit other widgets or the editor shell.

The widget appears in the sidebar dropdown because the registry enumerates manifests.

## Add a theme

A theme is a design-token pack. Every theme exposes the same five tokens: `primary`, `secondary`, `accent`, `background`, `text`.

1. Create `packages/themes/src/<family>/` with `light.ts`, `dark.ts`, and `index.ts`.
2. Fill both modes. Meet contrast requirements.
3. Discovery is glob-based. Do not register the theme in `apps/web`.
4. Stop. Do not change widget previews or application chrome to hardcode colors.

Users pick a **family** (GitHub, Cursor, Linear, Notion, Wise) and a **mode** (light or dark). Do not treat dark mode as a separate product theme.

## Add an integration

An integration is an adapter around an existing tool. It is not a canvas section.

1. Create `packages/integrations/src/<id>/`.
2. Build URLs, Markdown snippets, or README markers from typed params.
3. Own setup-instruction copy (users should not leave the app to read upstream docs).
4. Declare whether theming is supported and how to map README Canvas tokens onto the upstream tool.
5. Add unit tests for builders. Mock HTTP. Do not call live APIs in CI.
6. Stop. Do not render sidebar UI here. A widget consumes the adapter.

Phase 1 adapters: GitHub profiles, Shields.io, GitHub Stats, WakaTime, Blog Post Workflow.

## Pull requests

- One concern per pull request.
- Use [Conventional Commits](https://www.conventionalcommits.org/) with a package scope when it applies: `feat(widgets):`, `feat(themes):`, `feat(integrations):`, `feat(core):`, `feat(web):`, `docs:`.
- Include tests in the same pull request as the code they cover.
- Do not mix a new widget with editor-shell changes.
- CI must pass (lint, typecheck, tests, production build). Pull requests do not deploy.
- Never commit secrets, `.env` files, or Cloudflare tokens.

Production deploys to Cloudflare Pages only when `main` is updated and CI has passed. Preview deploys from pull requests are not used.

## Questions

Open an issue if the change does not fit a widget, a theme, or an integration. That usually means it belongs in `packages/core` (shared contracts) and needs a maintainer review before it lands.
