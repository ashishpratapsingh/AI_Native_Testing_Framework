# Failure Taxonomy

| Symptom | Likely layer | Fix location |
|---|---|---|
| Locator timeout / not found | Selector drift | Page object in `src/apps/<app>/pages/` |
| ZodError on parse | Contract drift | Schema in `src/apps/<app>/schemas/` (confirm with real response first) |
| 401/403 from API | Auth | `apiToken` fixture / `.env` creds |
| 409 / duplicate errors | Data collision | Factory in `src/apps/<app>/factories/` |
| 5xx from demo service | Service flake | Retry once; if persistent, mark known-issue, do not "fix" the test |
| TS error | Type contract | Fix the type at its definition, not with `any` |
| no-floating-promises lint | Missing await | Add the await; check surrounding logic for race it hid |
| Passes locally, fails in CI | Env difference | the app’s `env.ts` / CI config, never a sleep |
