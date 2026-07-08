# API Client Conventions

- One client class per resource, extending `BaseClient` (`src/core/api/base.client.ts`).
- Endpoints come from the `ApiEndpoint` enum — never inline path strings.
- Every method: make request → `this.parse(response, Schema)` → return typed value.
- `parse` throws on non-2xx and on schema mismatch; clients never swallow errors.
- Deletion/teardown helpers live on the client so tests can clean up in one call.
- Register new clients as fixtures in `src/apps/<app>/fixtures.ts`.
