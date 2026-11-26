import { z } from "zod";

/** Destino padrão das mensagens do formulário de contato (pode ser trocado via CONTACT_FORM_TO). */
export const DEFAULT_CONTACT_FORM_RECIPIENT = "mktstopshop@gmail.com";

export const contactDepartments = {
  marketing: "Marketing",
  atendimento: "Atendimento",
} as const;

export type ContactDepartment = keyof typeof contactDepartments;

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

const optionalText = (max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : ""),
    z.string().max(max, "Revise os campos do formulário.")
  );

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome.").max(120, "Use no máximo 120 caracteres no nome."),
  email: z.string().trim().email("Informe um e-mail válido.").max(200, "Informe um e-mail válido."),
  phone: optionalText(40),
  department: z.preprocess(
    (value) => (value === "" || value == null ? undefined : value),
    z.enum(["marketing", "atendimento"]).optional()
  ),
  message: z
    .string()
    .trim()
    .min(1, "Escreva sua mensagem.")
    .max(5000, "Use no máximo 5.000 caracteres na mensagem."),
  terms: z.literal("on", { error: "Aceite os termos e a política de privacidade." }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function parseContactForm(
  input: Record<string, unknown>
): { success: true; data: ContactFormData } | { success: false; message: string } {
  const parsed = contactFormSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Revise os campos do formulário." };
  }
  return { success: true, data: parsed.data };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Remove quebras de linha para o texto poder ir com segurança no assunto do e-mail. */
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function buildContactEmail(data: ContactFormData) {
  const department = data.department ? contactDepartments[data.department] : "Não informado";
  const rows: Array<[string, string]> = [
    ["Nome", data.name],
    ["E-mail", data.email],
    ["Telefone", data.phone || "Não informado"],
    ["Departamento", department],
  ];

  const subject = `Contato pelo site: ${singleLine(data.name)}${data.department ? ` (${department})` : ""}`;

  const text = [
    "Nova mensagem enviada pelo formulário de contato do site.",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Mensagem:",
    data.message,
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1B2A4A">
<p>Nova mensagem enviada pelo formulário de contato do site.</p>
<table cellpadding="6" style="border-collapse:collapse">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="font-weight:bold;vertical-align:top">${label}</td><td>${escapeHtml(value)}</td></tr>`
  )
  .join("\n")}
</table>
<p style="font-weight:bold;margin-top:16px">Mensagem:</p>
<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
<p style="color:#6b7280;font-size:13px;margin-top:24px">Responda este e-mail para falar direto com ${escapeHtml(data.name)}.</p>
</div>`;

  return { subject, text, html, replyTo: data.email };
}
