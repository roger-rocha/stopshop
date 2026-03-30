"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { MobileNav } from "./MobileNav";
import { siteContact, siteNavigation } from "@/lib/site";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0.97, 0.99]);
  const blurValue = useTransform(scrollY, [0, 100], [12, 20]);
  const navLinks = siteNavigation;

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 z-50 top-0"
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(255, 255, 255, ${v})`
          ),
          backdropFilter: useTransform(blurValue, (v) => `blur(${v}px)`),
          borderBottomColor: useTransform(
            bgOpacity,
            (v) => `rgba(28, 25, 23, ${v * 0.08})`
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
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo — center on mobile, left on desktop */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
            aria-label="Stop Shop"
          >
            <Image
              src="/images/stopshop-logo.png"
              alt="Logo Stop Shop"
              width={136}
              height={148}
              className="h-auto w-[52px] sm:w-[58px] lg:w-[64px]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`relative text-sm font-medium transition-colors hover:text-brand-coral ${
                  pathname === link.href ? "text-brand-coral" : "text-text-secondary"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-brand-coral"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile: WhatsApp icon right / Desktop: CTA */}
          <a
            href={`https://wa.me/${siteContact.whatsapp}?text=Olá! Gostaria de informações sobre o Stop Shop.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-white text-whatsapp shadow-sm lg:hidden"
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
