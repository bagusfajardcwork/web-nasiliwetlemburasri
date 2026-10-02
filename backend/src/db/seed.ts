import { and, eq } from 'drizzle-orm'
import argon2 from 'argon2';
import { env } from '../config/env.js';

import { db, pool } from '../config/database.js';

import {
  users,
  roles,
  permissions,
  rolePermissions,
  userRoles,
} from './schema';

const roleData = [
  {
    name: 'administrator',
    description: 'Administrator dengan akses penuh ke sistem',
  },
  {
    name: 'supervisor',
    description: 'Supervisor dengan akses pengelolaan sistem',
  },
  {
    name: 'staff',
    description: 'Staff dengan akses operasional terbatas',
  },
];

const permissionData = [
  {
    name: 'users.read',
    description: 'Melihat data user',
  },
  {
    name: 'users.create',
    description: 'Membuat user',
  },
  {
    name: 'users.update',
    description: 'Mengubah data user',
  },
  {
    name: 'users.delete',
    description: 'Menghapus user',
  },

  {
    name: 'roles.read',
    description: 'Melihat data role',
  },
  {
    name: 'roles.create',
    description: 'Membuat role',
  },
  {
    name: 'roles.update',
    description: 'Mengubah role',
  },
  {
    name: 'roles.delete',
    description: 'Menghapus role',
  },

  {
    name: 'permissions.read',
    description: 'Melihat data permissions',
  },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    /*
     * =====================================================
     * ROLES
     * =====================================================
     */

    const roleIds: Record<string, number> = {};

    for (const role of roleData) {
      const existing = await db
        .select()
        .from(roles)
        .where(eq(roles.name, role.name))
        .limit(1);

      if (existing.length > 0) {
        roleIds[role.name] = existing[0].id;

        console.log(`✓ Role already exists: ${role.name}`);
        continue;
      }

      const result = await db
        .insert(roles)
        .values(role)
        .$returningId();

      roleIds[role.name] = result[0].id;

      console.log(`+ Role created: ${role.name}`);
    }

    /*
     * =====================================================
     * PERMISSIONS
     * =====================================================
     */

    const permissionIds: Record<string, number> = {};

    for (const permission of permissionData) {
      const existing = await db
        .select()
        .from(permissions)
        .where(eq(permissions.name, permission.name))
        .limit(1);

      if (existing.length > 0) {
        permissionIds[permission.name] = existing[0].id;

        console.log(
          `✓ Permission already exists: ${permission.name}`,
        );

        continue;
      }

      const result = await db
        .insert(permissions)
        .values(permission)
        .$returningId();

      permissionIds[permission.name] = result[0].id;

      console.log(`+ Permission created: ${permission.name}`);
    }

    /*
     * =====================================================
     * ROLE PERMISSIONS
     * =====================================================
     */

    const administratorPermissions = Object.keys(
      permissionIds,
    );

    const supervisorPermissions = [
      'users.read',
      'users.update',
    ];

    const staffPermissions = [
      'users.read',
    ];

    const rolePermissionMap = [
      {
        role: 'administrator',
        permissions: administratorPermissions,
      },
      {
        role: 'supervisor',
        permissions: supervisorPermissions,
      },
      {
        role: 'staff',
        permissions: staffPermissions,
      },
    ];

    for (const item of rolePermissionMap) {
      const roleId = roleIds[item.role];

      for (const permissionName of item.permissions) {
        const permissionId = permissionIds[permissionName];

        if (!roleId || !permissionId) {
          continue;
        }

        const existing = await db
          .select()
          .from(rolePermissions)
          .where(
            and(
              eq(rolePermissions.roleId, roleId),
              eq(
                rolePermissions.permissionId,
                permissionId,
              ),
            ),
          )
          .limit(1);

        const alreadyExists = existing.some(
          (item) =>
            item.permissionId === permissionId,
        );

        if (alreadyExists) {
          continue;
        }

        await db.insert(rolePermissions).values({
          roleId,
          permissionId,
        });

        console.log(
          `+ Permission assigned: ${item.role} → ${permissionName}`,
        );
      }
    }

    /*
     * =====================================================
     * ADMIN USER
     * =====================================================
    */

    const administratorRoleId = roleIds['administrator'];

    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.email, env.SEED_ADMIN_EMAIL))
      .limit(1);

    let adminUserId: number;

    if (existingAdmin.length > 0) {
      adminUserId = existingAdmin[0].id;

      console.log(
        `✓ Admin user already exists: ${env.SEED_ADMIN_EMAIL}`,
      );
    } else {
      const passwordHash = await argon2.hash(
        env.SEED_ADMIN_PASSWORD,
        {
          type: argon2.argon2id,
        },
      );

      const result = await db
        .insert(users)
        .values({
          name: env.SEED_ADMIN_NAME,
          email: env.SEED_ADMIN_EMAIL,
          password: passwordHash,
          isActive: true,
        })
        .$returningId();

      adminUserId = result[0].id;

      console.log(
        `+ Admin user created: ${env.SEED_ADMIN_EMAIL}`,
      );
    }

    /*
 * =====================================================
 * ADMIN ROLE
 * =====================================================
 */

  const existingUserRole = await db
    .select()
    .from(userRoles)
    .where(
      and(
        eq(userRoles.userId, adminUserId),
        eq(userRoles.roleId, administratorRoleId),
      ),
    )
    .limit(1);

  if (existingUserRole.length === 0) {
    await db.insert(userRoles).values({
      userId: adminUserId,
      roleId: administratorRoleId,
    });

    console.log(
      `+ Administrator role assigned to: ${env.SEED_ADMIN_EMAIL}`,
    );
  }

    console.log('');
    console.log('✅ Database seed completed successfully');
  } catch (error) {
    console.error('');
    console.error('❌ Database seed failed');
    console.error(error);

    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seed();