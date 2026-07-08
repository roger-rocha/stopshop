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

const springConfig = { stiffness: 160, damping: 18, mass: 0.6 };

/** Cartão Stop Cred 3D interativo (tilt + brilho especular + flutuação). */
export function StopCredCard() {
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
