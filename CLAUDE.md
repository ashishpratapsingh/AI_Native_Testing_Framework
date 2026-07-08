# AI-Native Testing Framework — Orchestrator

The agent reads this file first. It is the single entry point; everything else is
loaded on demand (progressive disclosure). Do not paste large files into context
that a skill reference already covers.

## Architecture: core vs apps

- `src/core/` — the engine: base classes, env loader, timeouts, cross-cutting tags.
  **Frozen.** App work NEVER modifies core. If core seems to need a change, stop and
  ask the human — that is a framework change, not an app change.
- `src/apps/<app>/` — one folder per application under test: its env schema, routes or
  endpoints, feature tags, page objects or clients, schemas, factories, fixtures.
- `tests/<app>/` — specs for that app, one Playwright project per app.
- Onboarding a new application is ADDITIVE ONLY: new folder under `src/apps/`, new folder
  under `tests/`, one project entry in `playwright.config.ts`, new vars in `.env`.
  Existing apps and core stay untouched. Use `.claude/skills/app-onboarding`.

## Constitution

### MUST
- Import `test`/`expect` from `src/apps/<app>/fixtures.ts`, never from `@playwright/test` directly in specs.
- Put every selector in a page object under `src/apps/<app>/pages/`. Specs contain zero selectors.
- Call API helpers in `src/apps/<app>/clients/`; specs never call `request.get/post` directly.
- Parse every API response through a zod schema in `src/apps/<app>/schemas/`.
- Read URLs, credentials, and secrets via the app's `env.ts` (zod-validated, backed by `.env`). Never hardcode them.
- Use enums for tags, routes, and endpoints: cross-cutting tags from `src/core/enums/tags.ts`,
  feature tags/routes/endpoints from the app's own files. No magic strings.
- Tag every test (`Tag.UI`/`Tag.API` + `Tag.Smoke`/`Tag.Regression` + an app feature tag).
- Wrap test phases in `test.step()` so reports read like documentation.
- Use web-first assertions (`await expect(locator)...`) — they wait so you do not.
- Clean up created data in the same test (try/finally or fixture teardown).
- Run `npm run validate` and the relevant tagged tests before declaring work done.

### SHOULD
- Generate dynamic data via factories in `src/apps/<app>/` (faker); keep seeded data in the app's `data/`.
- Prefer `data-test` attributes for selectors.
- Keep fixtures small and composable; extend the app's `fixtures.ts` rather than repeating setup.

### WON'T
- Never modify `src/core/` or another app's folder while working on an app.
- No `page.waitForTimeout()`, no `force: true`, no `.only` committed.
- No `any` types, no `@ts-ignore`, no disabling lint rules inline without a comment explaining why.
- No retry-harder loops: on failure, step back → evaluate → find root cause → resolve → verify again.

## Role

You are a senior test automation engineer on this repo. You extend the framework
following its existing patterns; you do not invent parallel structures.

## Workflow (the set loop)

0. **Check the inbox.** Files in `requirements/inbox/`? Run `.claude/skills/requirement-pipeline`:
   requirement → scenarios (`scenario-designer`) → human review gate → test cases → scripts
   (`ui-test-author`/`api-test-author`) → execution → archive to `requirements/processed/`.
   **Ad-hoc requirement in chat?** Use `.claude/skills/scenario-designer` directly: design doc
   in `docs/test-designs/`, stop at the review gate, only implement approved scenarios.
   **New application?** Use `.claude/skills/app-onboarding` first.
1. **Load context**: read only the files the task needs. For new test work, consult
   the matching skill in `.claude/skills/` first.
2. **Execute**: make the change following the constitution.
3. **Validate** (feedback loop gates progress):
   - `npm run typecheck` → pass?
   - `npm run lint` → pass?
   - `npx playwright test --project=<app> --grep <tag-you-touched>` → pass?
4. **Pass → proceed.** Failure → do NOT retry harder: step back, evaluate output,
   find the root cause, resolve, then verify again from step 3.

## Map of the repo

| Area | Path | Skill chapter |
|---|---|---|
| Engine (frozen) | `src/core/` | — |
| App env + enums | `src/apps/<app>/env.ts`, `tags.ts`, `routes.ts`/`endpoints.ts` | `.claude/skills/app-onboarding` |
| Schemas | `src/apps/<app>/schemas/` | `.claude/skills/api-test-author` |
| API clients | `src/apps/<app>/clients/` | `.claude/skills/api-test-author` |
| Page objects | `src/apps/<app>/pages/` | `.claude/skills/ui-test-author` |
| Fixtures | `src/apps/<app>/fixtures.ts` | both |
| Test data | `src/apps/<app>/data/`, `factories/` | both |
| Specs | `tests/<app>/` | both |
| Requirements in/out | `requirements/inbox/`, `processed/` | `.claude/skills/requirement-pipeline` |
| Test designs | `docs/test-designs/` | `.claude/skills/scenario-designer` |
| Failure triage | — | `.claude/skills/failure-triage` |

Current apps: `saucedemo` (UI demo), `restful-booker` (API demo). Delete them once real apps are onboarded.

## Context hygiene

- *