"use client";

import { MapPin, Clock, Navigation } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { siteContact } from "@/lib/site";

const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.5!2d-48.9183!3d-27.0978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94df1db8fba3b2db%3A0x4c8e1e1e1e1e1e1e!2sRodovia+Ant%C3%B4nio+Heil%2C+635+-+Santa+Terezinha%2C+Brusque+-+SC!5e0!3m2!1spt-BR!2sbr";

export function LocationSection() {
  return (
    <section className="bg-surface-dark py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left column — info + map on mobile */}
          <AnimateOnScroll variants={slideInLeft}>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
              Localização
            </span>
            <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-white">
              Como chegar
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
              Localização estratégica em Brusque, com acesso facilitado, estacionamento e infraestrutura para receber clientes de toda a região.
            </p>

            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-gold" />
              <div>
                <p className="font-medium text-white">{siteContact.addressLine1}</p>
                <p className="text-sm text-white/70">
                  {siteContact.addressLine2} · {siteContact.city}, {siteContact.state}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-brand-gold" />
              <div>
                <p className="font-medium text-white">Horários de funcionamento</p>
                <p className="text-sm text-white/70">{siteContact.hours}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-white/70">
              Telefone:{" "}
              <a href={`tel:${siteContact.phone}`} className="transition-colors hover:text-white">
                (47) 3255-7000
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://maps.google.com/?q=Stop+Shop+Brusque"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-brand-navy"
              >
                <Navigation className="h-4 w-4" />
                Google Maps
              </a>
              <a
                href="https://waze.com/ul?q=Stop+Shop+Brusque"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-brand-navy"
              >
                <Navigation className="h-4 w-4" />
                Waze
              </a>
            </div>

            {/* Google Maps — visible on mobile only */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 lg:hidden">
              <iframe
                src={mapEmbedSrc}
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Stop Shop no Google Maps"
              />
            </div>
          </AnimateOnScroll>

          {/* Right column — card with map, desktop only */}
          <AnimateOnScroll variants={slideInRight} className="hidden lg:block">
            <div className="relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-white/14 bg-white/10 p-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">
                  Endereço
                </p>
                <p className="mt-3 max-w-xs font-display text-3xl leading-tight text-white">
                  {siteContact.addressLine1}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/74">
                  {siteContact.addressLine2} · {siteContact.cityLine}
                </p>
              </div>

              {/* Google Maps */}
              <div className="mt-6 flex-1 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src={mapEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 180 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Stop Shop no Google Maps"
                />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/55">
                    Horário
                  </p>
                  <p className="mt-2 text-sm text-white/78">{siteContact.hours}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/55">
                    Estacionamento
                  </p>
                  <p className="mt-2 text-sm text-white/78">
                    2 áreas externas gratuitas e 1 coberta paga.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
