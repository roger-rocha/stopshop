"use client";

import { MapPin, Clock, Navigation } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { siteContact } from "@/lib/site";

export function LocationSection() {
  return (
    <section className="bg-white py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <AnimateOnScroll variants={slideInLeft}>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-coral">
              Localização
            </span>
            <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-text-primary">
              Como chegar
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
              Localização estratégica em Brusque, com acesso facilitado, estacionamento e infraestrutura para receber clientes de toda a região.
            </p>

            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-coral" />
              <div>
                <p className="font-medium text-text-primary">{siteContact.addressLine1}</p>
                <p className="text-sm text-text-secondary">
                  {siteContact.addressLine2} · {siteContact.city}, {siteContact.state}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-brand-coral" />
              <div>
                <p className="font-medium text-text-primary">Horários de funcionamento</p>
                <p className="text-sm text-text-secondary">{siteContact.hours}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-text-secondary">
              Telefone: (47) 3255-7000
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href="https://maps.google.com/?q=Stop+Shop+Brusque"
                external
                variant="secondary"
                className="rounded-full"
              >
                <Navigation className="h-4 w-4" />
                Google Maps
              </CTAButton>
              <CTAButton
                href="https://waze.com/ul?q=Stop+Shop+Brusque"
                external
                variant="secondary"
                className="rounded-full"
              >
                <Navigation className="h-4 w-4" />
                Waze
              </CTAButton>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variants={slideInRight}>
            <div className="relative h-80 overflow-hidden rounded-[28px] border border-border-default bg-[linear-gradient(135deg,_rgba(18,24,86,1)_0%,_rgba(41,71,240,0.92)_100%)] shadow-card lg:h-full lg:min-h-[400px]">
              <div className="absolute inset-6 rounded-[24px] border border-white/14 bg-white/10 p-6 backdrop-blur-sm">
                <div className="flex h-full flex-col justify-between">
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
                  <div className="grid gap-3 sm:grid-cols-2">
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
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
