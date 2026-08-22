"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDown, Check } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { cn } from "@/lib/utils";
import { keyFigures } from "@/lib/data/open-store";

const ease = [0.16, 1, 0.3, 1] as const;

const highlights = [
  "Destino consolidado de atacado e varejo",
  "Retorno comercial em até 2 dias úteis",
];

export function OpenStoreHero() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white">
      {/* Foto do shopping com véu azul-marinho */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/stopshop-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,24,86,0.96)_0%,rgba(18,24,86,0.88)_50%,rgba(18,24,86,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(41,71,240,0.45),transparent_55%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 pt-36 pb-20 sm:px-8 sm:pt-44 sm:pb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
            Abra uma loja
          </p>

          <h1 className="mt-7 font-display text-[clamp(2.6rem,5.4vw,4.75rem)] font-bold leading-[1.02] tracking-[-0.01em] text-balance">
            Sua marca no ninho da moda de{" "}
            <span className="text-brand-gold">Brusque</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/78">
            Há 30 anos o Stop Shop reúne mais de 160 marcas e recebe diariamente
            compradores de todo o Brasil. Lojas, quiosques e espaços de mídia
            para quem quer crescer com a força de um shopping consolidado.
          </p>

          <ul className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/85">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#formulario" size="md" className="rounded-full px-7">
              Quero abrir uma loja
              <ArrowDown className="h-4 w-4" />
            </CTAButton>
            <CTAButton
              href="#formatos"
              variant="outline-light"
              size="md"
              className="rounded-full px-7"
            >
              Ver formatos disponíveis
            </CTAButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="lg:justify-self-end"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {keyFigures.map((figure, index) => (
              <div
                key={figure.label}
                className={cn(
                  "rounded-[24px] border p-5 sm:p-6",
                  index === 0
                    ? "col-span-2 border-white bg-white text-brand-navy shadow-card"
                    : "border-white/12 bg-white/8 text-white backdrop-blur-md",
                  index === keyFigures.length - 1 && "col-span-2"
                )}
              >
                <figure.icon
                  className={cn("h-5 w-5", index === 0 ? "text-brand-coral" : "text-brand-gold")}
                />
                <p
                  className={cn(
                    "mt-4 font-display font-bold leading-none tabular-nums",
                    index === 0 ? "text-6xl sm:text-7xl" : "text-4xl sm:text-5xl"
                  )}
                >
                  <CounterAnimation
                    target={figure.value}
                    suffix={figure.suffix}
                    prefix={figure.prefix}
                    duration={1.6}
                  />
                </p>
                <p
                  className={cn("mt-2 text-sm", index === 0 ? "text-text-secondary" : "text-white/70")}
                >
                  {figure.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
