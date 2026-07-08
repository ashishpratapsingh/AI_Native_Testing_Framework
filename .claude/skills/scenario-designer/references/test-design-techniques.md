# Test Design Techniques (apply in this order)

1. **Equivalence partitioning** — split every input into valid/invalid classes; one case per class.
   "Password 8–64 chars" → partitions: <8, 8–64, >64, empty, non-string.
2. **Boundary value analysis** — test at the edges of each partition: 7/8/64/65, not 30.
3. **Negative paths** — for each actor and precondition, ask "what if not?": wrong credentials,
   missing permissions, absent record, malformed payload, expired token.
4. **State transitions** — anything with a lifecycle (link valid→expired, cart empty→full→checked-out):
   test each legal transition and at least one illegal one.
5. **Decision tables** — when 2+ conditions combine (role × subscription × feature flag), enumerate
   combinations; prune ones that collapse into the same behavior.
6. **CRUD completeness** — for every entity a requirement creates: can it be read, updated, deleted,
   and does teardown exist for whatever tests create?

## Prioritization

- P1: revenue, auth, data-loss, or legal impact; automate always, tag @smoke.
- P2: core UX correctness; automate, tag @regression.
- P3: cosmetic/rare-path; automate only if cheap, else manual checklist.

## Layer choice

- Business rule verifiable without a browser → API test (faster, more stable).
- Rule about what the user sees or clicks → UI test.
- Same rule at both layers → API for depth (all partitions), UI for one happy-path pass.
