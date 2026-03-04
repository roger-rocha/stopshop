"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const variants = {
  primary:
    "bg-brand-gold text-surface-dark hover:bg-brand-gold-light shadow-md hover:shadow-glow-gold font-semibold",
  secondary:
    "border-2 border-white/20 text-white hover:border-brand-gold hover:text-brand-gold",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#20BD5A]",
  ghost: "text-text-secondary hover:text-brand-gold",
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
    "inline-flex items-center justify-center gap-2 font-medium rounded-button transition-colors duration-200",
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
      <Link href={href} passHref legacyBehavior>
        <motion.a className={classes} {...motionProps}>
          {children}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  );
}
