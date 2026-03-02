"use client";

import { Send } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";

export function NewsletterCTA() {
  return (
    <section className="bg-brand-coral py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-3xl">
        <AnimateOnScroll className="text-center">
          <h2 className="font-display text-[length:var(--font-size-heading)] font-bold text-white">
            Receba novidades e promoções
          </h2>
          <p className="mt-3 text-lg text-white/80">
            Cadastre-se na nossa newsletter e fique por dentro de tudo que acontece no Stop Shop.
          </p>

          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Digite seu melhor e-mail"
              className="flex-1 rounded-button px-6 py-4 text-text-primary outline-none placeholder:text-text-muted focus:ring-2 focus:ring-brand-navy sm:rounded-r-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-button bg-brand-navy px-8 py-4 font-medium text-white transition-colors hover:bg-brand-navy-light sm:rounded-l-none"
            >
              <Send className="h-4 w-4" />
              Inscrever-se
            </button>
          </form>

          <p className="mt-4 text-sm text-white/60">
            Sem spam. Cancele quando quiser.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
