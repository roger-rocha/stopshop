"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CounterAnimation } from "@/components/motion/CounterAnimation";

const heroStats = [
  { value: 160, prefix: "+", label: "marcas direto de fábrica" },
  { value: 30, prefix: "+", label: "anos de tradição" },
  { value: 310, prefix: "", label: "vagas de estacionamento" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-32 sm:px-8">
          <div className="max-w-3xl text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary"
            >
              O Ninho da Moda · Brusque, SC
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="mt-6 font-display text-[length:var(--font-size-hero)] font-bold leading-[1.1] text-brand-cream"
            >
              Moda direto de fábrica com os melhores preços
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary mx-auto lg:mx-0"
            >
              Mais de 160 marcas em um só lugar. Atacado e varejo no coração de Santa Catarina.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease }}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <CTAButton href="/lojas" size="lg" className="rounded-full">
                Conheça as Lojas
              </CTAButton>
              <CTAButton variant="secondary" size="lg" href="/atacado" className="rounded-full">
                Atacado
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2"
      >
        <StatusBadge isOpen={true} temperature="27°C" />
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease }}
        className="relative z-10 bg-surface-card"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 divide-border-subtle px-5 sm:px-8">
          {heroStats.map((stat) => (
            <div key={stat.label} className="py-8 text-center">
              <div className="font-display text-[clamp(2.5rem,4vw,4rem)] font-bold text-brand-coral-light">
                {stat.prefix}
                <CounterAnimation target={stat.value} />
              </div>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
