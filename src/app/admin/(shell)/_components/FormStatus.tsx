import { cn } from "@/lib/utils";

interface FormStatusProps {
  state: { status: string; message?: string };
}

/** Resultado do envio (erro ou sucesso), exibido junto ao botão de salvar — onde o usuário está olhando. */
export function FormStatus({ state }: FormStatusProps) {
  if ((state.status !== "error" && state.status !== "success") || !state.message) return null;
  const isError = state.status === "error";
  return (
    <p
      role={isError ? "alert" : "status"}
      className={cn("mr-auto text-sm", isError ? "text-brand-coral" : "text-emerald-700")}
    >
      {state.message}
    </p>
  );
}
