"use client";

import { Phone, Mail, MessageCircle } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { siteContact } from "@/lib/site";

export function ContactSection() {
  return (
    <section className="bg-surface-light py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <AnimateOnScroll variants={slideInLeft}>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-coral">
              Contato
            </p>
            <h2 className="font-display text-[length:var(--font-size-heading)] font-bold text-text-primary">
              Fale Conosco
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              Entre em contato com nossa equipe para informações sobre lojas, localização, atacado e atendimento geral.
            </p>

            <StaggerChildren className="mt-8 space-y-4">
              <StaggerItem className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <Phone className="h-5 w-5 text-brand-coral" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Telefone</p>
                  <a
                    href={`tel:${siteContact.phone}`}
                    className="text-text-primary hover:text-brand-coral"
                  >
                    (47) 3255-7000
                  </a>
                </div>
              </StaggerItem>
              <StaggerItem className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                  <Mail className="h-5 w-5 text-brand-coral" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">E-mail</p>
                  <a
                    href={`mailto:${siteContact.email}`}
                    className="text-text-primary hover:text-brand-coral"
                  >
                    {siteContact.email}
                  </a>
                </div>
              </StaggerItem>
              <StaggerItem className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">WhatsApp</p>
                  <a
                    href={`https://wa.me/${siteContact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-[#25D366]"
                  >
                    (47) 3255-7000
                  </a>
                </div>
              </StaggerItem>
            </StaggerChildren>
          </AnimateOnScroll>

          <AnimateOnScroll variants={slideInRight}>
            <form
              className="space-y-4 rounded-[28px] border border-border-default bg-white p-6 shadow-card"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              />
              <select className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-secondary outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral">
                <option value="">Departamento</option>
                <option value="ouvidoria">Ouvidoria</option>
                <option value="marketing">Marketing</option>
                <option value="administrativo">Administrativo</option>
              </select>
              <textarea
                rows={4}
                placeholder="Sua mensagem"
                className="w-full resize-none rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary placeholder:text-text-muted outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              />
              <button
                type="submit"
                className="w-full rounded-button bg-brand-coral px-6 py-3 font-semibold text-white hover:bg-brand-coral-dark sm:w-auto"
              >
                Enviar mensagem
              </button>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
