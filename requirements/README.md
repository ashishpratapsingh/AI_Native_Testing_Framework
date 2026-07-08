# Requirements — the pipeline's inbox

Drop a requirement file into `requirements/inbox/` (copy `_template.md`) and tell the
agent "process the requirements inbox". The agent runs the full pipeline:

```
inbox/<req>.md
   → test scenarios        docs/test-designs/<req>.md   (scenario-designer skill)
   → [HUMAN REVIEW GATE]   you approve the scenarios     (skip with auto_approve: true)
   → test cases            Given/When/Then per scenario, prioritized & tagged
   → test scripts          tests/<app>/*.spec.ts         (ui/api-test-author skills)
   → execution             npm run validate + npx playwright test --project=<app>
   → processed/<req>.md    requirement moved here with full traceability appended
```

Rules:

- One requirement per file, kebab-case name: `khatova-password-reset.md`.
- `app:` in the front matter must match a folder under `src/apps/`. If the app isn't
  onboarded yet, the agent runs `.claude/skills/app-onboarding` first.
- A requirement never skips the pipeline: no scripts without an approved design.
- `processed/` files are the audit trail — do not edit them; supersede with a new requirement.
