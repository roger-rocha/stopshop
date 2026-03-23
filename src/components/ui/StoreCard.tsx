"use client";

import { motion } from "motion/react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { cn, whatsappLink } from "@/lib/utils";
import type { Store } from "@/lib/types";

interface StoreCardProps {
  store: Store;
  className?: string;
}

export function StoreCard({ store, className }: StoreCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group overflow-hidden rounded-2xl border border-border-default bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-brand-coral/20 hover:shadow-card-hover",
        className
      )}
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden bg-[image:var(--gradient-brand-diagonal)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_35%)]" />
        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-[-4px]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Stop Shop
          </p>
          <p className="mt-2 font-display text-2xl font-bold text-white">{store.name}</p>
          <p className="mt-1 text-sm text-white/75">{store.floor}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-text-primary">
          {store.name}
        </h3>

        {/* Category pills */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {store.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-pill bg-brand-coral/10 px-2.5 py-0.5 text-xs font-medium text-brand-coral"
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-elevated text-text-secondary hover:bg-brand-navy hover:text-white"
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp hover:bg-whatsapp hover:text-white transition-colors"
              aria-label={`WhatsApp ${store.name}`}
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
