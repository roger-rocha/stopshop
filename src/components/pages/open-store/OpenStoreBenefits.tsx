"use client";

import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { partnershipBenefits } from "@/lib/data/open-store";

export function OpenStoreBenefits() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy px-[var(--spacing-section-x)] py-[var(--spacing-section-y)] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-coral/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 h-[24rem] w-[24rem] rounded-full bg-brand-gold/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <AnimateOnScroll className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Parceria estratégica
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.08] text-balance">
              A força de um shopping com 30 anos de tradição trabalhando para a sua marca.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/72">
              Lojistas do Stop Shop contam com um time exclusivo para
              implantação, marketing e operação. Você cuida da sua loja; nós
              cuidamos de trazer o público.
            </p>

            <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="flex -space-x-2">
                {["C", "H", "M", "A"].map((letter) => (
                  <span
                    key={letter}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-navy bg-white font-display text-sm font-bold text-brand-navy"
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/70">
                Colcci, Hering, Malwee, Arezzo e outras 160 marcas já operam aqui.
              </p>
            </div>
          </AnimateOnScroll>

          <StaggerChildren className="grid gap-4 sm:grid-cols-2">
            {partnershipBenefits.map((benefit, index) => (
              <StaggerItem key={benefit.title}>
                <article className="group h-full rounded-[24px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <span className="font-display text-sm text-white/30 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/68">
                    {benefit.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
