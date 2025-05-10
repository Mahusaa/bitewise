import { integer, pgTableCreator, serial, varchar, decimal, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { InferInsertModel } from "drizzle-orm";



export const createTable = pgTableCreator((name) => `bitewise_${name}`);


export const user = createTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const session = createTable("session", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = createTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = createTable("verification", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
});


export const userProfiles = createTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  age: integer("age").notNull(),
  gender: varchar("gender").notNull(),
  weight: varchar("weight").notNull(),
  height: varchar("height").notNull(),
  activityLevel: varchar("activity_level").notNull(),
  goal: varchar("goal").notNull(),
});


export const nutritionGoals = createTable("nutrition_goals", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  calories: decimal("calories", { precision: 7, scale: 2 }).notNull(),
  protein: decimal("protein", { precision: 7, scale: 2 }).notNull(),
  carbs: decimal("carbs", { precision: 7, scale: 2 }).notNull(),
  fat: decimal("fat", { precision: 7, scale: 2 }).notNull(),
})


export const meals = createTable("meals", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  categories: varchar("categories").notNull(),
  calories: decimal("calories", { precision: 7, scale: 2 }).notNull(),
  protein: decimal("protein", { precision: 7, scale: 2 }).notNull(),
  carbs: decimal("carbs", { precision: 7, scale: 2 }).notNull(),
  fat: decimal("fat", { precision: 7, scale: 2 }).notNull(),
  sugar: decimal("sugar", { precision: 7, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  image: text("image"),
})


export type NewUserProfile = InferInsertModel<typeof userProfiles>
export type UserProfile = typeof userProfiles.$inferSelect
export type NutritionGoals = typeof nutritionGoals.$inferSelect
