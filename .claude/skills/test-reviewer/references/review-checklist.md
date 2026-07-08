# Test Review Checklist

## 1. Does the test verify what the scenario promises?

- Every "Then" in the scenario maps to at least one assertion in the spec.
- The assertion checks the OUTCOME, not an implementation detail
  (e.g. "order appears in list" — not just "POST returned 200").
- Mutation reasoning: if the feature silently broke, would this test FAIL?
  A test that passes against a broken feature is a finding, always.

## 2. Traceability

- Spec carries `// covers: <scenario-id>` matching the design doc.
- No approved-for-automation scenario is left unimplemented without a note.
- No spec tests things outside its claimed scenario (scope creep hides coverage gaps).

## 3. Data lifecycle

- Everything the test creates is deleted in the SAME test (try/finally or fixture teardown).
- Teardown survives mid-test failure (finally block, not last line of the happy path).
- Dynamic data from factories — no literals that collide under parallel runs.

## 4. Constitution spot-checks (beyond what lint catches)

- Assertions are web-first (`await expect(locator)...`), not value-grabs
  (`expect(await locator.textContent())...` defeats auto-waiting).
- No selector strings in specs; page-object methods express intent.
- API responses parsed through schemas — no raw `.json()` assertions.
- Tags: layer + suite + feature, from enums.

## 5. Failure quality

- When this test fails, will the report say WHY? Steps labeled in plain English,
  assertion messages unambiguous.
- No conditional assertions that silently skip verification
  (`if (x) expect(...)` — the test passes when x is falsy).
- No assertions inside catch blocks that swallow the original error.

## Severity

- **Blocker**: test can pass against a broken feature; missing teardown; wrong traceability.
- **Major**: weak assertion; unlabeled steps; scope creep.
- **Minor**: naming, readability. Minors alone do not block approval.
