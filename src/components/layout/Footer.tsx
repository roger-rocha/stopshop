"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { formatPhone } from "@/lib/utils";
import { siteNavigation, siteSocialLinks } from "@/lib/site";
import type { ContactSettings } from "@/lib/validators";

interface FooterProps {
  contact: ContactSettings;
}

const quickLinks = siteNavigation;
const socialLinks = [
  { icon: Instagram, href: siteSocialLinks[0].href, label: "Instagram" },
  { icon: Facebook, href: siteSocialLinks[1].href, label: "Facebook" },
  { icon: Linkedin, href: siteSocialLinks[2].href, label: "LinkedIn" },
];

export function Footer({ contact }: FooterProps) {
  return (
    <AnimateOnScroll>
      <footer className="border-t border-border-default bg-[linear-gradient(180deg,_var(--color-surface-elevated)_0%,_#ffffff_100%)] text-text-primary">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block">
                <span className="font-display text-2xl font-bold text-brand-navy">
                  Stop<span className="text-brand-coral">Shop</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Mais de 160 marcas de moda em um só lugar. Atacado e varejo com os melhores preços de Brusque, SC.
              </p>
              <div className="mt-4 flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-white text-text-secondary transition-colors hover:bg-surface-muted hover:text-text-primary"
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
                      className="text-sm text-text-secondary transition-colors hover:text-brand-coral"
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
                {contact.phone && (
                  <li>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-coral"
                    >
                      <Phone className="h-4 w-4" />
                      {formatPhone(contact.phone)}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand-coral"
                    >
                      <Mail className="h-4 w-4" />
                      {contact.email}
                    </a>
                  </li>
                )}
                <li className="flex items-start gap-2 text-sm text-text-secondary">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {contact.addressLine1}
                    <br />
                    {contact.city}, {contact.state} — {contact.zip}
                  </span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-12 border-t border-border-default pt-8 text-center text-sm text-text-muted">
            © {new Date().getFullYear()} Stop Shop — Brusque, Santa Catarina
          </div>
        </div>
      </footer>
    </AnimateOnScroll>
  );
}
