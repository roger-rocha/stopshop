"use client";

import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { openStoreFaq } from "@/lib/data/open-store";

export function OpenStoreFAQ() {
  return (
    <section className="bg-surface-light px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5 lg:gap-14">
        <AnimateOnScroll className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
            Dúvidas de lojistas
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] text-text-primary text-balance">
            Perguntas frequentes sobre abrir uma loja
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary">
            Não encontrou o que procura? Envie sua dúvida pelo formulário acima
            e o time comercial responde.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll className="lg:col-span-3" amount={0.1}>
          <FAQAccordion items={openStoreFaq} />
        </AnimateOnScroll>
      </div>
    </section>
  );
}
