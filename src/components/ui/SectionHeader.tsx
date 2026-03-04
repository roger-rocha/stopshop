"use client";

import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  highlight,
  align = "center",
  light = false,
  className,
}: SectionHeaderProps) {
  const renderTitle = () => {
    if (!highlight) {
      return title;
    }
    const parts = title.split(highlight);
    if (parts.length < 2) return title;
    return (
      <>
        {parts[0]}
        <span className="text-brand-gold">{highlight}</span>
        {parts[1]}
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
      <h2
        className={cn(
          "font-display text-[length:var(--font-size-heading)] font-bold",
          light ? "text-text-inverse" : "text-text-primary"
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
