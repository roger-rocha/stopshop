import "server-only";
import { asc, desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import {
  defaultHeroContent,
  siteContact,
  siteHighlights,
  wholesaleBenefits,
} from "@/lib/site";
import {
  legalPageDefaults,
  legalPageBySlug,
  type LegalPageSlug,
} from "@/lib/data/legal";
import type {
  ContactSettings,
  HeroSettings,
  LegalPageInput,
} from "@/lib/validators";

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
  ...defaultHeroContent,
  image: "",
  slides: [],
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
  const hero = await getSetting<HeroSettings>("hero", defaultHero);
  // Registros salvos antes do carrossel não têm `slides`; garante o array.
  return { ...hero, slides: Array.isArray(hero.slides) ? hero.slides : [] };
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

export type LegalPage = LegalPageInput & {
  slug: LegalPageSlug;
  /** ISO (YYYY-MM-DD) da última edição — vem do registro salvo, ou do default. */
  updatedAt: string;
};

/**
 * Lê a política do banco e cai no texto padrão do código quando ainda não há
 * registro salvo — é o que mantém as páginas de pé antes do primeiro seed.
 */
export async function getLegalPage(slug: LegalPageSlug): Promise<LegalPage> {
  const fallback = legalPageDefaults[slug];
  const entry = legalPageBySlug(slug);
  if (!entry) {
    return { slug, ...fallback, updatedAt: fallback.fallbackDate };
  }

  const [row] = await db
    .select()
    .from(schema.settings)
    .where(eq(schema.settings.key, entry.settingKey))
    .limit(1);

  if (!row) {
    return { slug, ...fallback, updatedAt: fallback.fallbackDate };
  }

  try {
    const saved = JSON.parse(row.value) as Partial<LegalPageInput>;
    return {
      slug,
      title: saved.title || fallback.title,
      description: saved.description || fallback.description,
      body: saved.body || fallback.body,
      updatedAt: new Date(row.updatedAt * 1000).toISOString().slice(0, 10),
    };
  } catch {
    return { slug, ...fallback, updatedAt: fallback.fallbackDate };
  }
}

export async function getAllJobOpenings() {
  return db
    .select()
    .from(schema.jobOpenings)
    .orderBy(asc(schema.jobOpenings.position), desc(schema.jobOpenings.id));
}

export async function getPublishedJobOpenings() {
  return db
    .select()
    .from(schema.jobOpenings)
    .where(eq(schema.jobOpenings.published, true))
    .orderBy(asc(schema.jobOpenings.position), desc(schema.jobOpenings.id));
}

export async function getAllServices() {
  return db
    .select()
    .from(schema.services)
    .orderBy(asc(schema.services.position), asc(schema.services.name));
}

export async function getPublishedServices() {
  return db
    .select()
    .from(schema.services)
    .where(eq(schema.services.published, true))
    .orderBy(asc(schema.services.position), asc(schema.services.name));
}

export async function getServiceById(id: number) {
  const [row] = await db
    .select()
    .from(schema.services)
    .where(eq(schema.services.id, id))
    .limit(1);
  return row ?? null;
}

export async function getJobOpeningById(id: number) {
  const [row] = await db
    .select()
    .from(schema.jobOpenings)
    .where(eq(schema.jobOpenings.id, id))
    .limit(1);
  return row ?? null;
}
