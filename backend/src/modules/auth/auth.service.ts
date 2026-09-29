import argon2 from 'argon2';
import { eq, and } from 'drizzle-orm';

import { db } from '../../config/database.js';

import {
  users,
  userRoles,
  roles,
  rolePermissions,
  permissions,
} from '../../db/schema';

export async function loginUser(
  email: string,
  password: string,
) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
      isActive: users.isActive,
      roleId: roles.id,
      roleName: roles.name,
    })
    .from(users)
    .leftJoin(
      userRoles,
      eq(userRoles.userId, users.id),
    )
    .leftJoin(
      roles,
      eq(roles.id, userRoles.roleId),
    )
    .where(eq(users.email, email))
    .limit(1);

  if (result.length === 0) {
    throw new Error('EMAIL_OR_PASSWORD_INVALID');
  }

  const user = result[0];

  if (!user.isActive) {
    throw new Error('USER_INACTIVE');
  }

  const passwordValid = await argon2.verify(
    user.password,
    password,
  );

  if (!passwordValid) {
    throw new Error('EMAIL_OR_PASSWORD_INVALID');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.roleName,
  };
}

export async function getAuthenticatedUser(
  userId: number,
) {
  const userResult = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      isActive: users.isActive,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (userResult.length === 0) {
    return null;
  }

  const user = userResult[0];

  if (!user.isActive) {
    return {
      ...user,
      roles: [],
      permissions: [],
    };
  }

  const roleResult = await db
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

  const permissionResult = await db
    .selectDistinct({
      name: permissions.name,
    })
    .from(userRoles)
    .innerJoin(
      rolePermissions,
      eq(
        rolePermissions.roleId,
        userRoles.roleId,
      ),
    )
    .innerJoin(
      permissions,
      eq(
        permissions.id,
        rolePermissions.permissionId,
      ),
    )
    .where(eq(userRoles.userId, userId));

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    roles: roleResult,
    permissions: permissionResult.map(
      (permission) => permission.name,
    ),
  };
}