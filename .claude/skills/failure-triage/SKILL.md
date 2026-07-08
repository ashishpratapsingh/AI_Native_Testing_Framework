---
name: failure-triage
description: Diagnose failing tests in this repo. Use when any test, typecheck, or lint gate fails.
---

# Failure Triage

## Role

Debugger, not gambler. A failed gate is information — never re-run hoping it passes.

## The loop (from CLAUDE.md, enforced here)

1. **Step back** — stop editing. Collect evidence: full error, trace/screenshot (`npx playwright show-report`), which gate failed.
2. **Evaluate** — classify the failure using `references/failure-taxonomy.md`.
3. **Root cause** — trace the failure to its source layer (selector? schema? data? env? service?). The fix belongs where the cause lives, not where the symptom appeared.
4. **Resolve** — one targeted change at the source layer.
5. **Verify again** — re-run the exact failing gate, then the full tag. Pass → proceed.

## WON'T

- Loosen an assertion to make a test pass.
- Add waits/timeouts to paper over timing issues.
- Delete or skip a failing test without recording why.
