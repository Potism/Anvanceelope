import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const enquiries = pgTable('enquiry', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  weddingDate: text('weddingDate'),
  location: text('location'),
  coverage: text('coverage'),
  message: text('message'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export const portfolioProjects = pgTable('portfolio_project', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  destination: text('destination').notNull(),
  season: text('season').notNull(),
  venue: text('venue').notNull(),
  format: text('format').notNull(),
  excerpt: text('excerpt').notNull(),
  story: text('story').notNull(),
  coverUrl: text('coverUrl').notNull(),
  published: boolean('published').notNull().default(false),
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const portfolioMedia = pgTable('portfolio_media', {
  id: text('id').primaryKey(),
  projectId: text('projectId').notNull(),
  userId: text('userId').notNull(),
  url: text('url').notNull(),
  kind: text('kind').notNull(),
  alt: text('alt').notNull(),
  sortOrder: integer('sortOrder').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export type Enquiry = typeof enquiries.$inferSelect
export type PortfolioProject = typeof portfolioProjects.$inferSelect
export type PortfolioMedia = typeof portfolioMedia.$inferSelect
