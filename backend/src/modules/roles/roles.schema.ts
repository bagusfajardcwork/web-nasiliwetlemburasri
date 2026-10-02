import { z } from 'zod';

export const createRoleSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama role minimal 2 karakter')
    .max(100),

  description: z
    .string()
    .optional()
    .nullable(),

  permissionIds: z
    .array(
      z.number().int().positive(),
    )
    .default([]),
});

export const updateRoleSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama role minimal 2 karakter')
    .max(100)
    .optional(),

  description: z
    .string()
    .optional()
    .nullable(),

  permissionIds: z
    .array(
      z.number().int().positive(),
    )
    .optional(),
});

export const roleIdSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive(),
});

export const rolesQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .default(1),

  perPage: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),

  search: z
    .string()
    .trim()
    .optional(),
});