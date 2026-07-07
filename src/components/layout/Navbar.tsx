"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { siteNavigation } from "@/lib/site";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  const useSolidStyle = !isHome || isScrolled;
  const navLinks = siteNavigation;

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const term = search.trim();
    router.push(term ? `/lojas?q=${encodeURIComponent(term)}` : "/lojas");
  };

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          useSolidStyle
            ? "border-b border-border-default bg-white/95 shadow-nav backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* Scrim behind header when transparent, improves legibility over hero */}
        {!useSolidStyle && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[180%] bg-gradient-to-b from-brand-navy/55 via-brand-navy/25 to-transparent"
          />
        )}

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
          {/* Logo */}
          <Link href="/" aria-label="Stop Shop" className="inline-flex items-center">
            <Image
              src="/logo.png"
              alt="Stop Shop — Ninho da Moda"
              width={131}
              height={150}
              priority
              className="h-12 w-auto"
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
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  useSolidStyle
                    ? pathname === link.href
                      ? "text-brand-coral"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                    : pathname === link.href
                      ? "text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search — desktop */}
          <form
            onSubmit={handleSearch}
            role="search"
            className={cn(
              "hidden items-center gap-2 rounded-pill border px-4 py-2 transition-colors lg:flex",
              useSolidStyle
                ? "border-border-default bg-surface-soft focus-within:border-brand-coral"
                : "border-white/25 bg-white/10 backdrop-blur-sm focus-within:border-white/60"
            )}
          >
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Qual loja você procura?"
              aria-label="Qual loja você procura?"
              className={cn(
                "w-44 bg-transparent text-sm outline-none xl:w-52",
                useSolidStyle
                  ? "text-text-primary placeholder:text-text-muted"
                  : "text-white placeholder:text-white/70"
              )}
            />
            <button
              type="submit"
              aria-label="Buscar lojas"
              className={cn(
                "shrink-0 transition-colors",
                useSolidStyle
                  ? "text-text-muted hover:text-brand-coral"
                  : "text-white/80 hover:text-white"
              )}
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Menu trigger — right side */}
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
