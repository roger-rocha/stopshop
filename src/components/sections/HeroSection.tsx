"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { ArrowRight } from "lucide-react";

const heroStats = [
  { value: 160, prefix: "+", label: "marcas" },
  { value: 30, prefix: "+", label: "anos" },
  { value: 310, prefix: "", label: "vagas" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy sm:min-h-[92svh] sm:flex sm:flex-col">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/stopshop-hero.png"
          alt="Fachada do Stop Shop em Brusque"
          fill
          className="object-cover object-[center_65%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,12,40,0.88)] via-[rgba(8,12,40,0.65)] to-[rgba(8,12,40,0.88)] sm:from-[rgba(8,12,40,0.85)] sm:via-[rgba(8,12,40,0.45)] sm:to-[rgba(8,12,40,0.80)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,12,40,0.50)] via-[rgba(8,12,40,0.20)] to-transparent" />
      </div>

      {/* Content — flows naturally on mobile, flex-1 on desktop */}
      <div className="relative z-10 px-5 pb-8 pt-24 sm:flex sm:flex-1 sm:items-center sm:px-8 sm:pt-36">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60 sm:text-sm">
                O Ninho da Moda · Brusque, SC
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="mt-4 font-display text-[length:var(--font-size-hero)] font-bold leading-[1.05] text-white sm:mt-6"
            >
              Moda direto de fábrica{" "}
              <br className="hidden sm:block" />
              com os <em className="not-italic text-brand-coral-light">melhores preços</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              className="mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg sm:text-white/80"
            >
              Mais de 160 marcas em um só lugar, com experiência pensada para varejo, atacado e compras com variedade.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease }}
              className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
            >
              <CTAButton href="/lojas" size="lg" className="rounded-full">
                Conheça as Lojas
              </CTAButton>
              <div className="flex gap-3">
                <CTAButton variant="outline-light" size="md" href="/localizacao" className="flex-1 rounded-full sm:flex-initial">
                  Como chegar
                  <ArrowRight className="ml-1 h-4 w-4" />
                </CTAButton>
                <CTAButton variant="outline-light" size="md" href="/atacado" className="flex-1 rounded-full sm:flex-initial">
                  Atacado
                  <ArrowRight className="ml-1 h-4 w-4" />
                </CTAButton>
              </div>
            </motion.div>

            {/* Stats — directly below CTAs on mobile, bottom-pinned on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease }}
              className="mt-8 sm:mt-12"
            >
              <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-lg sm:inline-flex sm:w-auto sm:justify-start sm:gap-12 sm:px-8 sm:py-6">
                {heroStats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-3 sm:gap-4">
                    {i > 0 && (
                      <div className="h-8 w-px bg-white/20 sm:h-10" aria-hidden="true" />
                    )}
                    <div className="text-center sm:text-left">
                      <div className="font-display text-xl font-bold text-white sm:text-3xl">
                        {stat.prefix}
                        <CounterAnimation target={stat.value} />
                      </div>
                      <p className="mt-0.5 text-xs text-white/50 sm:text-sm">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
