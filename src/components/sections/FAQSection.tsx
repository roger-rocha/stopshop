"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { faqItems } from "@/lib/data/faq";
import { slideInLeft, slideInRight } from "@/lib/animations";

export function FAQSection() {
  return (
    <section className="relative isolate overflow-hidden bg-surface-light py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <SectionBackground src="/images/sections/faq.jpg" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-brand-gold/6 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Left: decorative */}
          <AnimateOnScroll
            variants={slideInLeft}
            className="lg:col-span-2 flex flex-col justify-center"
          >
            <SectionHeader
              title="Perguntas Frequentes"
              highlight="Frequentes"
              align="left"
              light
              className="mb-6"
            />
            <p className="text-text-secondary leading-relaxed">
              Tire suas dúvidas sobre o Stop Shop. Se não encontrar o que procura, entre em contato pelo nosso WhatsApp.
            </p>
            <div className="mt-8 hidden lg:block">
              <div className="h-px w-16 bg-brand-gold/30" />
              <p className="mt-4 text-sm text-text-muted">
                Atendimento de segunda a sábado, das 09h às 19h.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Right: accordion */}
          <AnimateOnScroll variants={slideInRight} className="lg:col-span-3">
            <FAQAccordion items={faqItems} />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
