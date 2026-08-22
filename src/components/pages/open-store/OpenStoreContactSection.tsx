"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { OpenStoreFormCard } from "./OpenStoreFormCard";
import { siteContact } from "@/lib/site";
import { slideInLeft } from "@/lib/animations";

export function OpenStoreContactSection() {
  const whatsappHref = `https://wa.me/${siteContact.whatsapp}?text=${encodeURIComponent(
    "Olá! Tenho interesse em abrir uma loja no Stop Shop."
  )}`;

  return (
    <section className="bg-white px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <AnimateOnScroll variants={slideInLeft} className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Vamos conversar
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] text-text-primary text-balance">
            Pronto para fazer parte do Stop Shop?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text-secondary">
            Preencha o formulário ou fale diretamente com o time comercial.
            Respondemos todas as solicitações em até dois dias úteis.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border-default bg-surface-soft p-4 transition-colors hover:border-whatsapp/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-whatsapp/10 text-whatsapp">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-text-primary">WhatsApp comercial</span>
                <span className="block text-sm text-text-secondary">(47) 3255-7000</span>
              </span>
            </a>
            <a
              href={`mailto:${siteContact.email}`}
              className="flex items-center gap-4 rounded-2xl border border-border-default bg-surface-soft p-4 transition-colors hover:border-brand-coral/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-coral/10 text-brand-coral">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-text-primary">E-mail</span>
                <span className="block text-sm text-text-secondary">{siteContact.email}</span>
              </span>
            </a>
            <a
              href={`tel:${siteContact.phone}`}
              className="flex items-center gap-4 rounded-2xl border border-border-default bg-surface-soft p-4 transition-colors hover:border-brand-coral/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-coral/10 text-brand-coral">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-text-primary">Telefone</span>
                <span className="block text-sm text-text-secondary">(47) 3255-7000</span>
              </span>
            </a>
          </div>

          <dl className="mt-8 space-y-3 border-t border-border-default pt-6 text-sm text-text-secondary">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
              <dd>
                {siteContact.addressLine1}, {siteContact.addressLine2} — {siteContact.cityLine}
              </dd>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
              <dd>Atendimento comercial de segunda a sexta, das 9h às 18h.</dd>
            </div>
          </dl>
        </AnimateOnScroll>

        <AnimateOnScroll amount={0.1}>
          <OpenStoreFormCard />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
