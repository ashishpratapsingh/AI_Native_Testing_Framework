/**
 * CORE — generic env loading. This file knows nothing about any application.
 * Each app defines its own zod schema in src/apps/<app>/env.ts and calls loadEnv.
 * Fails fast on a bad .env instead of failing mysteriously mid-run.
 */
import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

loadDotenv({ quiet: true });

export function loadEnv<T extends z.ZodTypeAny>(schema: T): z.infer<T> {
  return schema.parse(process.env) as z.infer<T>;
}

/** Runtime flags shared by every app. */
export const runtime = {
  ci: process.env.CI === 'true' || process.env.CI === '1',
} as const;

/**
 * Execution controls — how tests run, not what they test.
 * All overridable per run via env vars or .env:
 *   HEADLESS=false SCREENSHOT=on VIDEO=on npx playwright test --project=khatova
 */
const ExecutionSchema = z.object({
  /** false = headed browser you can watch */
  HEADLESS: z.enum(['true', 'false']).default('true'),
  /** off | only-on-failure (failed tests) | on (every test) */
  SCREENSHOT: z.enum(['off', 'only-on-failure', 'on']).default('only-on-failure'),
  /** off | retain-on-failure (failed tests) | on (record everything) | on-first-retry */
  VIDEO: z.enum(['off', 'retain-on-failure', 'on', 'on-first-retry']).default('retain-on-failure'),
  /** off | retain-on-failure | on | on-first-retry — traces power the HTML report + auto-triage */
  TRACE: z.enum(['off', 'retain-on-failure', 'on', 'on-first-retry']).default('retain-on-failure'),
});

const parsed = ExecutionSchema.parse(process.env);

export const execution = {
  headless: parsed.HEADLESS === 'true',
  screenshot: parsed.SCREENSHOT,
  video: parsed.VIDEO,
  trace: parsed.TRACE,
} as const;
