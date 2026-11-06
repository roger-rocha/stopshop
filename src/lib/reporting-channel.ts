import { z } from "zod";

export const REPORTING_CHANNEL_KEY = "reporting-channel";

const heading = z.string().trim().min(1, "Preencha todos os títulos e rótulos.")
  .max(200, "Use no máximo 200 caracteres nos títulos e rótulos.");
const paragraph = z.string().trim().min(1, "Preencha todos os textos da página.")
  .max(5000, "Use no máximo 5.000 caracteres em cada texto.");

export const reportingChannelSchema = z.object({
  eyebrow: heading,
  title: heading,
  subtitle: heading,
  introduction: paragraph,
  situationsTitle: heading,
  situations: z.preprocess(
    (value) => typeof value === "string"
      ? value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
      : value,
    z.array(heading)
      .min(1, "Informe pelo menos uma situação que pode ser denunciada.")
      .max(20, "Informe no máximo 20 situações que podem ser denunciadas.")
  ),
  channelsTitle: heading,
  emailLabel: heading,
  email: z.string().trim().max(254, "Use no máximo 254 caracteres no e-mail.")
    .refine((value) => !value || (z.email().safeParse(value).success && !/[?&#]/.test(value)),
      "Informe um e-mail válido para receber denúncias."),
  formLabel: heading,
  formButtonLabel: heading,
  formUrl: z.string().trim().max(2048, "Use no máximo 2.048 caracteres no link.")
    .refine((value) => {
      if (!value) return true;
      if (!/^https:\/\//i.test(value) || /[\s\\\u0000-\u001f\u007f]/.test(value)) return false;
      try {
        const url = new URL(value);
        return url.protocol === "https:" && !!url.hostname && !url.username && !url.password;
      } catch {
        return false;
      }
    }, "Informe um link HTTPS válido para o formulário, sem usuário ou senha."),
  protectionTitle: heading,
  protectionText: paragraph,
  complianceTitle: heading,
  complianceText: paragraph,
  metaDescription: z.string().trim().min(1, "Preencha a descrição para buscadores.")
    .max(500, "Use no máximo 500 caracteres na descrição para buscadores."),
});

export type ReportingChannelConfig = z.infer<typeof reportingChannelSchema>;

export const DEFAULT_REPORTING_CHANNEL: ReportingChannelConfig = {
  eyebrow: "Canal de Denúncias",
  title: "Um canal seguro para você se manifestar",
  subtitle: "Você tem voz. Nós vamos ouvir.",
  introduction:
    "No Stop Shop, acreditamos que todas as pessoas merecem trabalhar, comprar e circular em um ambiente seguro, respeitoso e ético. Se você presenciou ou sofreu alguma situação que fere esses valores, conte com este canal.",
  situationsTitle: "O que você pode denunciar",
  situations: [
    "Assédio moral ou sexual",
    "Discriminação de qualquer natureza",
    "Violência ou abuso",
    "Fraude, corrupção e condutas antiéticas",
    "Questões de segurança",
  ],
  channelsTitle: "Como fazer sua denúncia",
  emailLabel: "Por e-mail",
  // Destinations must be configured for Stop Shop; never route reports to another shopping.
  email: "",
  formLabel: "Pelo formulário online",
  formButtonLabel: "Acessar o formulário de denúncia",
  formUrl: "",
  protectionTitle: "Sigilo e respeito",
  protectionText:
    "Todas as denúncias são tratadas com sigilo, confidencialidade e respeito. Cada manifestação é apurada com responsabilidade e imparcialidade pela equipe responsável, sem retaliação a quem denunciar de boa-fé.",
  complianceTitle: "Compromisso com a proteção de dados",
  complianceText:
    "O Stop Shop respeita a privacidade e a proteção dos dados pessoais. As informações fornecidas devem ser utilizadas para a apuração do relato, com acesso restrito à equipe responsável e observância à Lei Geral de Proteção de Dados (LGPD).",
  metaDescription:
    "Conheça o Canal de Denúncias do Stop Shop e os meios de contato para relatar condutas inadequadas, assédio, fraude ou questões de segurança.",
};

export function parseReportingChannelConfig(value: string | null | undefined): ReportingChannelConfig {
  if (!value) return DEFAULT_REPORTING_CHANNEL;
  try {
    const parsed = reportingChannelSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : DEFAULT_REPORTING_CHANNEL;
  } catch {
    return DEFAULT_REPORTING_CHANNEL;
  }
}
