"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CTAButton } from "@/components/ui/CTAButton";
import { siteContact } from "@/lib/site";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: readonly { label: string; href: string }[];
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const navRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = navRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      const firstLink = navRef.current?.querySelector<HTMLElement>("a[href]");
      firstLink?.focus();
    }, 350);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={navRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-40 border-l border-border-default bg-[image:var(--gradient-surface-fade)] lg:hidden"
        >
          <nav className="flex h-full flex-col items-center justify-center gap-6 px-6" aria-label="Menu principal">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="font-display text-3xl font-bold text-brand-navy transition-colors hover:text-brand-coral"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-8"
            >
              <CTAButton
                variant="whatsapp"
                size="lg"
                href={`https://wa.me/${siteContact.whatsapp}?text=Olá! Gostaria de informações sobre o Stop Shop.`}
                external
              >
                Fale pelo WhatsApp
              </CTAButton>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
