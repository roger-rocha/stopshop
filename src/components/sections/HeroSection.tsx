"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";
import { CounterAnimation } from "@/components/motion/CounterAnimation";

const heroStats = [
  { value: 160, prefix: "+", label: "marcas" },
  { value: 30, prefix: "+", label: "anos" },
  { value: 310, prefix: "", label: "vagas" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-brand-navy">
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/stopshop-hero.png"
          alt="Fachada do Stop Shop em Brusque"
          fill
          className="object-cover object-[center_65%]"
          priority
        />
        {/* Left-heavy wash for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,12,40,0.92)] via-[rgba(8,12,40,0.55)] to-[rgba(8,12,40,0.15)]" />
        {/* Vertical depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,12,40,0.45)] via-transparent to-[rgba(8,12,40,0.75)]" />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,12,40,0.55)_100%)]" />
      </div>

      {/* Main content */}
      <div className="relative flex flex-1 items-center px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-10 bg-white/50" aria-hidden="true" />
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/75 sm:text-sm">
                O Ninho da Moda · Brusque, SC
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease }}
              className="mt-6 font-display text-[length:var(--font-size-hero)] font-bold leading-[1.05] text-white"
            >
              Moda direto de fábrica com os{" "}
              <em className="not-italic text-brand-coral-light">
                melhores preços
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Mais de 160 marcas em um só lugar, com experiência pensada para
              varejo, atacado e compras com variedade.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease }}
              className="mt-10"
            >
              <CTAButton href="/lojas" size="lg" className="rounded-full">
                Conheça as Lojas
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats strip — fixed to hero bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease }}
        className="relative border-t border-white/10 bg-brand-navy/50 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center px-5 py-5 sm:px-8 sm:py-6">
          <div className="grid w-full grid-cols-3 items-center gap-4 sm:flex sm:w-auto sm:items-center sm:gap-0 sm:divide-x sm:divide-white/15">
            {heroStats.map((stat, i) => (
              <div
                key={stat.label}
                className={
                  i > 0
                    ? "flex flex-col items-center text-center sm:items-start sm:px-8 sm:text-left"
                    : "flex flex-col items-center text-center sm:items-start sm:pr-8 sm:text-left"
                }
              >
                <div className="font-display text-2xl font-bold leading-none text-white sm:text-3xl">
                  {stat.prefix}
                  <CounterAnimation target={stat.value} />
                </div>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
