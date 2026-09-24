import {
  mysqlTable,
  int,
  primaryKey,
} from 'drizzle-orm/mysql-core';

import { roles } from './roles.schema.js';
import { permissions } from './permissions.schema.js';

export const rolePermissions = mysqlTable(
  'role_permissions',
  {
    roleId: int('role_id')
      .notNull()
      .references(() => roles.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    permissionId: int('permission_id')
      .notNull()
      .references(() => permissions.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.roleId, table.permissionId],
    }),
  ],
);