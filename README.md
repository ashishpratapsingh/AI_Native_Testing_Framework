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
 Execution           ← every check must pass before work is accepted
      ↓
 Audit trail         ← requirement archived with results and links to everything
```

The one non-negotiable: **nothing is automated without an approved plan.** The AI proposes; a person decides. That checkpoint is built into the process, not left to good intentions.

## Why the results can be trusted

An AI writing code sounds risky, and unconstrained it would be. Three safeguards make it reliable:

**A rulebook the AI must follow.** The repository contains a "constitution" — a strict set of MUST/WON'T rules (e.g. every test must clean up its own data; never hide a failure by weakening a check). The AI reads it before doing any work.

**Quality gates a machine enforces.** After the AI writes anything, automated checks run: a compiler, a code-quality linter, a formatter, and the tests themselves. If any gate fails, the work is rejected — the AI can't declare "done" until everything is green. The same gates run on every engineer's contribution too.

**Failures are investigated, never papere
