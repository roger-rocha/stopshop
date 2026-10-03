import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Em construção | Stop Shop" },
  description:
    "Estamos preparando uma nova experiência para você. Voltaremos em breve.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main className="flex min-h-dvh flex-col bg-brand-cream text-brand-navy">
      <div aria-hidden="true" className="h-2 shrink-0 bg-brand-navy" />

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-10 sm:py-24">
        <Image
          src="/logos/logo-new.png"
          alt="Stop Shop"
          width={131}
          height={150}
          priority
          className="h-24 w-auto sm:h-28"
        />

        <div className="mt-10 max-w-2xl sm:mt-12">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-brand-navy/65 sm:text-sm">
            Uma nova experiência está chegando
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.15] sm:text-5xl md:text-6xl">
            Nosso site está em construção.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-brand-navy/75 sm:text-lg">
            Estamos preparando uma nova experiência para você. Voltaremos em
            breve.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="mt-10 h-px w-12 bg-brand-gold sm:mt-12"
        />
      </div>

      <footer className="px-6 pb-8 text-center">
        <Link
          href="/admin/login"
          prefetch={false}
          className="rounded-sm text-xs text-brand-navy/60 underline-offset-4 transition-colors hover:text-brand-navy hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
        >
          Acesso administrativo
        </Link>
      </footer>
    </main>
  );
}
