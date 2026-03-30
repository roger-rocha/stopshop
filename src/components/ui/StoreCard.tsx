"use client";

import { MapPin, Phone, MessageCircle } from "lucide-react";
import { cn, whatsappLink } from "@/lib/utils";
import type { Store } from "@/lib/types";

interface StoreCardProps {
  store: Store;
  variant?: "default" | "featured";
  className?: string;
}

export function StoreCard({ store, variant = "default", className }: StoreCardProps) {
  const isFeatured = variant === "featured";

  return (
    <div
      className={cn(
        "group h-full overflow-hidden rounded-xl border border-border-default bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover",
        className
      )}
    >
      {/* Header */}
      <div className={cn("relative overflow-hidden bg-surface-muted", isFeatured ? "h-64" : "h-44")}>
        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
            Stop Shop
          </p>
          <p className={cn(
            "mt-2 font-display font-bold text-text-primary",
            isFeatured ? "text-3xl" : "text-2xl"
          )}>
            {store.name}
          </p>
          <p className="mt-1.5 text-sm text-text-muted">{store.floor}</p>
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-5", isFeatured && "p-6")}>
        <h3 className={cn(
          "font-display font-bold text-text-primary",
          isFeatured ? "text-xl" : "text-lg"
        )}>
          {store.name}
        </h3>

        {/* Category pills */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {store.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-pill bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-text-secondary"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Location */}
        <div className="mt-3 flex items-center gap-1.5 text-sm text-text-muted">
          <MapPin className="h-3.5 w-3.5" />
          <span>{store.location}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          {store.phone && (
            <a
              href={`tel:${store.phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-elevated text-text-secondary transition-colors hover:bg-brand-navy hover:text-white"
              aria-label={`Ligar para ${store.name}`}
            >
              <Phone className="h-4 w-4" />
            </a>
          )}
          {store.whatsapp && (
            <a
              href={whatsappLink(store.whatsapp, `Olá! Gostaria de saber mais sobre a loja ${store.name} no Stop Shop.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
              aria-label={`WhatsApp ${store.name}`}
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
