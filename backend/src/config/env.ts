import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  APP_NAME: z.string().default('backend'),
  APP_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_PORT: z.coerce.number().default(3000),

  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number().default(3306),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),

  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),

  SEED_ADMIN_NAME: z.string().min(1),
  SEED_ADMIN_EMAIL: z.email(),
  SEED_ADMIN_PASSWORD: z.string().min(8),
});

export const env = envSchema.parse(process.env);