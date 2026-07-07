"use client";

import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";
import type { HeroSettings } from "@/lib/validators";

const ease = [0.22, 1, 0.36, 1] as const;
const SLIDE_INTERVAL = 6000;

interface HeroSectionProps {
  hero: HeroSettings;
}

function HeroBackground({ slides }: { slides: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_INTERVAL
    );
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[Math.min(index, slides.length - 1)];

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ opacity: { duration: 1.2, ease }, scale: { duration: 6, ease: "linear" } }}
        className="absolute inset-0"
      >
        <Image
          src={current}
          alt="Banner do Stop Shop em Brusque"
          fill
          className="object-cover object-[center_65%]"
          priority={index === 0}
          sizes="100vw"
        />
      </motion.div>
    </AnimatePresence>
  );
}

function renderTitle(title: string, highlight: string) {
  if (!highlight || !title.includes(highlight)) {
    return title;
  }
  const parts = title.split(highlight);
  return parts.map((part, index) => (
    <Fragment key={index}>
      {part}
      {index < parts.length - 1 && (
        <em className="not-italic text-brand-coral-light">{highlight}</em>
      )}
    </Fragment>
  ));
}

export function HeroSection({ hero }: HeroSectionProps) {
  const slides = hero.slides.length > 0 ? hero.slides : hero.image ? [hero.image] : [];
  const hasSlides = slides.length > 0;

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden bg-brand-navy">
      {/* Background: carrossel de imagens do admin substitui o vídeo padrão */}
      <div className="absolute inset-0 -z-10">
        {hasSlides ? (
          <HeroBackground slides={slides} />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover object-[center_65%]"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/stopshop-hero.png"
          >
            <source src="/videos/stopshop-hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,12,40,0.92)] via-[rgba(8,12,40,0.55)] to-[rgba(8,12,40,0.15)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(8,12,40,0.45)] via-transparent to-[rgba(8,12,40,0.75)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,12,40,0.55)_100%)]" />
      </div>

      <div className="relative flex flex-1 items-center px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            {hero.eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease }}
                className="flex items-center gap-3"
              >
                <span className="h-px w-10 bg-white/50" aria-hidden="true" />
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/75 sm:text-sm">
                  {hero.eyebrow}
                </p>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease }}
              className="mt-6 font-display text-[length:var(--font-size-hero)] font-bold leading-[1.05] text-white"
            >
              {renderTitle(hero.title, hero.titleHighlight)}
            </motion.h1>

            {hero.ctaLabel && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease }}
                className="mt-10"
              >
                <CTAButton
                  href={hero.ctaHref || "/lojas"}
                  size="lg"
                  className="rounded-full"
                >
                  {hero.ctaLabel}
                </CTAButton>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
