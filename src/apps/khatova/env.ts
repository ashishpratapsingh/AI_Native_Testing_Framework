/** APP: khatova — env vars for the login flow. */
import { z } from 'zod';
import { loadEnv } from '../../core/config/env';

export const kHatovaEnv = loadEnv(
  z.object({
    UI_BASE_URL: z.string().url().default('http://localhost:5173'),
    ADMIN_EMAIL: z.string().default('maya@khatova.app'),
    ADMIN_PASSWORD: z.string().default('khatova123'),
  }),
);
