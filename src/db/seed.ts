import bcrypt from "bcryptjs";
import { db, schema } from "./client";
import { eq } from "drizzle-orm";
import { stores as mockStores } from "@/lib/data/stores";
import { segments as mockSegments } from "@/lib/data/segments";
import { seedEvents } from "@/lib/data/agenda";
import { seedGalleryImages } from "@/lib/data/gallery";
import { seedInstagramPosts } from "@/lib/data/instagram";
import {
  siteContact,
  siteHighlights,
  wholesaleBenefits,
  stopCredBenefits,
} from "@/lib/site";

async function seed() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Administrador";

  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local before seeding."
    );
  }

  const existingAdmin = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
    .limit(1);

  if (existingAdmin.length === 0) {
    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(schema.users).values({ email, passwordHash, name });
    console.log(`✓ Admin criado: ${email}`);
  } else {
    console.log(`= Admin já existe: ${email}`);
  }

  const segmentCount = await db.$count(schema.segments);
  if (segmentCount === 0) {
    await db.insert(schema.segments).values(
      mockSegments.map((segment, index) => ({
        name: segment.name,
        slug: segment.slug,
        color: segment.color,
        image: segment.image ?? null,
        storeCount: segment.storeCount,
        position: index,
      }))
    );
    console.log(`✓ ${mockSegments.length} segmentos inseridos`);
  } else {
    console.log(`= Segmentos já populados (${segmentCount})`);
  }

  const storeCount = await db.$count(schema.stores);
  if (storeCount === 0) {
    await db.insert(schema.stores).values(
      mockStores.map((store) => ({
        name: store.name,
        slug: store.slug,
        photo: store.photo,
        storefront: store.storefront ?? null,
        instagram: store.instagram ?? null,
        categories: store.categories,
        segment: store.segment,
        phone: store.phone ?? null,
        whatsapp: store.whatsapp ?? null,
        location: store.location,
        floor: store.floor,
        featured: store.featured,
      }))
    );
    console.log(`✓ ${mockStores.length} lojas inseridas`);
  } else {
    console.log(`= Lojas já populadas (${storeCount})`);
  }

  const eventCount = await db.$count(schema.events);
  if (eventCount === 0) {
    await db.insert(schema.events).values(seedEvents);
    console.log(`✓ ${seedEvents.length} eventos inseridos`);
  } else {
    console.log(`= Eventos já populados (${eventCount})`);
  }

  const galleryCount = await db.$count(schema.galleryImages);
  if (galleryCount === 0) {
    await db.insert(schema.galleryImages).values(seedGalleryImages);
    console.log(`✓ ${seedGalleryImages.length} fotos da galeria inseridas`);
  } else {
    console.log(`= Galeria já populada (${galleryCount})`);
  }

  const instagramCount = await db.$count(schema.instagramPosts);
  if (instagramCount === 0) {
    await db.insert(schema.instagramPosts).values(seedInstagramPosts);
    console.log(
      `✓ ${seedInstagramPosts.length} publicações do Instagram inseridas`
    );
  } else {
    console.log(`= Instagram já populado (${instagramCount})`);
  }

  const defaults: Array<{ key: string; value: unknown }> = [
    {
      key: "hero",
      value: {
        eyebrow: "O Ninho da Moda · Brusque, SC",
        title: "30 anos de tradição. Mais de 160 lojas. O ninho da moda de Brusque.",
        titleHighlight: "Mais de 160 lojas.",
        image: "",
        ctaLabel: "Explore as lojas",
        ctaHref: "/lojas",
      },
    },
    {
      key: "contact",
      value: {
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
      },
    },
    { key: "highlights", value: siteHighlights },
    { key: "wholesaleBenefits", value: wholesaleBenefits },
    { key: "stopCredBenefits", value: stopCredBenefits },
  ];

  for (const { key, value } of defaults) {
    const existing = await db
      .select()
      .from(schema.settings)
      .where(eq(schema.settings.key, key))
      .limit(1);
    if (existing.length === 0) {
      await db
        .insert(schema.settings)
        .values({ key, value: JSON.stringify(value) });
      console.log(`✓ Configuração inserida: ${key}`);
    }
  }

  console.log("✓ Seed completo");
}

seed().catch((error) => {
  console.error("✗ Seed falhou:", error);
  process.exit(1);
});
