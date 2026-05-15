import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

export const segments = sqliteTable("segments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  color: text("color").notNull().default("#1B2A4A"),
  image: text("image"),
  storeCount: integer("store_count").notNull().default(0),
  position: integer("position").notNull().default(0),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

export const stores = sqliteTable("stores", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  photo: text("photo").notNull().default(""),
  storefront: text("storefront"),
  instagram: text("instagram"),
  categories: text("categories", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default([]),
  segment: text("segment").notNull(),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  location: text("location").notNull(),
  floor: text("floor").notNull().default("Térreo"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  image: text("image").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  readingTime: text("reading_time"),
  content: text("content", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default([]),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  dateLabel: text("date_label").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  ctaLabel: text("cta_label"),
  ctaHref: text("cta_href"),
  position: integer("position").notNull().default(0),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

export const galleryImages = sqliteTable("gallery_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  image: text("image").notNull(),
  alt: text("alt").notNull(),
  position: integer("position").notNull().default(0),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

export const instagramPosts = sqliteTable("instagram_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  image: text("image").notNull(),
  alt: text("alt").notNull(),
  link: text("link"),
  position: integer("position").notNull().default(0),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
});

export type User = typeof users.$inferSelect;
export type Segment = typeof segments.$inferSelect;
export type Store = typeof stores.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Setting = typeof settings.$inferSelect;
export type AgendaEvent = typeof events.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InstagramPost = typeof instagramPosts.$inferSelect;
