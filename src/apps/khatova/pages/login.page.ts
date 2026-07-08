import type { Locator, Page } from '@playwright/test';
import { BasePage } from '../../../core/pages/base.page';
import { Route } from '../routes';

export class LoginPage extends BasePage {
  override readonly route = Route.Login;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input').first();
    this.passwordInput = page.locator('input').nth(1);
    this.submitButton = page.getByRole('button', { name: /sign in/i });
    this.errorMessage = page.getByText(/invalid login credentials/i);
    this.dashboardHeading = page.getByRole('banner').getByText(/^dashboard\b/i);
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
