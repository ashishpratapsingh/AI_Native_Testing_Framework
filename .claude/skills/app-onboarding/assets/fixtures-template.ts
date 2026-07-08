// Template: fixtures for a new app. Replace <app> names; keep the shape.
import { test as base } from '@playwright/test';
// import { SomePage } from './pages/some.page';
// import { SomeClient } from './clients/some.client';

interface AppFixtures {
  // somePage: SomePage;
  // someClient: SomeClient;
  placeholder: undefined;
}

export const test = base.extend<AppFixtures>({
  // somePage: async ({ page }, use) => { await use(new SomePage(page)); },
  // someClient: async ({ request }, use) => { await use(new SomeClient(request)); },
  placeholder: [undefined, { option: true }],
});

export { expect } from '@playwright/test';
