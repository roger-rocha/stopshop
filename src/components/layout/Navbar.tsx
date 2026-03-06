"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { MobileNav } from "./MobileNav";
import { formatPhone } from "@/lib/utils";
import { siteContact, siteNavigation } from "@/lib/site";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0.75, 0.96]);
  const blurValue = useTransform(scrollY, [0, 100], [0, 20]);
  const navLinks = siteNavigation;

  return (
    <>
      {/* Utility bar — desktop only */}
      <div className="fixed left-0 right-0 top-0 z-[51] hidden border-b border-border-default bg-white/90 text-text-primary backdrop-blur-sm sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-1.5 sm:px-8 text-xs">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-text-secondary">
              Aberto às 09:00 horas · Brusque {siteContact.temperature}
            </span>
          </div>
          <a
            href={`tel:${siteContact.phone}`}
            className="flex items-center gap-1.5 text-text-secondary hover:text-brand-coral"
          >
            <Phone className="h-3 w-3" />
            {formatPhone(siteContact.phone)}
          </a>
        </div>
      </div>

      <motion.header
        className="fixed left-0 right-0 z-50 top-0 sm:top-[29px]"
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(255, 255, 255, ${v})`
          ),
          backdropFilter: useTransform(blurValue, (v) =>
            v > 1 ? `blur(${v}px)` : "none"
          ),
          borderBottomColor: useTransform(
            bgOpacity,
            (v) => `rgba(18, 24, 86, ${v * 0.08})`
          ),
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          {/* Mobile: hamburger left */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-white text-text-primary shadow-sm lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo — center on mobile, left on desktop */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
          >
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
                className={`text-sm font-medium transition-colors hover:text-brand-coral ${
                  pathname === link.href ? "text-brand-coral" : "text-text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile: WhatsApp icon right / Desktop: CTA */}
          <a
            href={`https://wa.me/${siteContact.whatsapp}?text=Olá! Gostaria de informações sobre o Stop Shop.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-white text-[#25D366] shadow-sm lg:hidden"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
          <div className="hidden lg:block">
            <CTAButton
              variant="whatsapp"
              size="sm"
              href={`https://wa.me/${siteContact.whatsapp}?text=Olá! Gostaria de informações sobre o Stop Shop.`}
              external
            >
              WhatsApp
            </CTAButton>
          </div>
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
