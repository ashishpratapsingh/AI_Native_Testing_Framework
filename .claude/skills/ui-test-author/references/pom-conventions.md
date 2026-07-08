# Page Object Conventions

- One class per screen, extending `BasePage` (`src/core/pages/base.page.ts`).
- `route` comes from the `Route` enum — pages know where they live.
- Locators are `readonly` fields initialized in the constructor from `data-test` attributes:
  `page.locator('[data-test="login-button"]')`.
- Methods express user intent (`login()`, `addItemToCart()`, `checkout()`), not mechanics.
- Methods return `Promise<void>` or another page object; they never assert.
  Assertions belong in the test layer.
- Register new page objects as fixtures in `src/apps/<app>/fixtures.ts`.
