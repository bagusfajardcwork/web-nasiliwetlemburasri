import { eq, inArray } from 'drizzle-orm';
import argon2 from 'argon2';

import { db } from '../../config/database.js';

import {
  users,
  roles,
  userRoles,
} from '../../db/schema';

export async function getUsers() {
  const userResult = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users);

  return userResult;
}

export async function getUserById(
  userId: number,
) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (result.length === 0) {
    return null;
  }

  const user = result[0];

  const userRoleResult = await db
    .select({
      id: roles.id,
      name: roles.name,
    })
    .from(userRoles)
    .innerJoin(
      roles,
      eq(roles.id, userRoles.roleId),
    )
    .where(eq(userRoles.userId, userId));

  return {
    ...user,
    roles: userRoleResult,
  };
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  roleIds: number[];
}) {
  const existingUser = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, data.email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const passwordHash = await argon2.hash(
    data.password,
    {
      type: argon2.argon2id,
    },
  );

  const result = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password: passwordHash,
      isActive: data.isActive,
    });

  const userId = result[0].insertId;

  if (data.roleIds.length > 0) {
    await db.insert(userRoles).values(
      data.roleIds.map((roleId) => ({
        userId,
        roleId,
      })),
    );
  }

  return getUserById(userId);
}

export async function updateUser(
  userId: number,
  data: {
    name?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
    roleIds?: number[];
  },
) {
  const existingUser = await getUserById(
    userId,
  );

  if (!existingUser) {
    return null;
  }

  const updateData: {
    name?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
  } = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.email !== undefined) {
    updateData.email = data.email;
  }

  if (data.password !== undefined) {
    updateData.password =
      await argon2.hash(data.password, {
        type: argon2.argon2id,
      });
  }

  if (data.isActive !== undefined) {
    updateData.isActive = data.isActive;
  }

  if (Object.keys(updateData).length > 0) {
    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId));
  }

  if (data.roleIds !== undefined) {
    await db
      .delete(userRoles)
      .where(eq(userRoles.userId, userId));

    if (data.roleIds.length > 0) {
      await db.insert(userRoles).values(
        data.roleIds.map((roleId) => ({
          userId,
          roleId,
        })),
      );
    }
  }

  return getUserById(userId);
}

export async function deleteUser(
  userId: number,
) {
  const existingUser = await getUserById(
    userId,
  );

  if (!existingUser) {
    return false;
  }

  await db
    .delete(userRoles)
    .where(eq(userRoles.userId, userId));

  await db
    .delete(users)
    .where(eq(users.id, userId));

  return true;
}