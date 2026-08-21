"use client";

import Image from "next/image";
import { MapPin, Navigation, Clock } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { siteContact } from "@/lib/site";

// O mapa incorporado saiu do lugar: o fundo agora é uma foto do Stop Shop e os
// botões continuam levando para Google Maps / Waze.
const backgroundImage = "/images/stopshop-hero.png";

export function MapSection() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy">
      <div className="absolute inset-0 -z-10">
        <Image
          src={backgroundImage}
          alt="Fachada do Stop Shop em Brusque"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,12,40,0.95)] via-[rgba(8,12,40,0.75)] to-[rgba(8,12,40,0.35)]" />
      </div>

      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
        <AnimateOnScroll className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
            Como chegar
          </span>
          <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-white">
            Estamos em Brusque, SC
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Localização estratégica com acesso facilitado, estacionamento e
            infraestrutura para receber clientes de toda a região.
          </p>

          <ul className="mt-8 space-y-5 text-white/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
              <div>
                <p className="font-medium text-white">
                  {siteContact.addressLine1}
                </p>
                <p className="text-sm text-white/70">
                  {siteContact.addressLine2} · {siteContact.cityLine}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
              <div>
                <p className="font-medium text-white">Funcionamento</p>
                <p className="text-sm text-white/70">{siteContact.hours}</p>
              </div>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://maps.google.com/?q=Stop+Shop+Brusque"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-cream"
            >
              <Navigation className="h-4 w-4" />
              Google Maps
            </a>
            <a
              href="https://waze.com/ul?q=Stop+Shop+Brusque"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Navigation className="h-4 w-4" />
              Waze
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
