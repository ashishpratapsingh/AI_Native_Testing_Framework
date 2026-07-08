---
id: REQ-001 # unique, increment per requirement
app: khatova # must match a folder under src/apps/
layer: ui # ui | api | both
priority: high # high | medium | low
auto_approve: false # true = agent may implement without waiting for human review
status: new # managed by the agent: new → designed → approved → implemented → executed
---

# <Requirement title>

## Description (natural language — write as much or as little as you know)

As a <role>, I want <capability>, so that <benefit>.

## Acceptance criteria (optional but sharpens the scenarios)

- <criterion 1>
- <criterion 2>

## Test hooks & references (optional)

- Relevant pages/endpoints: <e.g. /login, POST /api/orders>
- Known data-test attributes or sample API responses: <paste if available>
- Out of scope: <anything the agent should NOT test>
