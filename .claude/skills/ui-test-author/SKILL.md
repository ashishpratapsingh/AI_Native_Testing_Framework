---
name: ui-test-author
description: Write or modify Playwright UI tests in this repo. Use when adding UI specs, page objects, or UI fixtures.
---

# UI Test Author

## Role
Senior UI automation engineer. You extend existing page objects and fixtures; you never put selectors or setup in specs.

## Workflow
1. Read `references/pom-conventions.md`.
2. Check if a page object for the target screen exists in `src/apps/<app>/pages/`. Extend it; only create a new one if the screen is new.
3. If the test needs login, use the `loggedInPage` fixture — do not script login inline.
4. Copy the spec structure from `assets/spec-template.ts`.
5. Validate: `bash scripts/validate.sh @ui` (or the feature tag you touched).

## Constitution (MUST/WON'T for UI work)
- MUST: selectors only in page objects; `data-test` attributes preferred.
- MUST: web-first assertions; every `test.step` labeled in plain English.
- MUST: tags from `src/core/enums/tags.ts and src/apps/<app>/tags.ts` on every test.
- WON'T: `waitForTimeout`, `force: true`, asserting on raw `innerText` when a locator assertion exists.

## On failure
Do not retry harder. Read the trace (`npx playwright show-report`), find the root cause (selector drift? timing? data?), fix at the source, re-run the same tag.
