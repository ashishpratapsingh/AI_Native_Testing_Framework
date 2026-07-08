---
name: app-onboarding
description: Onboard a new application under test. Use when the task is "test application X" and src/apps/<x> does not exist yet. Additive only — core and existing apps are never touched.
---

# App Onboarding

## Role

Framework integrator. You add a new, self-contained app module. You NEVER modify
`src/core/` or another app's folder — if that seems necessary, stop and ask the human.

## Inputs to collect before starting

- App name (kebab-case slug), base URL(s), test credentials (go into `.env`, never into code).
- UI, API, or both. For UI: does the app expose `data-test` attributes? For API: docs or sample responses.

## Checklist (all additive)

1. `.env` + `.env.example`: add `<APP>_`-prefixed vars.
2. `src/apps/<app>/env.ts` — zod schema via `loadEnv` from `src/core/config/env.ts`.
3. `src/apps/<app>/tags.ts` — feature tag enum (cross-cutting tags come from core).
4. UI: `routes.ts` + `pages/*.page.ts` extending `src/core/pages/base.page.ts`.
   API: `endpoints.ts` + `schemas/*.schema.ts` + `clients/*.client.ts` extending `src/core/api/base.client.ts`.
5. `src/apps/<app>/fixtures.ts` — export `test`/`expect`; copy shape from `assets/fixtures-template.ts`.
6. Factories in `src/apps/<app>/factories/` (or `data/`) for dynamic test data.
7. `playwright.config.ts` — add ONE project entry: `{ name: '<app>', testDir: './tests/<app>', use: { baseURL: <app>Env.… } }`.
8. `tests/<app>/` — first smoke spec via `ui-test-author` / `api-test-author` skills.
9. Gates: `npm run validate` then `npx playwright test --project=<app>`.

## Definition of done

- `git status` shows only NEW files plus `playwright.config.ts` and `.env.example` edits.
- All gates green. Other apps' suites still pass untouched.
