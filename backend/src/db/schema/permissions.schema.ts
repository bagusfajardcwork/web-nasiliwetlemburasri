import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  text,
} from 'drizzle-orm/mysql-core';

export const permissions = mysqlTable('permissions', {
  id: int('id').autoincrement().primaryKey(),

  name: varchar('name', {
    length: 100,
  }).notNull().unique(),

  description: text('description'),

  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
});