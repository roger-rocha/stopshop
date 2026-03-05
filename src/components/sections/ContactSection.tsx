"use client";

import { Phone, Mail, MessageCircle } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { slideInLeft, slideInRight } from "@/lib/animations";

export function ContactSection() {
  return (
    <section className="bg-surface-card py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <AnimateOnScroll variants={slideInLeft}>
            <h2 className="font-display text-[length:var(--font-size-heading)] font-bold text-brand-cream">
              Fale Conosco
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              Entre em contato com nossa equipe. Estamos prontos para ajudar.
            </p>

            <StaggerChildren className="mt-8 space-y-4">
              <StaggerItem className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-elevated">
                  <Phone className="h-5 w-5 text-brand-coral-light" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">Telefone</p>
                  <a href="tel:4732557000" className="text-brand-cream hover:text-brand-coral-light transition-colors">
                    (47) 3255-7000
                  </a>
                </div>
              </StaggerItem>
              <StaggerItem className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-elevated">
                  <Mail className="h-5 w-5 text-brand-coral-light" />
                </div>
                <div>
                  <p className="text-sm text-text-muted">E-mail</p>
                  <a href="mailto:comercial@stopshop.com.br" className="text-brand-cream hover:text-brand-coral-light transition-colors">
                    comercial@stopshop.com.br
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
                    href="https://wa.me/554732557000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-cream hover:text-[#25D366] transition-colors"
                  >
                    (47) 3255-7000
                  </a>
                </div>
              </StaggerItem>
            </StaggerChildren>
          </AnimateOnScroll>

          <AnimateOnScroll variants={slideInRight}>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full rounded-button border border-border-subtle bg-surface-dark px-4 py-3 text-brand-cream placeholder:text-text-muted/50 outline-none focus:border-brand-coral-light focus:ring-1 focus:ring-brand-coral-light transition-all"
              />
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full rounded-button border border-border-subtle bg-surface-dark px-4 py-3 text-brand-cream placeholder:text-text-muted/50 outline-none focus:border-brand-coral-light focus:ring-1 focus:ring-brand-coral-light transition-all"
              />
              <select className="w-full rounded-button border border-border-subtle bg-surface-dark px-4 py-3 text-text-muted outline-none focus:border-brand-coral-light focus:ring-1 focus:ring-brand-coral-light transition-all">
                <option value="">Departamento</option>
                <option value="ouvidoria">Ouvidoria</option>
                <option value="marketing">Marketing</option>
                <option value="administrativo">Administrativo</option>
              </select>
              <textarea
                rows={4}
                placeholder="Sua mensagem"
                className="w-full resize-none rounded-button border border-border-subtle bg-surface-dark px-4 py-3 text-brand-cream placeholder:text-text-muted/50 outline-none focus:border-brand-coral-light focus:ring-1 focus:ring-brand-coral-light transition-all"
              />
              <button
                type="submit"
                className="w-full rounded-button bg-brand-coral px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-coral-dark sm:w-auto"
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
