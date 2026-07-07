"use client";

import Image from "next/image";
import { Phone, Instagram, Store as StoreIcon } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn, whatsappLink } from "@/lib/utils";
import type { Store } from "@/db/schema";

interface StoreCardProps {
  store: Store;
  className?: string;
}

export function StoreCard({ store, className }: StoreCardProps) {
  const hasStorefront = store.storefront && store.storefront.length > 0;
  const hasLogo = store.photo && store.photo.length > 0;
  const image = hasStorefront ? store.storefront! : hasLogo ? store.photo : null;
  const segmentLabel = store.categories[0];
  const instagramUrl = store.instagram
    ? store.instagram.startsWith("http")
      ? store.instagram
      : `https://instagram.com/${store.instagram.replace(/^@/, "")}`
    : undefined;

  return (
    <article className={cn("group flex h-full flex-col", className)}>
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-surface-muted">
        {image ? (
          <Image
            src={image}
            alt={`Loja ${store.name}`}
            fill
            className={cn(
              "transition-transform duration-500 group-hover:scale-105",
              hasStorefront ? "object-cover" : "object-contain p-8"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            <StoreIcon className="h-10 w-10" aria-hidden="true" />
          </div>
        )}
        {segmentLabel && (
          <span className="absolute left-3 top-3 rounded-pill bg-white/95 px-3 py-1 text-[11px] font-semibold text-brand-navy shadow-card backdrop-blur-sm">
            {segmentLabel}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="font-display text-base font-bold text-text-primary">
          {store.name}
        </h3>
        <p className="mt-0.5 text-sm text-text-secondary">
          {store.categories.slice(0, 2).join(" · ")}
        </p>
        <p className="mt-0.5 text-sm text-text-muted">{store.location}</p>

        {/* Social buttons */}
        <div className="mt-auto flex items-center gap-2 pt-3">
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
