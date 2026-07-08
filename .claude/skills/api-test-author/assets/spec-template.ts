// Template: copy structure, replace placeholders.
import { expect, test } from '../../src/apps/APP_NAME/fixtures';
import { Tag } from '../../src/core/enums/tags';
import { buildBooking } from '../../src/apps/restful-booker/factories/booking.factory';

test.describe('RESOURCE_NAME API', { tag: [Tag.API /*, feature tag */] }, () => {
  test('BEHAVIOR_IN_PLAIN_ENGLISH', { tag: [Tag.Smoke] }, async ({ bookingClient, apiToken }) => {
    const payload = buildBooking(); // dynamic data, no collisions
    let id = 0;
    try {
      await test.step('create resource', async () => {
        const created = await bookingClient.create(payload);
        id = created.bookingid;
        expect(id).toBeGreaterThan(0);
      });
    } finally {
      if (id !== 0) await bookingClient.delete(id, apiToken); // always clean up
    }
  });
});
