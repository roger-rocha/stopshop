import Link from "next/link";
import {
  Store,
  Layers,
  FileText,
  CalendarDays,
  Images,
  Instagram,
  Settings,
} from "lucide-react";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

async function loadCounts() {
  const [
    storesTotal,
    storesFeatured,
    segmentsTotal,
    postsTotal,
    postsPublished,
    eventsTotal,
    galleryTotal,
    instagramTotal,
  ] = await Promise.all([
    db.$count(schema.stores),
    db.$count(schema.stores, eq(schema.stores.featured, true)),
    db.$count(schema.segments),
    db.$count(schema.posts),
    db.$count(schema.posts, eq(schema.posts.published, true)),
    db.$count(schema.events),
    db.$count(schema.galleryImages),
    db.$count(schema.instagramPosts),
  ]);
  return {
    storesTotal,
    storesFeatured,
    segmentsTotal,
    postsTotal,
    postsPublished,
    eventsTotal,
    galleryTotal,
    instagramTotal,
  };
}

export default async function DashboardPage() {
  const counts = await loadCounts();

  const cards = [
    {
      href: "/admin/stores",
      icon: Store,
      label: "Lojas",
      value: counts.storesTotal,
      hint: `${counts.storesFeatured} em destaque`,
    },
    {
      href: "/admin/segments",
      icon: Layers,
      label: "Segmentos",
      value: counts.segmentsTotal,
      hint: "Categorias do site",
    },
    {
      href: "/admin/posts",
      icon: FileText,
      label: "Posts",
      value: counts.postsTotal,
      hint: `${counts.postsPublished} publicados`,
    },
    {
      href: "/admin/agenda",
      icon: CalendarDays,
      label: "Agenda",
      value: counts.eventsTotal,
      hint: "Eventos do carrossel da home",
    },
    {
      href: "/admin/gallery",
      icon: Images,
      label: "Galeria",
      value: counts.galleryTotal,
      hint: "Fotos da seção Sobre",
    },
    {
      href: "/admin/instagram",
      icon: Instagram,
      label: "Instagram",
      value: counts.instagramTotal,
      hint: "Publicações da grade da home",
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Configurações",
      value: "—",
      hint: "Hero, contato e listas",
    },
  ];

  return (
    <div>
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-coral">
          Dashboard
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-text-primary">
          Olá! O que vamos atualizar hoje?
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          Gerencie lojas, segmentos, posts, agenda, galeria e configurações do
          site.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-[20px] border border-border-default bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-button bg-brand-navy/5 text-brand-navy">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs text-text-muted group-hover:text-brand-coral">
                  Abrir →
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-text-secondary">
                {card.label}
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-text-primary">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-text-muted">{card.hint}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
