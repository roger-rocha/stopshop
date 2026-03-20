"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { ArrowRight } from "lucide-react";
import { siteContact } from "@/lib/site";

const heroStats = [
  { value: 160, prefix: "+", label: "marcas" },
  { value: 30, prefix: "+", label: "anos" },
  { value: 310, prefix: "", label: "vagas" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#f4f7ff_100%)] pt-28 sm:pt-32">
      {/* Background image */}
      <div className="absolute inset-x-0 top-0 h-[78%]">
        <Image
          src="/images/stopshop-hero.png"
          alt="Fachada do Stop Shop em Brusque"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0.72)_0%,_rgba(255,255,255,0.45)_48%,_rgba(255,255,255,0.10)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,_transparent_0%,_#f4f7ff_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-32 sm:px-8">
          <div className="max-w-3xl text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease }}
              className="text-sm font-medium uppercase tracking-[0.2em] text-brand-coral"
            >
              O Ninho da Moda · Brusque, SC
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="mt-6 font-display text-[length:var(--font-size-hero)] font-bold leading-[1.05] text-text-primary"
            >
              Moda direto de fábrica com os melhores preços
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary lg:mx-0"
            >
              Mais de 160 marcas em um só lugar, com experiência de compra pensada para varejo, atacado, excursões e clientes que buscam moda com variedade e conveniência.
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
              <CTAButton variant="ghost" size="md" href="/localizacao" className="rounded-full">
                Como chegar
                <ArrowRight className="ml-1 h-4 w-4" />
              </CTAButton>
              <CTAButton variant="ghost" size="md" href="/atacado" className="rounded-full">
                Atacado
                <ArrowRight className="ml-1 h-4 w-4" />
              </CTAButton>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease }}
              className="mt-10 text-sm text-text-secondary"
            >
              {siteContact.hours} · {siteContact.addressLine1} · {siteContact.city}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease }}
        className="relative z-10"
      >
        <div className="mx-auto max-w-7xl border-t border-border-default px-5 pb-10 pt-8 sm:px-8">
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-brand-coral sm:text-3xl">
                  {stat.prefix}
                  <CounterAnimation target={stat.value} />
                </div>
                <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
