import { z } from 'zod';

export const permissionIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const permissionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().optional(),
});