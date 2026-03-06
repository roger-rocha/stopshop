"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { siteContact } from "@/lib/site";

const heroStats = [
  { value: 160, prefix: "+", label: "marcas direto de fábrica" },
  { value: 30, prefix: "+", label: "anos de tradição" },
  { value: 310, prefix: "", label: "vagas de estacionamento" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(180deg,_#fff_0%,_#f4f7ff_100%)] pt-28 sm:pt-32">
      {/* Background image */}
      <div className="absolute inset-x-0 top-0 h-[78%]">
        <Image
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0.92)_0%,_rgba(255,255,255,0.68)_48%,_rgba(255,255,255,0.30)_100%)]" />
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
              <CTAButton variant="secondary" size="lg" href="/localizacao" className="rounded-full">
                Como chegar
              </CTAButton>
              <CTAButton variant="ghost" size="lg" href="/atacado" className="rounded-full">
                Atacado
              </CTAButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease }}
              className="mt-10 inline-flex flex-wrap items-center gap-3 rounded-[22px] border border-white/70 bg-white/75 px-5 py-4 text-left shadow-card backdrop-blur-md"
            >
              <div>
                <p className="text-sm font-semibold text-text-primary">{siteContact.hours}</p>
                <p className="text-sm text-text-secondary">
                  {siteContact.addressLine1} · {siteContact.city}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-36 left-1/2 z-10 -translate-x-1/2"
      >
        <StatusBadge isOpen={true} temperature={siteContact.temperature} />
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease }}
        className="relative z-10"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-10 sm:grid-cols-3 sm:px-8">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[28px] border border-border-default bg-white px-6 py-8 text-center shadow-card"
            >
              <div className="font-display text-[clamp(2.5rem,4vw,4rem)] font-bold text-brand-coral">
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
