/**
 * CORE — generic env loading. This file knows nothing about any application.
 * Each app defines its own zod schema in src/apps/<app>/env.ts and calls loadEnv.
 * Fails fast on a bad .env instead of failing mysteriously mid-run.
 */
import { config as loadDotenv } from 'dotenv';
import type { z } from 'zod';

loadDotenv({ quiet: true });

export function loadEnv<T extends z.ZodTypeAny>(schema: T): z.infer<T> {
  return schema.parse(process.env) as z.infer<T>;
}

/** Runtime flags shared by every app. */
export const runtime = {
  ci: process.env.CI === 'true' || process.env.CI === '1',
} as const;
