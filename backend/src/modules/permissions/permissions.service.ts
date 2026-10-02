import { permissions } from '../../db/schema';

import {
  and,
  count,
  eq,
  like,
  or,
} from 'drizzle-orm';

import { db } from '../../config/database.js';

export async function getPermissions(params: {
  page: number;
  perPage: number;
  search?: string;
}) {
  const {
    page,
    perPage,
    search,
  } = params;

  const offset = (page - 1) * perPage;

  const conditions = [];

  if (search) {
    conditions.push(
      or(
        like(permissions.name, `%${search}%`),
        like(
          permissions.description,
          `%${search}%`,
        ),
      ),
    );
  }

  const whereCondition =
    conditions.length > 0
      ? and(...conditions)
      : undefined;

  const data = await db
    .select({
      id: permissions.id,
      name: permissions.name,
      description: permissions.description,
      createdAt: permissions.createdAt,
      updatedAt: permissions.updatedAt,
    })
    .from(permissions)
    .where(whereCondition)
    .orderBy(permissions.id)
    .limit(perPage)
    .offset(offset);

  const totalResult = await db
    .select({
      count: count(),
    })
    .from(permissions)
    .where(whereCondition);

  const total = totalResult[0].count;

  return {
    data,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
}

export async function getPermissionById(
  permissionId: number,
) {
  const result = await db
    .select({
      id: permissions.id,
      name: permissions.name,
      description: permissions.description,
      createdAt: permissions.createdAt,
      updatedAt: permissions.updatedAt,
    })
    .from(permissions)
    .where(eq(permissions.id, permissionId))
    .limit(1);

  return result[0] ?? null;
}