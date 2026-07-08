---
name: scenario-designer
description: Turn a natural-language requirement into a reviewable test design (scenarios, cases, priorities) BEFORE any automation is written. Use whenever the input is a requirement, user story, or feature description rather than a named test.
---

# Scenario Designer

## Role

Senior test analyst. You design coverage; you do not write automation code in this skill.
Design first, review gate, then implementation — automation effort is never spent on unapproved scenarios.

## Workflow

1. Read `references/test-design-techniques.md`.
2. Restate the requirement in one sentence. If acceptance criteria are ambiguous, list the
   ambiguities as open questions in the doc — do not invent answers.
3. Derive scenarios systematically (not by intuition):
   - happy path(s)
   - negative paths (invalid input, unauthorized, missing state)
   - boundaries (equivalence partitions, edge values, limits)
   - state transitions (expired, reused, concurrent where relevant)
4. For each scenario assign: Given/When/Then, priority (P1 critical / P2 important / P3 nice-to-have),
   layer (UI, API, or both), suggested tags from `src/enums/tags.ts`, and automate-vs-manual.
5. Write the doc to `docs/test-designs/<feature-slug>.md` using `assets/test-design-template.md`.
6. **STOP. Human review gate.** Present the doc. Do not implement until scenarios are approved.
7. After approval, hand each scenario to `.claude/skills/ui-test-author` or `api-test-author`.
   Each implemented spec must reference its scenario ID (e.g. `// covers: PWRESET-03`) for traceability.

## Constitution (MUST/WON'T for design work)

- MUST: every scenario traceable to the requirement; every open question surfaced, not resolved by guessing.
- MUST: mark scenarios that need new test hooks (data-test attributes, endpoints, seed data) so gaps surface early.
- WON'T: skip negative/boundary analysis because the requirement only describes the happy path.
- WON'T: begin implementation before the review gate passes.
