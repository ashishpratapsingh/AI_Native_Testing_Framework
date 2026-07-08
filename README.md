# AI-Native Testing Framework

An automated quality-assurance system where an AI agent does the testing work — designing test scenarios from plain-English requirements, writing the test code, running it, and even repairing tests when they break — while humans stay in control through review checkpoints.

_The first half of this document is for everyone. The second half ("For engineers") is technical._

## What this is, in plain English

Every software team faces the same problem: features ship faster than anyone can test them. Manual testing doesn't scale, and traditional test automation is expensive — engineers spend weeks writing test code, and that code breaks every time the application changes.

This framework solves the problem differently. You describe what needs to be tested in ordinary language — the same way you'd write a user story:

> "As a hotel manager, I can search bookings by guest name, so I can find a guest's reservation."

From that one sentence, an AI agent produces a test plan (including negative cases and edge cases a person might forget), waits for a human to approve it, writes the automated test code, runs it, and reports the results. The whole trail — requirement, plan, code, result — is documented and linked, so anyone can audit what was tested and why.

## How work flows through the system

```
 Requirement (plain English, dropped in a folder)
      ↓
 Test scenarios      ← AI derives happy paths, negative paths, edge cases
      ↓
 ★ HUMAN REVIEW ★    ← a person approves the plan before any code is written
      ↓
 Test scripts        ← AI writes the code, following the project rulebook
      ↓
 Independent review  ← a second AI reviews the code against the plan
      ↓
 Execution           ← every check must pass before work is accepted
      ↓
 Audit trail         ← requirement archived with results and links to everything
```

The one non-negotiable: **nothing is automated without an approved plan.** The AI proposes; a person decides. That checkpoint is built into the process, not left to good intentions.

## Why the results can be trusted

An AI writing code sounds risky, and unconstrained it would be. Three safeguards make it reliable:

**A rulebook the AI must follow.** The repository contains a "constitution" — a strict set of MUST/WON'T rules (e.g. every test must clean up its own data; never hide a failure by weakening a check). The AI reads it before doing any work.

**Quality gates a machine enforces.** After the AI writes anything, automated checks run: a compiler, a code-quality linter, a formatter, and the tests themselves. If any gate fails, the work is rejected — the AI can't declare "done" until everything is green. The same gates run on every engineer's contribution too.

**Failures are investigated, never papered over.** When a test fails, the process forbids "try again and hope." The rule is: step back → evaluate the evidence → find the root cause → fix it at the source → verify again. If the test found a real product bug, the outcome is a bug report — not a "fixed" test.

## What happens when tests break (self-healing)

Applications change constantly — a renamed button can break a test overnight. Here, when the nightly test run fails, an AI agent automatically investigates the failure evidence and makes a judgment call: if the _test_ is outdated, it fixes the test and submits the fix for human review; if the _product_ is broken, it files a bug report with the evidence attached. Either way, the team wakes up to a diagnosis, not just a red dashboard.

## What this means for the business

Testing a new application no longer means weeks of test-code development — it means writing requirements. Coverage improves because the AI systematically derives edge cases. Every test traces back to a requirement, which auditors and stakeholders can follow without reading code. Maintenance cost drops because routine breakage is diagnosed and fixed automatically. And the humans on the team spend their time on the two things machines can't do: deciding what matters, and reviewing judgment calls.

## Glossary for non-technical readers

| Term               | Meaning                                                                |
| ------------------ | ---------------------------------------------------------------------- |
| Test scenario      | A single situation to verify, e.g. "wrong password shows an error"     |
| Test script / spec | The code that performs a scenario automatically                        |
| Smoke tests        | A small, fast set of critical checks — "is anything obviously broken?" |
| Regression tests   | The full, thorough suite — "did a change break anything anywhere?"     |
| CI/CD pipeline     | The automated conveyor belt that runs all checks whenever code changes |
| Quality gate       | A check that must pass before work can proceed                         |
| Pull request (PR)  | A proposed change, packaged for human review before it's accepted      |

---

# For engineers

Playwright + TypeScript, built in two halves: a strictly-typed scaffold and an AI orchestration layer (`CLAUDE.md` + skills) that any Claude agent reads before working in the repo. Feedback loops gate all progress: execute → validate → pass means proceed; on failure, step back → evaluate → root cause → resolve → verify again.

## Quick start

```bash
cp .env.example .env      # fill in your app's URL and credentials
npm install
npx playwright install chromium
npm test                              # everything
npx playwright test --project=khatova # one app's suite
npm run test:smoke                    # only @smoke, across apps
npm run validate                      # typecheck + lint + format check
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
requirements/        ← inbox/ (drop requirements here) → processed/ (audit trail)
docs/test-designs/   ← AI-generated, human-approved test designs
```

**Onboarding a new application is additive only**: a new `src/apps/<app>/` folder, a new `tests/<app>/` folder, one project entry in `playwright.config.ts`, new `.env` vars. Core and existing apps stay untouched — enforced by the constitution in `CLAUDE.md` and the `app-onboarding` skill. Current app: `khatova`.

**Test layer** — tags (run only what changed), `test.step()` (readable reports), web-first assertions, teardown in every test.

**Static gates** — strict TS, ESLint (`no-floating-promises`), Prettier, Husky pre-commit.

**AI layer** — `CLAUDE.md` is the orchestrator (constitution, role, set loop). `.claude/skills/` are chapters loaded on demand: `requirement-pipeline` (inbox → scenarios → review gate → scripts → execution → archive), `scenario-designer`, `app-onboarding`, `ui-test-author`, `api-test-author`, `test-reviewer` (independent semantic review of every new spec — reviewer is never the author; verdicts in `docs/test-reviews/`, also runs on every PR via `.github/workflows/test-review.yml`), `failure-triage`.

## The requirement pipeline

Copy `requirements/_template.md` into `requirements/inbox/`, fill in the description, then tell the agent "process the requirements inbox." Front-matter fields: `app` routes to the right module, `auto_approve: false` (default) enforces the human review gate, `status` tracks lifecycle (`new → designed → approved → implemented → executed`). Every generated spec carries `// covers: <scenario-id>` for requirement-to-test traceability.

## CI/CD

`.github/workflows/tests.yml` — tiered: static gates + `@smoke` on every PR; full `@ui`/`@api` regression on main, nightly, and on demand. URLs come from GitHub Variables, credentials from Secrets.

## Self-healing

Prevention (web-first assertions, `data-test` selectors, factories, teardown) plus precise failure localization (one symptom → one file) plus agent-driven repair. `.github/workflows/auto-triage.yml` completes the loop: when a main/nightly run fails, a Claude agent downloads the traces, runs the `failure-triage` skill, and either opens a PR fixing the root cause (test-side defects) or files an issue (product bugs) — never a silent runtime heal, never a loosened assertion. Requires the `ANTHROPIC_API_KEY` repo secret and "Allow GitHub Actions to create and approve pull requests" enabled.
