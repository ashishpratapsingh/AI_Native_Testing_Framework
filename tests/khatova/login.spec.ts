import { expect, test } from '../../src/apps/khatova/fixtures';
import { kHatovaEnv } from '../../src/apps/khatova/env';
import { KhatovaTag } from '../../src/apps/khatova/tags';
import { Tag } from '../../src/core/enums/tags';

test.describe('Khatova login', { tag: [Tag.UI, KhatovaTag.Auth] }, () => {
  test('admin user can sign in', { tag: [Tag.Smoke] }, async ({ loginPage }) => {
    await test.step('open the login page', async () => {
      await loginPage.goto();
    });

    await test.step('sign in with the admin credentials', async () => {
      await loginPage.login(kHatovaEnv.ADMIN_EMAIL, kHatovaEnv.ADMIN_PASSWORD);
    });

    await test.step('dashboard is visible after a successful login', async () => {
      await expect(loginPage.dashboardHeading).toBeVisible();
      await expect(loginPage.dashboardHeading).toContainText('Dashboard');
    });
  });

  test('invalid credentials stay on the login page', { tag: [Tag.Regression] }, async ({ loginPage }) => {
    await test.step('open the login page', async () => {
      await loginPage.goto();
    });

    await test.step('submit invalid credentials', async () => {
      await loginPage.login('invalid@example.com', 'wrong-password');
    });

    await test.step('the login form remains visible and reports the error', async () => {
      await expect(loginPage.errorMessage).toContainText('Invalid login credentials');
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.submitButton).toBeVisible();
    });
  });
});
