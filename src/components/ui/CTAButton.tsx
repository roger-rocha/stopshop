"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

const variants = {
  primary:
    "bg-brand-coral text-white hover:bg-brand-coral-dark shadow-glow-coral font-semibold",
  secondary:
    "border border-border-subtle bg-white text-text-primary hover:border-brand-coral hover:text-brand-coral hover:shadow-card",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#20BD5A]",
  ghost: "bg-transparent text-text-secondary hover:text-brand-coral",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface CTAButtonProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export function CTAButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className,
  external,
}: CTAButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-button font-medium transition-all duration-200",
    variants[variant],
    sizes[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <MotionLink href={href} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  );
}
