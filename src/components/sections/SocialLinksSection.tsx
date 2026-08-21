import { Facebook, Instagram, Youtube } from "lucide-react";
import type { ComponentType } from "react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { siteSocialLinks } from "@/lib/site";

const icons: Record<string, ComponentType<{ className?: string }>> = {
  Instagram,
  Facebook,
  YouTube: Youtube,
  TikTok: TikTokIcon,
};

export function SocialLinksSection() {
  return (
    <section className="bg-surface-light px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <AnimateOnScroll className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-[length:var(--font-size-heading)] font-bold text-text-primary">
          Acompanhe nas redes sociais
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-text-secondary">
          Fique por dentro das promoções, horários de funcionamento e novidades
          das lojas em primeira mão.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {siteSocialLinks.map((social) => {
            const Icon = icons[social.label];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-white text-brand-navy shadow-card transition-colors hover:bg-brand-navy hover:text-white"
                >
                  {Icon ? <Icon className="h-6 w-6" /> : social.label}
                </a>
              </li>
            );
          })}
        </ul>
      </AnimateOnScroll>
    </section>
  );
}
