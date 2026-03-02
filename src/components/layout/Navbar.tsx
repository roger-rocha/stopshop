"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Search, Menu, X } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Lojas", href: "/lojas" },
  { label: "Segmentos", href: "/segmentos" },
  { label: "Atacado", href: "/atacado" },
  { label: "Eventos", href: "/eventos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(255, 255, 255, ${v * 0.95})`
          ),
          backdropFilter: useTransform(bgOpacity, (v) =>
            v > 0.1 ? "blur(12px)" : "none"
          ),
          borderBottomColor: useTransform(
            borderOpacity,
            (v) => `rgba(0, 0, 0, ${v})`
          ),
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-brand-navy">
              Stop<span className="text-brand-coral">Shop</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary transition-colors hover:text-brand-navy"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-light hover:text-brand-navy"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>
            <CTAButton
              variant="whatsapp"
              size="sm"
              href="https://wa.me/554733510000?text=Olá! Gostaria de informações sobre o Stop Shop."
              external
            >
              WhatsApp
            </CTAButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-brand-navy lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </motion.header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
