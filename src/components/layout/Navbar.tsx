"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";
import { MobileNav } from "./MobileNav";
import { siteContact, siteNavigation } from "@/lib/site";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  const useSolidStyle = !isHome || isScrolled;
  const navLinks = siteNavigation;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          useSolidStyle
            ? "border-b border-border-default bg-white/97 shadow-nav backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
          {/* Mobile: hamburger left */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden",
              useSolidStyle
                ? "text-text-primary hover:bg-surface-muted"
                : "text-white hover:bg-white/10"
            )}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            <Menu className="h-6 w-6" />
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
              width={131}
              height={110}
              className="h-auto w-[48px] drop-shadow-md transition-all duration-300 sm:w-[54px] lg:w-[60px]"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  useSolidStyle
                    ? pathname === link.href
                      ? "text-brand-coral"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                    : pathname === link.href
                      ? "text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
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
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors lg:hidden",
              useSolidStyle
                ? "text-whatsapp hover:bg-surface-muted"
                : "text-white hover:bg-white/10"
            )}
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </a>
          <div className="hidden lg:block">
            <CTAButton
              variant={useSolidStyle ? "whatsapp" : "outline-light"}
              size="sm"
              href={`https://wa.me/${siteContact.whatsapp}?text=Olá! Gostaria de informações sobre o Stop Shop.`}
              external
              className="rounded-full"
            >
              WhatsApp
            </CTAButton>
          </div>
        </nav>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
