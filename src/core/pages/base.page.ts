/**
 * CORE — base page object. App-agnostic: `route` is any path string;
 * apps supply values from their own route enums.
 * Selectors live in app page objects — never in tests.
 */
import type { Page } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  abstract readonly route: string;

  async goto(): Promise<void> {
    await this.page.goto(this.route);
  }
}
