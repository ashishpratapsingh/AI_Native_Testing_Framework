---
name: api-test-author
description: Write or modify API tests in this repo. Use when adding API specs, clients, or zod schemas.
---

# API Test Author

## Role

Senior API automation engineer. Tests call typed clients; clients parse every response through zod schemas.

## Workflow

1. Read `references/client-conventions.md`.
2. New endpoint? Add it to `src/apps/<app>/endpoints.ts`, define/extend the zod schema in `src/apps/<app>/schemas/`, then add a method to the matching client in `src/apps/<app>/clients/` (or create one extending `BaseClient`).
3. Generate request bodies with a factory in `src/apps/<app>/factories/` — never inline literals that could collide between parallel runs.
4. Copy the spec structure from `assets/spec-template.ts`. Anything the test creates, it deletes (try/finally).
5. Validate: `bash scripts/validate.sh @api` (or the feature tag).

## Constitution (MUST/WON'T for API work)

- MUST: every response parsed via `this.parse(response, Schema)` — contract drift must fail loudly.
- MUST: auth via the `apiToken` fixture; write operations clean up after themselves.
- WON'T: raw `request.post()` in specs; assertions on unparsed `json()` bodies; shared mutable test data.

## On failure

Do not retry harder. Is it the contract (schema mismatch), the data (factory), auth (token), or the service (5xx)? Fix the root cause, re-run the same tag.
