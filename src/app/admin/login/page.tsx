import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Entrar" };

interface PageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-[24px] border border-border-default bg-white p-8 shadow-card sm:p-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-coral">
            Stop Shop
          </p>
          <h1 className="mt-3 font-display text-2xl font-bold text-text-primary">
            Painel administrativo
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Entre com suas credenciais para gerenciar o site.
          </p>
        </div>
        <LoginForm next={next ?? "/admin"} />
      </div>
    </div>
  );
}
