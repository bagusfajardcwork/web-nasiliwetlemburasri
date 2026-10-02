import {
  roles,
  users,
  userRoles,
} from '../../db/schema/index.js';

import {
  and,
  countDistinct,
  eq,
  inArray,
  like,
  or,
  asc,
} from 'drizzle-orm';

import { db } from '../../config/database.js';

import argon2 from 'argon2';

export async function getUsers(params: {
  page: number;
  perPage: number;
  search?: string;
  isActive?: string;
  role?: string;
}) {
  const {
    page,
    perPage,
    search,
    isActive,
    role,
  } = params;

  const offset = (page - 1) * perPage;

  // =====================================================
  // BUILD CONDITIONS
  // =====================================================

  const conditions = [];

  // Search nama atau email
  if (search) {
    conditions.push(
      or(
        like(
          users.name,
          `%${search}%`,
        ),
        like(
          users.email,
          `%${search}%`,
        ),
      ),
    );
  }

  // Filter status
  if (isActive !== undefined) {
    conditions.push(
      eq(
        users.isActive,
        isActive === 'true',
      ),
    );
  }

  // Filter role
  if (role) {
    conditions.push(
      eq(
        roles.name,
        role,
      ),
    );
  }

  const whereCondition =
    conditions.length > 0
      ? and(...conditions)
      : undefined;

  // =====================================================
  // 1. AMBIL USER ID UNTUK PAGINATION
  // =====================================================

  const userIdResult = await db
    .selectDistinct({
      id: users.id,
    })
    .from(users)
    .leftJoin(
      userRoles,
      eq(
        userRoles.userId,
        users.id,
      ),
    )
    .leftJoin(
      roles,
      eq(
        roles.id,
        userRoles.roleId,
      ),
    )
    .where(whereCondition)
    .orderBy(asc(users.id))
    .limit(perPage)
    .offset(offset);

  const userIds = userIdResult.map(
    (item) => item.id,
  );

  // =====================================================
  // 2. HITUNG TOTAL USER
  // =====================================================

  const totalResult = await db
    .select({
      count: countDistinct(users.id),
    })
    .from(users)
    .leftJoin(
      userRoles,
      eq(
        userRoles.userId,
        users.id,
      ),
    )
    .leftJoin(
      roles,
      eq(
        roles.id,
        userRoles.roleId,
      ),
    )
    .where(whereCondition);

  const total = totalResult[0].count;

  // =====================================================
  // Jika halaman tidak memiliki data
  // =====================================================

  if (userIds.length === 0) {
    return {
      data: [],
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

  // =====================================================
  // 3. AMBIL USER + SEMUA ROLE
  // =====================================================

  const userResult = await db
    .select({
      userId: users.id,
      name: users.name,
      email: users.email,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,

      roleId: roles.id,
      roleName: roles.name,
    })
    .from(users)
    .leftJoin(
      userRoles,
      eq(
        userRoles.userId,
        users.id,
      ),
    )
    .leftJoin(
      roles,
      eq(
        roles.id,
        userRoles.roleId,
      ),
    )
    .where(
      inArray(
        users.id,
        userIds,
      ),
    )
    .orderBy(asc(users.id));

  // =====================================================
  // 4. GROUP ROLE BERDASARKAN USER
  // =====================================================

  const userMap = new Map<
    number,
    {
      id: number;
      name: string;
      email: string;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
      roles: {
        id: number;
        name: string;
      }[];
    }
  >();

  for (const row of userResult) {
    if (!userMap.has(row.userId)) {
      userMap.set(row.userId, {
        id: row.userId,
        name: row.name,
        email: row.email,
        isActive: row.isActive,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        roles: [],
      });
    }

    if (
      row.roleId !== null &&
      row.roleName !== null
    ) {
      userMap
        .get(row.userId)!
        .roles.push({
        id: row.roleId,
        name: row.roleName,
      });
    }
  }

  // =====================================================
  // 5. PERTAHANKAN URUTAN PAGINATION
  // =====================================================

  const data = userIds
    .map(
      (id) => userMap.get(id),
    )
    .filter(
      (
        user,
      ): user is NonNullable<
        typeof user
      > => user !== undefined,
    );

  // =====================================================
  // RESPONSE
  // =====================================================

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

// =======================================================
// GET USER BY ID
// =======================================================

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
    .where(
      eq(
        users.id,
        userId,
      ),
    )
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
      eq(
        roles.id,
        userRoles.roleId,
      ),
    )
    .where(
      eq(
        userRoles.userId,
        userId,
      ),
    );

  return {
    ...user,
    roles: userRoleResult,
  };
}

// =======================================================
// CREATE USER
// =======================================================

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
    .where(
      eq(
        users.email,
        data.email,
      ),
    )
    .limit(1);

  if (existingUser.length > 0) {
    throw new Error(
      'EMAIL_ALREADY_EXISTS',
    );
  }

  const passwordHash =
    await argon2.hash(
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

  const userId =
    result[0].insertId;

  if (data.roleIds.length > 0) {
    await db
      .insert(userRoles)
      .values(
        data.roleIds.map(
          (roleId) => ({
            userId,
            roleId,
          }),
        ),
      );
  }

  return getUserById(userId);
}

// =======================================================
// UPDATE USER
// =======================================================

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
  const existingUser =
    await getUserById(
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
    updateData.name =
      data.name;
  }

  if (data.email !== undefined) {
    updateData.email =
      data.email;
  }

  if (
    data.password !== undefined
  ) {
    updateData.password =
      await argon2.hash(
        data.password,
        {
          type: argon2.argon2id,
        },
      );
  }

  if (
    data.isActive !== undefined
  ) {
    updateData.isActive =
      data.isActive;
  }

  if (
    Object.keys(updateData)
      .length > 0
  ) {
    await db
      .update(users)
      .set(updateData)
      .where(
        eq(
          users.id,
          userId,
        ),
      );
  }

  if (
    data.roleIds !== undefined
  ) {
    await db
      .delete(userRoles)
      .where(
        eq(
          userRoles.userId,
          userId,
        ),
      );

    if (
      data.roleIds.length > 0
    ) {
      await db
        .insert(userRoles)
        .values(
          data.roleIds.map(
            (roleId) => ({
              userId,
              roleId,
            }),
          ),
        );
    }
  }

  return getUserById(
    userId,
  );
}

// =======================================================
// DELETE USER
// =======================================================

export async function deleteUser(
  userId: number,
) {
  const existingUser =
    await getUserById(
      userId,
    );

  if (!existingUser) {
    return false;
  }

  await db
    .delete(userRoles)
    .where(
      eq(
        userRoles.userId,
        userId,
      ),
    );

  await db
    .delete(users)
    .where(
      eq(
        users.id,
        userId,
      ),
    );

  return true;
}