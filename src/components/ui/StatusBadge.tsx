"use client";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  isOpen: boolean;
  temperature?: string;
  className?: string;
}

export function StatusBadge({ isOpen, temperature, className }: StatusBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border border-border-default bg-white/90 px-3 py-1.5 text-sm font-medium shadow-card backdrop-blur-md",
        className
      )}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
            isOpen ? "bg-success" : "bg-error"
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            isOpen ? "bg-success" : "bg-error"
          )}
        />
      </span>
      <span className={isOpen ? "text-success" : "text-error"}>
        {isOpen ? "Aberto" : "Fechado"}
      </span>
      {temperature && (
        <>
          <span className="text-text-muted">·</span>
          <span className="text-text-primary">{temperature}</span>
        </>
      )}
    </div>
  );
}
