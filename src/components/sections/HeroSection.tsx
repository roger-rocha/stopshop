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
    <section className="relative flex min-h-[92svh] flex-col overflow-hidden bg-brand-navy">
      {/* Background image — shifted down to show building, not sky */}
      <div className="absolute inset-0">
        <Image
          src="/images/stopshop-hero.png"
          alt="Fachada do Stop Shop em Brusque"
          fill
          className="object-cover object-[center_65%]"
          priority
        />
        {/* Rich overlay — darker at top and bottom, lighter in the middle to let building show */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,12,40,0.85)] via-[rgba(8,12,40,0.45)] to-[rgba(8,12,40,0.80)]" />
        {/* Left-side overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,12,40,0.50)] via-[rgba(8,12,40,0.20)] to-transparent" />
      </div>

      {/* Content — top-aligned, not vertically centered */}
      <div className="relative z-10 pt-32 sm:pt-36">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-white/40" aria-hidden="true" />
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                O Ninho da Moda · Brusque, SC
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="mt-6 font-display text-[length:var(--font-size-hero)] font-bold leading-[1.05] text-white"
            >
              Moda direto de fábrica{" "}
              <br className="hidden sm:block" />
              com os <em className="not-italic text-brand-coral-light">melhores preços</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
            >
              Mais de 160 marcas em um só lugar, com experiência de compra pensada para varejo, atacado e clientes que buscam moda com variedade.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <CTAButton href="/lojas" size="lg" className="rounded-full">
                Conheça as Lojas
              </CTAButton>
              <CTAButton variant="outline-light" size="md" href="/localizacao" className="rounded-full">
                Como chegar
                <ArrowRight className="ml-1 h-4 w-4" />
              </CTAButton>
              <CTAButton variant="outline-light" size="md" href="/atacado" className="rounded-full">
                Atacado
                <ArrowRight className="ml-1 h-4 w-4" />
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats bar — pinned to bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease }}
        className="relative z-10 mt-auto"
      >
        <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
          <div className="inline-flex flex-col gap-6 rounded-2xl border border-white/15 bg-white/10 px-8 py-6 backdrop-blur-lg sm:flex-row sm:gap-12">
            {heroStats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 && (
                  <div className="hidden h-10 w-px bg-white/20 sm:block" aria-hidden="true" />
                )}
                <div>
                  <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {stat.prefix}
                    <CounterAnimation target={stat.value} />
                  </div>
                  <p className="mt-0.5 text-sm text-white/50">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
