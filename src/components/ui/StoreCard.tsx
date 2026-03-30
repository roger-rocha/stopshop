"use client";

import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn, whatsappLink } from "@/lib/utils";
import type { Store } from "@/lib/types";

interface StoreCardProps {
  store: Store;
  className?: string;
}

export function StoreCard({ store, className }: StoreCardProps) {
  const hasLogo = store.photo && store.photo.length > 0;

  return (
    <div
      className={cn(
        "group flex h-full items-center gap-5 rounded-xl border border-border-default bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-card-hover",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-surface-soft p-3">
        {hasLogo ? (
          <Image
            src={store.photo}
            alt={`Logo ${store.name}`}
            width={64}
            height={64}
            className="object-contain"
          />
        ) : (
          <span className="text-center font-display text-sm font-bold leading-tight text-text-primary/25">
            {store.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
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

        <div className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
          <MapPin className="h-3 w-3" />
          <span>{store.location}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col gap-2">
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
            href={whatsappLink(store.whatsapp, `Olá! Gostaria de saber mais sobre a loja ${store.name} no Stop Shop.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
            aria-label={`WhatsApp ${store.name}`}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
