import "server-only";
import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import {
  siteContact,
  siteHighlights,
  stopCredBenefits,
  wholesaleBenefits,
} from "@/lib/site";
import type { ContactSettings, HeroSettings } from "@/lib/validators";

export async function getAllStores() {
  return db.select().from(schema.stores).orderBy(schema.stores.name);
}

export async function getFeaturedStores(limit = 6) {
  return db
    .select()
    .from(schema.stores)
    .where(eq(schema.stores.featured, true))
    .orderBy(schema.stores.name)
    .limit(limit);
}

export async function getStoreById(id: number) {
  const [row] = await db
    .select()
    .from(schema.stores)
    .where(eq(schema.stores.id, id))
    .limit(1);
  return row ?? null;
}

export async function getStoreBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(schema.stores)
    .where(eq(schema.stores.slug, slug))
    .limit(1);
  return row ?? null;
}

export async function getStoresBySegment(slug: string) {
  return db
    .select()
    .from(schema.stores)
    .where(eq(schema.stores.segment, slug))
    .orderBy(schema.stores.name);
}

export async function getAllSegments() {
  return db
    .select()
    .from(schema.segments)
    .orderBy(schema.segments.position, schema.segments.name);
}

export async function getSegmentById(id: number) {
  const [row] = await db
    .select()
    .from(schema.segments)
    .where(eq(schema.segments.id, id))
    .limit(1);
  return row ?? null;
}

export async function getSegmentBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(schema.segments)
    .where(eq(schema.segments.slug, slug))
    .limit(1);
  return row ?? null;
}

export async function getAllPosts(options: { onlyPublished?: boolean } = {}) {
  const query = db.select().from(schema.posts).orderBy(desc(schema.posts.date));
  if (options.onlyPublished) {
    return query.where(eq(schema.posts.published, true));
  }
  return query;
}

export async function getPostById(id: number) {
  const [row] = await db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.id, id))
    .limit(1);
  return row ?? null;
}

export async function getPostBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.slug, slug))
    .limit(1);
  return row ?? null;
}

export async function getAllEvents() {
  return db
    .select()
    .from(schema.events)
    .orderBy(schema.events.position, schema.events.id);
}

// Esconde eventos já encerrados — um evento sem data é tratado como permanente.
export async function getActiveEvents() {
  const all = await getAllEvents();
  const today = new Date().toISOString().slice(0, 10);
  return all.filter((event) => {
    const effectiveEnd = event.endDate ?? event.startDate;
    return !effectiveEnd || effectiveEnd >= today;
  });
}

export async function getEventById(id: number) {
  const [row] = await db
    .select()
    .from(schema.events)
    .where(eq(schema.events.id, id))
    .limit(1);
  return row ?? null;
}

export async function getGalleryImages() {
  return db
    .select()
    .from(schema.galleryImages)
    .orderBy(schema.galleryImages.position, schema.galleryImages.id);
}

export async function getGalleryImageById(id: number) {
  const [row] = await db
    .select()
    .from(schema.galleryImages)
    .where(eq(schema.galleryImages.id, id))
    .limit(1);
  return row ?? null;
}

export async function getInstagramPosts() {
  return db
    .select()
    .from(schema.instagramPosts)
    .orderBy(schema.instagramPosts.position, schema.instagramPosts.id);
}

export async function getInstagramPostById(id: number) {
  const [row] = await db
    .select()
    .from(schema.instagramPosts)
    .where(eq(schema.instagramPosts.id, id))
    .limit(1);
  return row ?? null;
}

async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const [row] = await db
    .select()
    .from(schema.settings)
    .where(eq(schema.settings.key, key))
    .limit(1);
  if (!row) return fallback;
  try {
    return JSON.parse(row.value) as T;
  } catch {
    return fallback;
  }
}

export const defaultHero: HeroSettings = {
  eyebrow: "O Ninho da Moda · Brusque, SC",
  title: "30 anos de tradição. Mais de 160 lojas. O ninho da moda de Brusque.",
  titleHighlight: "Mais de 160 lojas.",
  image: "",
  ctaLabel: "Explore as lojas",
  ctaHref: "/lojas",
};

export const defaultContact: ContactSettings = {
  phone: siteContact.phone,
  whatsapp: siteContact.whatsapp,
  email: siteContact.email,
  addressLine1: siteContact.addressLine1,
  addressLine2: siteContact.addressLine2,
  neighborhood: siteContact.neighborhood,
  city: siteContact.city,
  state: siteContact.state,
  zip: siteContact.zip,
  hours: siteContact.hours,
  sundayNote: siteContact.sundayNote,
};

export async function getHero() {
  return getSetting<HeroSettings>("hero", defaultHero);
}

export async function getContact() {
  return getSetting<ContactSettings>("contact", defaultContact);
}

export async function getHighlights() {
  return getSetting<readonly string[]>("highlights", siteHighlights);
}

export async function getWholesaleBenefits() {
  return getSetting<readonly string[]>("wholesaleBenefits", wholesaleBenefits);
}

export async function getStopCredBenefits() {
  return getSetting<readonly string[]>("stopCredBenefits", stopCredBenefits);
}
