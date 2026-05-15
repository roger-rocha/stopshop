"use client";

import { useEffect } from "react";
import { Instagram } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteSocialLinks } from "@/lib/site";

const instagramHandle =
  siteSocialLinks.find((l) => l.label === "Instagram")?.href ??
  "https://instagram.com/stopshopbrusque";

export function InstagramFeed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://w.behold.so/widget.js";
    document.head.appendChild(script);
  }, []);

  return (
    <section className="bg-white py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="@stopshopbrusque"
            title="Siga a gente no Instagram"
            highlight="Instagram"
            subtitle="Novidades, lançamentos das lojas e os bastidores do Stop Shop."
            align="left"
            light
            className="mb-0"
          />
          <a
            href={instagramHandle}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-coral px-5 py-3 text-sm font-semibold text-white shadow-glow-coral transition-colors hover:bg-brand-coral-dark"
          >
            <Instagram className="h-4 w-4" />
            Seguir no Instagram
          </a>
        </div>

        <div className="mt-10">
          <div data-behold-id="iXripcjGA7P5mfabqccA"></div>
        </div>
      </div>
    </section>
  );
}
