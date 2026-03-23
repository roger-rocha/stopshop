"use client";

import type { ReactNode } from "react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";

interface HeroAction {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "secondary" | "whatsapp" | "ghost";
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: HeroAction[];
  stats?: { label: string; value: string }[];
  children?: ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  stats = [],
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border-default bg-[radial-gradient(circle_at_top_left,_var(--color-brand-coral)/0.10,_transparent_35%),var(--gradient-surface-fade)] pt-36 pb-16 sm:pt-40 sm:pb-20",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-brand-navy)/0.18,transparent)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <AnimateOnScroll className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-coral">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,5vw,4.5rem)] font-bold leading-[1.05] text-text-primary">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-secondary">
            {description}
          </p>

          {actions.length > 0 && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <CTAButton
                  key={action.href}
                  href={action.href}
                  external={action.external}
                  variant={action.variant ?? "primary"}
                  size="md"
                  className="rounded-full"
                >
                  {action.label}
                </CTAButton>
              ))}
            </div>
          )}
        </AnimateOnScroll>

        {(stats.length > 0 || children) && (
          <AnimateOnScroll className="rounded-[28px] border border-border-default bg-white p-6 shadow-card sm:p-8">
            {children}
            {stats.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border-default bg-surface-soft px-5 py-4"
                  >
                    <p className="text-2xl font-semibold text-text-primary">{stat.value}</p>
                    <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
