import { bigint, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"

export const sequences = pgTable('sequences', {
  id: serial('id').primaryKey(),
  number: bigint('number', { mode: 'number' }).notNull().default(1),
  name: varchar('name', { length: 100 }).notNull().default('short_url_sequence'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const users = pgTable('short_urls', {
  id: serial('id').primaryKey(),
  raw: varchar('raw', { length: 2000 }).notNull(),
  slug: varchar('slug', { length: 16 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
