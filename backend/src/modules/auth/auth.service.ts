import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

import { db } from '../../config/database.js';

import {
  users,
  userRoles,
  roles,
} from '../../db/schema/index.js';

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