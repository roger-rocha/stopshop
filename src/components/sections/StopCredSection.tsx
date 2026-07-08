"use client";

import { motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { StopCredCard } from "@/components/ui/StopCredCard";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { stopCredBenefits } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

function BenefitItem({ text, index }: { text: string; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.55, ease }}
      className="group flex items-center gap-3 rounded-xl px-3 py-2 -mx-3 transition-colors duration-300 hover:bg-brand-coral/[0.06]"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-coral shadow-[0_3px_10px_-2px_rgba(255,107,107,0.55)] transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
          <motion.path
            d="M5 13l4 4L19 7"
            fill="none"
            stroke="white"
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.35, ease: "easeOut" }}
          />
        </svg>
      </span>
      <span className="text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
        {text}
      </span>
    </motion.li>
  );
}

export function StopCredSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <SectionBackground src="/images/sections/stop-cred.jpg" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-navy/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-brand-gold/8 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Cartão 3D interativo */}
          <AnimateOnScroll variants={slideInLeft} className="flex justify-center">
            <StopCredCard />
          </AnimateOnScroll>

          {/* Benefícios */}
          <AnimateOnScroll variants={slideInRight}>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-coral">
              Stop Cred
            </span>
            <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-text-primary">
              Seu crediário sem complicação
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-text-secondary">
              Uma solução prática para clientes de Brusque e região comprarem com mais flexibilidade e atendimento próximo.
            </p>

            <ul className="mt-8 space-y-1.5">
              {stopCredBenefits.map((benefit, index) => (
                <BenefitItem key={benefit} text={benefit} index={index} />
              ))}
            </ul>

            <p className="mt-6 text-sm text-text-muted">
              Válido para residentes de Brusque e região.
            </p>

            <div className="mt-6">
              <CTAButton href="/stop-cred" variant="secondary" className="rounded-full">
                Saiba mais
              </CTAButton>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
