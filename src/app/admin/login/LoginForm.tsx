"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/lib/server/actions/auth";

const initial: LoginState = { status: "idle" };

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <form action={formAction} className="mt-8 space-y-4">
      <input type="hidden" name="next" value={next} />

      <label className="block">
        <span className="text-sm font-medium text-text-primary">Email</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-button border border-border-default bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/30"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-text-primary">Senha</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-button border border-border-default bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/30"
        />
      </label>

      {state.status === "error" && (
        <p className="rounded-button bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-button bg-brand-navy px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
      >
        {pending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
