"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SegmentPillProps {
  name: string;
  color: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SegmentPill({
  name,
  color,
  active = false,
  onClick,
  className,
}: SegmentPillProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative rounded-pill border px-4 py-2 text-sm font-medium transition-colors duration-200",
        active
          ? "text-white"
          : "border-border-default bg-white text-text-secondary hover:border-brand-coral/25 hover:text-text-primary",
        className
      )}
    >
      {active && (
        <motion.div
          layoutId="segment-pill-bg"
          className="absolute inset-0 rounded-pill"
          style={{ backgroundColor: color }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className="relative z-10">{name}</span>
    </motion.button>
  );
}
