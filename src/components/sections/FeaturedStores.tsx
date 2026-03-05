"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const featuredStores = [
  {
    name: "Lunender",
    category: "Moda Feminina",
    location: "Sala 45, Piso Térreo",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    phone: "4733514000",
    whatsapp: "4799004000",
  },
  {
    name: "Fortman",
    category: "Moda Masculina",
    location: "Sala 87, Piso Superior",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    phone: "4733517000",
    whatsapp: "4799007000",
  },
  {
    name: "Elian",
    category: "Moda Infantil",
    location: "Sala 51, Piso Térreo",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
    phone: "4733516000",
    whatsapp: "4799006000",
  },
];

export function FeaturedStores() {
  return (
    <section className="bg-surface-dark py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Lojas em Destaque"
          title="Conheça algumas das nossas lojas"
          highlight="nossas lojas"
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStores.map((store) => (
            <StaggerItem key={store.name}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="overflow-hidden rounded-2xl bg-surface-card border border-border-subtle"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={store.image}
                    alt={store.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-body text-lg font-semibold text-brand-cream">
                    {store.name}
                  </h3>
                  <span className="mt-1 inline-block rounded-pill bg-brand-coral-light/15 px-2.5 py-0.5 text-xs font-medium text-brand-coral-light">
                    {store.category}
                  </span>
                  <div className="mt-3 flex items-center gap-1.5 text-sm text-text-muted">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{store.location}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`tel:${store.phone}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-elevated text-text-muted hover:text-brand-cream transition-colors"
                      aria-label={`Ligar para ${store.name}`}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://wa.me/55${store.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
                      aria-label={`WhatsApp ${store.name}`}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="/lojas"
            className="group inline-flex items-center gap-2 font-medium text-brand-coral-light transition-colors hover:text-brand-cream"
          >
            Ver todas as lojas
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
