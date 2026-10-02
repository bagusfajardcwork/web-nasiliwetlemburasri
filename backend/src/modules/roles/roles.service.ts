import {
  roles,
  permissions,
  rolePermissions,
  userRoles,
} from '../../db/schema';

import {
  and,
  count,
  eq,
  inArray,
  like,
  or,
} from 'drizzle-orm';

import { db } from '../../config/database.js';

export async function getRoles(params: {
  page: number;
  perPage: number;
  search?: string;
}) {
  const {
    page,
    perPage,
    search,
  } = params;

  const offset =
    (page - 1) * perPage;

  const conditions = [];

  if (search) {
    conditions.push(
      or(
        like(
          roles.name,
          `%${search}%`,
        ),
        like(
          roles.description,
          `%${search}%`,
        ),
      ),
    );
  }

  const whereCondition =
    conditions.length > 0
      ? and(...conditions)
      : undefined;

  const roleResult = await db
    .select({
      id: roles.id,
      name: roles.name,
      description: roles.description,
      createdAt: roles.createdAt,
      updatedAt: roles.updatedAt,
    })
    .from(roles)
    .where(whereCondition)
    .orderBy(roles.id)
    .limit(perPage)
    .offset(offset);

  const totalResult = await db
    .select({
      count: count(),
    })
    .from(roles)
    .where(whereCondition);

  const total =
    totalResult[0].count;

  const roleIds =
    roleResult.map(
      (role) => role.id,
    );

  let permissionResult: {
    roleId: number;
    permissionId: number;
    permissionName: string;
  }[] = [];

  if (roleIds.length > 0) {
    permissionResult =
      await db
        .select({
          roleId:
          rolePermissions.roleId,

          permissionId:
          permissions.id,

          permissionName:
          permissions.name,
        })
        .from(rolePermissions)
        .innerJoin(
          permissions,
          eq(
            permissions.id,
            rolePermissions.permissionId,
          ),
        )
        .where(
          inArray(
            rolePermissions.roleId,
            roleIds,
          ),
        );
  }

  const data = roleResult.map(
    (role) => ({
      ...role,

      permissions:
        permissionResult
          .filter(
            (permission) =>
              permission.roleId ===
              role.id,
          )
          .map(
            (permission) => ({
              id: permission.permissionId,
              name: permission.permissionName,
            }),
          ),
    }),
  );

  return {
    data,

    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(
        total / perPage,
      ),
    },
  };
}

export async function getRoleById(
  roleId: number,
) {
  const roleResult = await db
    .select({
      id: roles.id,
      name: roles.name,
      description: roles.description,
      createdAt: roles.createdAt,
      updatedAt: roles.updatedAt,
    })
    .from(roles)
    .where(
      eq(
        roles.id,
        roleId,
      ),
    )
    .limit(1);

  if (roleResult.length === 0) {
    return null;
  }

  const role = roleResult[0];

  const permissionResult =
    await db
      .select({
        id: permissions.id,
        name: permissions.name,
        description:
        permissions.description,
      })
      .from(rolePermissions)
      .innerJoin(
        permissions,
        eq(
          permissions.id,
          rolePermissions.permissionId,
        ),
      )
      .where(
        eq(
          rolePermissions.roleId,
          roleId,
        ),
      );

  return {
    ...role,
    permissions:
    permissionResult,
  };
}

export async function createRole(
  data: {
    name: string;
    description?: string | null;
    permissionIds: number[];
  },
) {
  const existingRole =
    await db
      .select({
        id: roles.id,
      })
      .from(roles)
      .where(
        eq(
          roles.name,
          data.name,
        ),
      )
      .limit(1);

  if (existingRole.length > 0) {
    throw new Error(
      'ROLE_ALREADY_EXISTS',
    );
  }

  const result = await db
    .insert(roles)
    .values({
      name: data.name,
      description:
        data.description ?? null,
    });

  const roleId =
    result[0].insertId;

  if (
    data.permissionIds.length > 0
  ) {
    await db
      .insert(rolePermissions)
      .values(
        data.permissionIds.map(
          (permissionId) => ({
            roleId,
            permissionId,
          }),
        ),
      );
  }

  return getRoleById(roleId);
}

export async function updateRole(
  roleId: number,
  data: {
    name?: string;
    description?: string | null;
    permissionIds?: number[];
  },
) {
  const existingRole =
    await getRoleById(roleId);

  if (!existingRole) {
    return null;
  }

  const updateData: {
    name?: string;
    description?: string | null;
  } = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (
    data.description !== undefined
  ) {
    updateData.description =
      data.description;
  }

  if (
    Object.keys(updateData).length > 0
  ) {
    await db
      .update(roles)
      .set(updateData)
      .where(
        eq(
          roles.id,
          roleId,
        ),
      );
  }

  if (
    data.permissionIds !== undefined
  ) {
    await db
      .delete(rolePermissions)
      .where(
        eq(
          rolePermissions.roleId,
          roleId,
        ),
      );

    if (
      data.permissionIds.length > 0
    ) {
      await db
        .insert(rolePermissions)
        .values(
          data.permissionIds.map(
            (permissionId) => ({
              roleId,
              permissionId,
            }),
          ),
        );
    }
  }

  return getRoleById(roleId);
}

export async function deleteRole(roleId: number) {
  // Cek apakah role ada
  const existingRole = await db
    .select({
      id: roles.id,
      name: roles.name,
    })
    .from(roles)
    .where(eq(roles.id, roleId))
    .limit(1);

  if (existingRole.length === 0) {
    return null;
  }

  // Cek apakah role sedang digunakan oleh user
  const assignedUsers = await db
    .select({
      userId: userRoles.userId,
    })
    .from(userRoles)
    .where(eq(userRoles.roleId, roleId))
    .limit(1);

  if (assignedUsers.length > 0) {
    throw new Error('ROLE_IN_USE');
  }

  // Hapus relasi permissions
  await db
    .delete(rolePermissions)
    .where(eq(rolePermissions.roleId, roleId));

  // Hapus role
  await db
    .delete(roles)
    .where(eq(roles.id, roleId));

  return true;
}