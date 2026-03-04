"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { formatPhone } from "@/lib/utils";

const quickLinks = [
  { label: "Lojas", href: "/lojas" },
  { label: "Atacado", href: "/atacado" },
  { label: "Stop Cred", href: "/stop-cred" },
  { label: "Sobre", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/stopshop", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/stopshop", label: "Facebook" },
  { icon: Linkedin, href: "https://linkedin.com/company/stopshop", label: "LinkedIn" },
];

export function Footer() {
  return (
    <AnimateOnScroll>
      <footer className="bg-[#0A0B10] text-brand-cream">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block">
                <span className="font-display text-2xl font-bold">
                  Stop<span className="text-brand-coral">Shop</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-brand-cream/60">
                Mais de 160 marcas de moda em um só lugar. Atacado e varejo com os melhores preços de Brusque, SC.
              </p>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-brand-cream/60 transition-colors hover:bg-brand-coral hover:text-white"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display text-lg font-bold">Links Rápidos</h3>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-cream/60 transition-colors hover:text-brand-coral"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-display text-lg font-bold">Contato</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="tel:4732557000"
                    className="flex items-center gap-2 text-sm text-brand-cream/60 transition-colors hover:text-brand-cream"
                  >
                    <Phone className="h-4 w-4" />
                    {formatPhone("4732557000")}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:comercial@stopshop.com.br"
                    className="flex items-center gap-2 text-sm text-brand-cream/60 transition-colors hover:text-brand-cream"
                  >
                    <Mail className="h-4 w-4" />
                    comercial@stopshop.com.br
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-brand-cream/60">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Rod. Antônio Heil, 635<br />
                    Brusque, SC — 88353-100
                  </span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-display text-lg font-bold">Receba Novidades</h3>
              <p className="mt-2 text-sm text-brand-cream/60">
                Cadastre-se para receber promoções e novidades.
              </p>
              <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 rounded-button border border-border-subtle bg-white/5 px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-cream/40 outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
                />
                <button
                  type="submit"
                  className="rounded-button bg-brand-coral px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-coral-dark"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-brand-cream/40">
            © {new Date().getFullYear()} Stop Shop — Brusque, Santa Catarina
          </div>
        </div>
      </footer>
    </AnimateOnScroll>
  );
}
