"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CounterAnimation } from "@/components/motion/CounterAnimation";

const heroStats = [
  { value: 160, suffix: "+", label: "Marcas" },
  { value: 80, suffix: "+", label: "Atacadistas" },
  { value: 13, suffix: "", label: "Segmentos" },
  { value: 500, suffix: "+", label: "Vagas" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/70 via-surface-dark/50 to-surface-dark" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <StatusBadge isOpen={true} temperature="24°C" />
        </motion.div>

        {/* Headline */}
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[length:var(--font-size-hero)] font-bold leading-[1.1] text-white"
          >
            Mais de 160 marcas{" "}
            <span className="text-brand-gold">em um só lugar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            O maior shopping de moda de Brusque, SC. Atacado e varejo com preços que você não encontra em nenhum outro lugar.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <CTAButton href="/lojas" size="lg">
              Explorar Lojas
            </CTAButton>
            <CTAButton
              variant="secondary"
              size="lg"
              href="/atacado"
            >
              Comprar no Atacado
            </CTAButton>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 border-t border-border-subtle bg-surface-dark/80 backdrop-blur-md"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-brand-gold sm:text-3xl">
                <CounterAnimation target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
