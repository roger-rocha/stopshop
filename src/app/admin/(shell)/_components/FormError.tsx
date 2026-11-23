interface FormErrorProps {
  state: { status: string; message?: string };
}

/** Mensagem de erro exibida junto ao botão de salvar, onde o usuário está olhando. */
export function FormError({ state }: FormErrorProps) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <p role="alert" className="mr-auto text-sm text-brand-coral">
      {state.message}
    </p>
  );
}
