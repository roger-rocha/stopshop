"use client";

import Image from "next/image";
import { MapPin, Phone, Instagram, Store as StoreIcon } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn, whatsappLink } from "@/lib/utils";
import type { Store } from "@/db/schema";

interface StoreCardProps {
  store: Store;
  className?: string;
}

export function StoreCard({ store, className }: StoreCardProps) {
  const hasLogo = store.photo && store.photo.length > 0;
  const hasStorefront = store.storefront && store.storefront.length > 0;
  const instagramUrl = store.instagram
    ? store.instagram.startsWith("http")
      ? store.instagram
      : `https://instagram.com/${store.instagram.replace(/^@/, "")}`
    : undefined;

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border-default bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover",
        className
      )}
    >
      {/* Storefront photo */}
      <div className="relative h-44 w-full overflow-hidden bg-surface-muted sm:h-48">
        {hasStorefront ? (
          <Image
            src={store.storefront!}
            alt={`Fachada da loja ${store.name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-muted to-surface-light text-text-muted">
            <StoreIcon className="h-10 w-10" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Logo badge */}
        <div className="absolute bottom-3 left-3 flex h-14 w-14 items-center justify-center rounded-xl border border-white/60 bg-white p-2 shadow-card">
          {hasLogo ? (
            <Image
              src={store.photo}
              alt={`Logo ${store.name}`}
              width={48}
              height={48}
              className="object-contain"
            />
          ) : (
            <span className="text-center font-display text-[10px] font-bold leading-tight text-text-primary/40">
              {store.name}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-base font-bold text-text-primary">
            {store.name}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {store.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="rounded-pill bg-surface-muted px-2 py-0.5 text-[11px] font-medium text-text-secondary"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-text-muted">
          <MapPin className="h-3 w-3" />
          <span>{store.location}</span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-2">
          {store.phone && (
            <a
              href={`tel:${store.phone}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-text-secondary transition-colors hover:bg-brand-navy hover:text-white"
              aria-label={`Ligar para ${store.name}`}
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
          )}
          {store.whatsapp && (
            <a
              href={whatsappLink(
                store.whatsapp,
                `Olá! Gostaria de saber mais sobre a loja ${store.name} no Stop Shop.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
              aria-label={`WhatsApp ${store.name}`}
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-coral/10 text-brand-coral transition-colors hover:bg-brand-coral hover:text-white"
              aria-label={`Instagram ${store.name}`}
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
