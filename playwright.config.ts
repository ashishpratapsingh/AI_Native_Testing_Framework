import { defineConfig, devices } from '@playwright/test';
import { config } from './src/core/config/config';
import { execution, runtime } from './src/core/config/env';
import { kHatovaEnv } from './src/apps/khatova/env';

/**
 * One Playwright project per application. Onboarding a new app adds a
 * project entry here + a folder under src/apps and tests/ — nothing else.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: runtime.ci,
  retries: runtime.ci ? config.retries.ci : config.retries.local,
  ...(runtime.ci ? { workers: 4 } : {}),
  timeout: config.timeouts.test,
  expect: { timeout: config.timeouts.expect },
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    actionTimeout: config.timeouts.action,
    navigationTimeout: config.timeouts.navigation,
    // execution controls come from .env / env vars — see src/core/config/env.ts
    headless: execution.headless,
    screenshot: execution.screenshot,
    video: execution.video,
    trace: execution.trace,
  },
  projects: [
    {
      name: 'khatova',
      testDir: './tests/khatova',
      use: { ...devices['Desktop Chrome'], baseURL: kHatovaEnv.UI_BASE_URL },
    },
  ],
});
