"use client";

import { useEffect } from "react";
import type { ComponentType } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { siteSocialLinks } from "@/lib/site";

const instagramHandle =
  siteSocialLinks.find((l) => l.label === "Instagram")?.href ??
  "https://instagram.com/stopshopbrusque";

const socialIcons: Record<string, ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  YouTube: Youtube,
  TikTok: TikTokIcon,
};

export function InstagramFeed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://w.behold.so/widget.js";
    document.head.appendChild(script);
  }, []);

  return (
    <section className="bg-white py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="@stopshopbrusque"
          title="Siga a gente no Instagram"
          highlight="Instagram"
          subtitle="Novidades, lançamentos das lojas e os bastidores do Stop Shop."
          light
        />
        <div className="flex justify-center">
          <a
            href={instagramHandle}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-coral px-5 py-3 text-sm font-semibold text-white shadow-glow-coral transition-colors hover:bg-brand-coral-dark"
          >
            <Instagram className="h-4 w-4" />
            Seguir no Instagram
          </a>
        </div>

        <div className="mt-10">
          <div data-behold-id="iXripcjGA7P5mfabqccA"></div>
        </div>

        <AnimateOnScroll className="mx-auto mt-10 max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-text-primary md:text-3xl">
            Acompanhe nas redes sociais
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-base text-text-secondary">
            Fique por dentro das promoções, horários de funcionamento e novidades
            das lojas em primeira mão.
          </p>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {siteSocialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default bg-white text-brand-navy shadow-card transition-colors hover:bg-brand-navy hover:text-white"
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
