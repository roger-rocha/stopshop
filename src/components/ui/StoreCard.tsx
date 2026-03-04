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
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "group overflow-hidden rounded-card bg-surface-card border border-border-subtle shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-300",
        className
      )}
    >
      {/* Photo */}
      <div className="relative h-48 overflow-hidden bg-surface-elevated">
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/60 to-transparent z-10" />
        <div className="h-full w-full bg-brand-navy-light group-hover:scale-110 transition-transform duration-500" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-text-primary">
          {store.name}
        </h3>

        {/* Category pills */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {store.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-pill bg-brand-gold/10 px-2.5 py-0.5 text-xs font-medium text-brand-gold"
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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-text-secondary hover:bg-brand-gold hover:text-surface-dark transition-colors"
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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
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
