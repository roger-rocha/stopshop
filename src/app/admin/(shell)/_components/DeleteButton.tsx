"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  action: () => Promise<void>;
  confirmMessage: string;
  label?: string;
}

export function DeleteButton({
  action,
  confirmMessage,
  label = "Excluir",
}: DeleteButtonProps) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm(confirmMessage)) {
          start(() => action());
        }
      }}
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-button border border-brand-coral/40 px-3 py-2 text-sm font-medium text-brand-coral transition-colors hover:bg-brand-coral hover:text-white disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" />
      {pending ? "Excluindo…" : label}
    </button>
  );
}
