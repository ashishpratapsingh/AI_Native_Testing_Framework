/**
 * CORE — API abstraction base. App-agnostic.
 * Tests call app clients, never raw requests; every response body is
 * parsed through a zod schema — typed contracts, enforced.
 */
import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { z } from 'zod';

export abstract class BaseClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected async parse<T extends z.ZodTypeAny>(
    response: APIResponse,
    schema: T,
  ): Promise<z.infer<T>> {
    if (!response.ok()) {
      throw new Error(
        `API call failed: ${String(response.status())} ${response.statusText()} — ${await response.text()}`,
      );
    }
    const body: unknown = await response.json();
    return schema.parse(body) as z.infer<T>;
  }
}
