// Template: copy structure, replace placeholders. Do not import from @playwright/test.
import { expect, test } from '../../src/apps/APP_NAME/fixtures';
import { Tag } from '../../src/core/enums/tags';

test.describe('FEATURE_NAME', { tag: [Tag.UI /*, feature tag */] }, () => {
  test('BEHAVIOR_IN_PLAIN_ENGLISH', { tag: [Tag.Smoke] }, async ({ loggedInPage }) => {
    await test.step('STEP_DESCRIPTION', async () => {
      // act via page-object methods
    });

    await test.step('EXPECTED_OUTCOME', async () => {
      await expect(loggedInPage.title).toBeVisible(); // web-first assertion
    });
  });
});
