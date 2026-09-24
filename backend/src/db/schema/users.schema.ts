import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: int('id').autoincrement().primaryKey(),

  name: varchar('name', {
    length: 150,
  }).notNull(),

  email: varchar('email', {
    length: 150,
  }).notNull().unique(),

  password: varchar('password', {
    length: 255,
  }).notNull(),

  isActive: boolean('is_active')
    .notNull()
    .default(true),

  createdAt: timestamp('created_at')
    .notNull()
    .defaultNow(),

  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .onUpdateNow(),
});