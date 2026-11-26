"use server";

import {
  DEFAULT_CONTACT_FORM_RECIPIENT,
  buildContactEmail,
  parseContactForm,
  type ContactFormState,
} from "@/lib/contact-form";

const SEND_ERROR = "Não foi possível enviar sua mensagem agora. Tente novamente em instantes ou fale conosco pelo telefone.";

export async function sendContactMessageAction(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Campo invisível para pessoas; robôs costumam preenchê-lo.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "success" };
  }

  const parsed = parseContactForm(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", message: parsed.message };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FORM_FROM?.trim();
  if (!apiKey || !from) {
    console.error("Contato: serviço de e-mail não configurado (RESEND_API_KEY / CONTACT_FORM_FROM).");
    return { status: "error", message: SEND_ERROR };
  }

  const email = buildContactEmail(parsed.data);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [process.env.CONTACT_FORM_TO?.trim() || DEFAULT_CONTACT_FORM_RECIPIENT],
        reply_to: email.replyTo,
        subject: email.subject,
        text: email.text,
        html: email.html,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      console.error("Contato: serviço de e-mail recusou o envio.", { status: response.status });
      return { status: "error", message: SEND_ERROR };
    }
  } catch {
    // Os dados enviados e a resposta do provedor podem conter dados pessoais.
    console.error("Contato: falha na conexão com o serviço de e-mail.");
    return { status: "error", message: SEND_ERROR };
  }

  return { status: "success" };
}
