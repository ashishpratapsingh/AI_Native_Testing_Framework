/**
 * CORE — framework-wide settings. No URLs, no credentials, no app names:
 * those belong to src/apps/<app>/env.ts.
 */
export const config = {
  timeouts: {
    /** Per-test timeout (ms) */
    test: 30_000,
    /** Web-first assertion timeout (ms) */
    expect: 10_000,
    /** Single action timeout (ms) */
    action: 15_000,
    /** Page navigation timeout (ms) */
    navigation: 30_000,
  },
  retries: {
    ci: 2,
    local: 0,
  },
} as const;
