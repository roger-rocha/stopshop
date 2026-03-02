"use client";

import { motion, type Variants, type Transition } from "motion/react";
import { staggerContainer, fadeUp, easeOut } from "@/lib/animations";
import type { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  once?: boolean;
  amount?: number;
}

export function StaggerChildren({
  children,
  variants = staggerContainer,
  className,
  once = true,
  amount = 0.2,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  variants?: Variants;
  transition?: Transition;
  className?: string;
}

export function StaggerItem({
  children,
  variants = fadeUp,
  transition = easeOut,
  className,
}: StaggerItemProps) {
  return (
    <motion.div variants={variants} transition={transition} className={className}>
      {children}
    </motion.div>
  );
}
