#!/usr/bin/env bash
# Deterministic validation gate — no improvising. Usage: validate.sh <tag>
set -euo pipefail
TAG="${1:-@ui}"
npm run typecheck
npm run lint
npx playwright test --grep "$TAG"
echo "GATE PASSED: $TAG"
