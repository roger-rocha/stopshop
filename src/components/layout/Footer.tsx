"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { formatPhone } from "@/lib/utils";

const quickLinks = [
  { label: "Lojas", href: "/lojas" },
  { label: "Segmentos", href: "/segmentos" },
  { label: "Atacado", href: "/atacado" },
  { label: "Eventos", href: "/eventos" },
  { label: "Blog", href: "/blog" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
];

export function Footer() {
  return (
    <footer className="bg-[#060A14] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold">
                Stop<span className="text-brand-gold">Shop</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Mais de 160 marcas de moda em um só lugar. Atacado e varejo com os melhores preços de Brusque, SC.
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Rod. Antônio Heil, 301<br />
                Brusque, SC — 88353-100
              </span>
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
                    className="text-sm text-white/70 transition-colors hover:text-brand-gold"
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
                  href="tel:4733510000"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {formatPhone("4733510000")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@stopshop.com.br"
                  className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  contato@stopshop.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h3 className="font-display text-lg font-bold">Redes Sociais</h3>
            <div className="mt-4 flex gap-3">
              <a
                href="https://instagram.com/stopshop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-gold hover:text-surface-dark"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/stopshop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-gold hover:text-surface-dark"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            <h3 className="mt-8 font-display text-lg font-bold">Newsletter</h3>
            <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 rounded-button border border-border-subtle bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
              />
              <button
                type="submit"
                className="rounded-button bg-brand-gold px-4 py-2.5 text-sm font-medium text-surface-dark transition-colors hover:bg-brand-gold-light"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Stop Shop. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
