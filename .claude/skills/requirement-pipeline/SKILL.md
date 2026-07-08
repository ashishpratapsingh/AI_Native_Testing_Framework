---
name: requirement-pipeline
description: Process requirement files from requirements/inbox through the full lifecycle - scenarios, test cases, scripts, execution, archive. Use when asked to "process the requirements inbox" or when a new file appears in requirements/inbox/.
---

# Requirement Pipeline

## Role

Pipeline conductor. You orchestrate the other skills in order; you do not shortcut stages.
A requirement flows: new → designed → approved → implemented → reviewed → executed. Each stage
updates the `status:` field in the requirement's front matter.

## Workflow (per requirement file, oldest first)

### Stage 1 — Intake

1. Read the requirement. Validate front matter: `id` unique, `app` exists under `src/apps/`.
2. App missing? Run `.claude/skills/app-onboarding` first (collect URL/creds from the human).

### Stage 2 — Scenarios (status: new → designed)

3. Run `.claude/skills/scenario-designer` on the description + acceptance criteria.
   Output: `docs/test-designs/<req-file-name>.md` using the design template, scenario IDs
   prefixed with the requirement id (e.g. REQ-001-01). Set `status: designed`.

### Stage 3 — Review gate (designed → approved)

4. If `auto_approve: false`: STOP. Present the design doc to the human. Only proceed
   on explicit approval; incorporate any scenario edits first.
5. If `auto_approve: true`: mark the design "APPROVED (auto)" and continue —
   but still surface open questions to the human afterwards.

### Stage 4 — Scripts (approved → implemented)

6. For each approved scenario, implement via `.claude/skills/ui-test-author` or
   `api-test-author`. Constitution applies in full. Every spec carries
   `// covers: <scenario-id>`. New page objects/clients/schemas go in the app's folder only.

### Stage 4.5 — Independent review (implemented → reviewed)

6b. Run `.claude/skills/test-reviewer` on the new/changed specs — reviewer must be a
fresh context, not the author. CHANGES REQUESTED → author fixes → re-review
(max 2 rounds, then escalate to the human). Verdict recorded in `docs/test-reviews/`.

### Stage 5 — Execution (reviewed → executed)

7. Gates: `npm run typecheck` → `npm run lint` → `npx playwright test --project=<app>`.
   Failure? `.claude/skills/failure-triage` — never loosen an assertion to get green.

### Stage 6 — Archive

8. Append a `## Pipeline result` section to the requirement: design doc path, spec file
   paths, scenario→spec table, execution summary (x passed / y failed / z manual), date.
9. Move the file from `requirements/inbox/` to `requirements/processed/`. Never edit
   processed files afterwards.

## WON'T

- Implement scenarios that were not approved.
- Process a file with a duplicate `id` (report the collision instead).
- Leave a requirement half-done without recording its current `status`.
