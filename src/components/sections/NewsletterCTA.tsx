"use client";

import { Send } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";

export function NewsletterCTA() {
  return (
    <section className="bg-gradient-to-br from-surface-dark via-surface-card to-surface-dark py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-3xl">
        <AnimateOnScroll className="text-center">
          <h2 className="font-display text-[length:var(--font-size-heading)] font-bold text-white">
            Receba novidades e <span className="text-brand-gold">promoções</span>
          </h2>
          <p className="mt-3 text-lg text-text-secondary">
            Cadastre-se na nossa newsletter e fique por dentro de tudo que acontece no Stop Shop.
          </p>

          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Digite seu melhor e-mail"
              className="flex-1 rounded-button border border-border-subtle bg-surface-card px-6 py-4 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-gold focus:ring-1 focus:ring-brand-gold sm:rounded-r-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-button bg-brand-gold px-8 py-4 font-medium text-surface-dark transition-colors hover:bg-brand-gold-light sm:rounded-l-none"
            >
              <Send className="h-4 w-4" />
              Inscrever-se
            </button>
          </form>

          <p className="mt-4 text-sm text-text-muted">
            Sem spam. Cancele quando quiser.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
