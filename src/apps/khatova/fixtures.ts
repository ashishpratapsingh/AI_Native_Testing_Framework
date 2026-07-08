import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login.page';

interface KhatovaFixtures {
  loginPage: LoginPage;
}

export const test = base.extend<KhatovaFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
