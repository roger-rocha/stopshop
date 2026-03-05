"use client";

import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  highlight?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  highlight,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!highlight) return title;
    const idx = title.indexOf(highlight);
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <span className={light ? "text-brand-coral" : "text-brand-coral-light"}>{highlight}</span>
        {title.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <AnimateOnScroll
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <p className={cn(
          "mb-3 text-sm font-semibold uppercase tracking-[0.15em]",
          light ? "text-brand-coral" : "text-brand-coral-light"
        )}>
          {label}
        </p>
      )}
      <h2
        className={cn(
          "font-display text-[length:var(--font-size-heading)] font-bold",
          light ? "text-text-inverse" : "text-brand-cream"
        )}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-lg max-w-2xl",
            align === "center" && "mx-auto",
            light ? "text-text-muted" : "text-text-secondary"
          )}
        >
          {subtitle}
        </p>
      )}
    </AnimateOnScroll>
  );
}
