"use client";

import { motion, type Variants, type Transition } from "motion/react";
import { easeOut, fadeUp } from "@/lib/animations";
import type { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  variants?: Variants;
  transition?: Transition;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function AnimateOnScroll({
  children,
  variants = fadeUp,
  transition = easeOut,
  className,
  once = true,
  amount = 0.3,
}: AnimateOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
