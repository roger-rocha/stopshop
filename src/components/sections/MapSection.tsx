"use client";

import { MapPin, Navigation, Clock } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { siteContact } from "@/lib/site";

const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.5!2d-48.9183!3d-27.0978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df1db8fba3b2db%3A0x4c8e1e1e1e1e1e1e!2sRodovia+Ant%C3%B4nio+Heil%2C+635+-+Santa+Terezinha%2C+Brusque+-+SC!5e0!3m2!1spt-BR!2sbr";

export function MapSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:grid-cols-[420px_1fr]">
        <AnimateOnScroll className="px-[var(--spacing-section-x)] py-[var(--spacing-section-y)] lg:py-20">
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
            Como chegar
          </span>
          <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-white">
            Estamos em Brusque, SC
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
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

        <div className="relative min-h-[360px] lg:min-h-[520px]">
          <iframe
            src={mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização do Stop Shop no Google Maps"
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
