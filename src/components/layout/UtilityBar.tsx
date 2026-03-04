"use client";

import { Phone } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatPhone } from "@/lib/utils";

export function UtilityBar() {
  const isOpen = isShoppingOpen();

  return (
    <div className="hidden bg-surface-card text-white sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 sm:px-6 lg:px-8">
        <StatusBadge isOpen={isOpen} temperature="24°C" />

        <div className="flex items-center gap-6 text-sm">
          <a
            href="tel:4733510000"
            className="flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            {formatPhone("4733510000")}
          </a>
          <a
            href="/cadastro"
            className="text-brand-gold transition-colors hover:text-brand-gold-light"
          >
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}

function isShoppingOpen(): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  // Mon-Fri: 9-19, Sat: 9-17, Sun: closed
  if (day === 0) return false;
  if (day === 6) return hour >= 9 && hour < 17;
  return hour >= 9 && hour < 19;
}
