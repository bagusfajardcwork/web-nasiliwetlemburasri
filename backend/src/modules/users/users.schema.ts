import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100),

  email: z
    .string()
    .email('Format email tidak valid')
    .max(150),

  password: z
    .string()
    .min(8, 'Password minimal 8 karakter'),

  isActive: z
    .boolean()
    .optional()
    .default(true),

  roleIds: z
    .array(z.number().int().positive())
    .min(1, 'Minimal pilih 1 role'),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100)
    .optional(),

  email: z
    .string()
    .email('Format email tidak valid')
    .max(150)
    .optional(),

  password: z
    .string()
    .min(8, 'Password minimal 8 karakter')
    .optional(),

  isActive: z
    .boolean()
    .optional(),

  roleIds: z
    .array(z.number().int().positive())
    .min(1)
    .optional(),
});

export const userIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const usersQuerySchema = z.object({
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

  isActive: z
    .enum(['true', 'false'])
    .optional(),

  role: z
    .string()
    .trim()
    .optional(),
});