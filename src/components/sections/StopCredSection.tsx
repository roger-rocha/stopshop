"use client";

import { Check } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { slideInLeft, slideInRight } from "@/lib/animations";

const benefits = [
  "Anuidade ZERO",
  "Primeiro vencimento em 30 dias",
  "Até 6x sem juros",
  "Linha direta com atendentes",
];

export function StopCredSection() {
  return (
    <section className="bg-surface-card py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Credit card mockup */}
          <AnimateOnScroll variants={slideInLeft} className="flex justify-center">
            <div
              className="relative w-full max-w-[380px] rounded-2xl p-8 text-white"
              style={{
                aspectRatio: "1.6/1",
                background: "linear-gradient(135deg, #E94560 0%, #0F1117 100%)",
                transform: "perspective(800px) rotateY(-5deg)",
              }}
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-white/60">
                    Crediário Próprio
                  </p>
                  <p className="mt-2 font-display text-2xl font-bold">STOP CRED</p>
                </div>
                <div>
                  <div className="flex gap-3 text-lg tracking-[0.3em] text-white/70">
                    <span>••••</span>
                    <span>••••</span>
                    <span>••••</span>
                    <span>••••</span>
                  </div>
                  <p className="mt-3 text-xs text-white/50">Stop Shop · Brusque, SC</p>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-white/5" />
            </div>
          </AnimateOnScroll>

          {/* Benefits */}
          <AnimateOnScroll variants={slideInRight}>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-coral">
              Stop Cred
            </span>
            <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-brand-cream">
              Seu crediário sem complicação
            </h2>

            <StaggerChildren className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <StaggerItem key={benefit} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-coral">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-text-secondary">{benefit}</span>
                </StaggerItem>
              ))}
            </StaggerChildren>

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
