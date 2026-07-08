# AI-Native Testing Framework

Playwright + TypeScript test framework built in two halves: a strictly-typed scaffold (left side of the system diagram) and an AI orchestration layer the agent reads (right side). Feedback loops gate all progress: execute → validate → pass means proceed; on failure, step back → evaluate → root cause → resolve → verify again.

## Quick start

```bash
cp .env.example .env
npm install
npx playwright install chromium
npm test                          # everything
npx playwright test --project=saucedemo        # one app's suite
npx playwright test --project=restful-booker   # another app's suite
npm run test:smoke                # only @smoke, across apps
npm run validate                  # typecheck + lint + format check
```

## Architecture: frozen core, pluggable apps

```
src/core/            ← the engine. Frozen — app work never touches it.
  config/            ← generic env loader (zod), timeouts, retries
  pages/base.page.ts ← POM base
  api/base.client.ts ← schema-parsing request wrapper
  enums/tags.ts      ← cross-cutting tags (@ui @api @smoke @regression)

src/apps/<app>/      ← one self-contained module per application under test
  env.ts             ← the app's own zod-validated env vars
  tags.ts            ← feature tags · routes.ts / endpoints.ts
  pages/ | clients/  ← page objects (UI) or typed clients + schemas/ (API)
  data/ | factories/ ← seeded + faker-generated test data
  fixtures.ts        ← exports test/expect for this app's specs

tests/<app>/         ← specs, one Playwright project per app
```

**Onboarding a new application is additive only**: a new `src/apps/<app>/` folder, a new `tests/<app>/` folder, one project entry in `playwright.config.ts`, new `.env` vars. Core and existing apps stay untouched — enforced by the constitution in `CLAUDE.md` and the `app-onboarding` skill. The two demo apps (`saucedemo`, `restful-booker`) are reference implementations; delete them once real apps are onboarded.

**Test layer** — tags (run only what changed), `test.step()` (readable reports), web-first assertions, teardown in every test.

**Static gates** — strict TS, ESLint (`no-floating-promises`), Prettier, Husky pre-commit.

**AI layer** — `CLAUDE.md` is the orchestrator (constitution, role, set loop). `.claude/skills/` are chapters loaded on demand: `app-onboarding`, `scenario-designer` (natural-language requirement → reviewable test design in `docs/test-designs/`), `ui-test-author`, `api-test-author`, `failure-triage`.

## CI/CD

`.github/workflows/tests.yml` — tiered: static gates + `@smoke` on every PR; full `@ui`/`@api` regression on main, nightly, and on demand. URLs come from GitHub Variables, credentials from Secrets.
