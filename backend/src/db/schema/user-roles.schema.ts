import {
  mysqlTable,
  int,
  primaryKey,
} from 'drizzle-orm/mysql-core';

import { users } from './users.schema.js';
import { roles } from './roles.schema.js';

export const userRoles = mysqlTable(
  'user_roles',
  {
    userId: int('user_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    roleId: int('role_id')
      .notNull()
      .references(() => roles.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.userId, table.roleId],
    }),
  ],
);