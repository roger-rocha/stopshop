"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Wifi } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { stopCredBenefits } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

const springConfig = { stiffness: 160, damping: 18, mass: 0.6 };

function StopCredCard() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Posição do ponteiro normalizada (0..1) dentro do cartão
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), springConfig);

  const glareX = useTransform(px, (v) => v * 100);
  const glareY = useTransform(py, (v) => v * 100);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 38%, transparent 62%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full max-w-[400px]">
      {/* Flutuação suave em repouso */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          ref={ref}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{
            rotateX: reduceMotion ? 0 : rotateX,
            rotateY: reduceMotion ? 0 : rotateY,
            transformStyle: "preserve-3d",
            aspectRatio: "1.586/1",
          }}
          className="relative w-full rounded-[24px] bg-[linear-gradient(135deg,#26375f_0%,#1B2A4A_48%,#101b35_100%)] p-7 text-white shadow-[0_24px_60px_-18px_rgba(11,20,43,0.55)] transition-shadow duration-500 hover:shadow-[0_34px_80px_-20px_rgba(11,20,43,0.65)] sm:p-8"
        >
          {/* Fio de luz na borda superior */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,168,83,0.7),transparent)]"
          />
          {/* Textura: anéis concêntricos discretos */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]"
          >
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/6" />
            <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border border-white/6" />
            <div className="absolute -bottom-24 -left-14 h-52 w-52 rounded-full border border-brand-gold/12" />
          </div>

          {/* Brilho especular que segue o ponteiro */}
          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              style={{ background: glare }}
              className="pointer-events-none absolute inset-0 rounded-[24px]"
            />
          )}

          <div
            className="relative flex h-full flex-col justify-between"
            style={{ transform: "translateZ(28px)" }}
          >
            {/* Topo: marca + contactless */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/55">
                  Crediário Próprio
                </p>
                <p className="mt-1.5 font-display text-[1.65rem] font-bold leading-none">
                  STOP <span className="text-brand-gold">CRED</span>
                </p>
              </div>
              <Wifi
                className="h-5 w-5 rotate-90 text-white/60"
                aria-hidden="true"
              />
            </div>

            {/* Meio: chip + número */}
            <div>
              <div className="h-9 w-12 rounded-md bg-gradient-to-br from-[#ecd29a] via-brand-gold to-[#a97f2f] p-[3px] shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]">
                <div className="grid h-full w-full grid-cols-2 gap-[2px]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-[2px] bg-[#a97f2f]/45" />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex gap-4 text-base tracking-[0.28em] text-white/75 sm:text-lg">
                <span>••••</span>
                <span>••••</span>
                <span>••••</span>
                <span>••••</span>
              </div>
            </div>

            {/* Base: titular + local */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.22em] text-white/40">
                  Titular
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-white/85">
                  Cliente Stop Shop
                </p>
              </div>
              <p className="text-[10px] text-white/45">Brusque, SC</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

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
