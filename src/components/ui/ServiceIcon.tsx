import { createElement } from "react";
import { serviceIcon } from "@/lib/data/service-icons";

/**
 * Resolve a chave do ícone salva no admin para o componente do catálogo.
 * Usa createElement em vez de `const Icon = ...; <Icon />` porque o lint trata
 * a variável em maiúscula como componente criado durante o render.
 */
export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return createElement(serviceIcon(name), { className });
}
