import { siteContact } from "@/lib/site";

/**
 * Conteúdo padrão das páginas institucionais. O texto salvo em `settings`
 * (editável em /admin/institucional) tem precedência; estes valores são o
 * fallback usado enquanto nada foi salvo.
 *
 * ATENÇÃO: é um modelo genérico baseado na LGPD, não um parecer jurídico.
 * Os trechos entre colchetes precisam ser preenchidos e o texto revisado pelo
 * jurídico do Stop Shop antes de valer como política oficial.
 */

export type LegalPageContent = {
  title: string;
  description: string;
  body: string;
  /** Data exibida como "última atualização" enquanto não há registro salvo. */
  fallbackDate: string;
};

const privacyBody = `## 1. Quem somos

Esta política descreve como o **Stop Shop** trata os dados pessoais de quem visita este site e o shopping.

- **Controlador:** Stop Shop — [razão social completa]
- **CNPJ:** [preencher]
- **Endereço:** ${siteContact.addressLine1}, ${siteContact.addressLine2} — ${siteContact.cityLine}
- **Contato:** [${siteContact.email}](mailto:${siteContact.email})

## 2. Quais dados coletamos

**Dados que você nos fornece.** Quando você preenche um formulário do site — contato, trabalhe conosco ou portal de denúncia — coletamos as informações daquele formulário, como nome, e-mail, telefone e o conteúdo da sua mensagem.

**Dados coletados automaticamente.** Ao navegar, registramos informações técnicas como endereço IP, tipo de navegador e dispositivo, páginas visitadas e data e hora do acesso. Esses dados vêm de cookies e tecnologias semelhantes, descritos na nossa [Política de Cookies](/politica-de-cookies).

## 3. Para que usamos os seus dados

- Responder às suas mensagens, dúvidas e solicitações
- Avaliar candidaturas às vagas divulgadas no site
- Apurar relatos recebidos pelo portal de denúncia
- Entender como o site é usado e melhorar a navegação
- Cumprir obrigações legais e regulatórias

## 4. Com que base legal tratamos os dados

Tratamos dados pessoais com fundamento na Lei nº 13.709/2018 (LGPD), principalmente com base no seu **consentimento**, na **execução de procedimentos preliminares a um contrato** a seu pedido, no **cumprimento de obrigação legal** e no **legítimo interesse** do Stop Shop em manter e melhorar seus serviços.

## 5. Com quem compartilhamos

Não vendemos os seus dados. Podemos compartilhá-los com:

- Prestadores de serviço que operam o site e nossas ferramentas de comunicação, sempre limitados ao necessário
- Lojistas do shopping, quando você se candidata a uma vaga divulgada por eles
- Autoridades públicas, quando houver obrigação legal ou ordem judicial

## 6. Por quanto tempo guardamos

Mantemos os dados pelo tempo necessário para as finalidades acima ou pelo prazo exigido por lei. Depois disso, eles são eliminados ou anonimizados.

## 7. Segurança

Adotamos medidas técnicas e organizacionais para proteger os dados pessoais contra acesso não autorizado, perda ou uso indevido. Nenhum sistema é totalmente imune a incidentes, mas trabalhamos para reduzir esses riscos.

## 8. Seus direitos

A LGPD garante que você pode, a qualquer momento:

- Confirmar se tratamos dados seus e acessá-los
- Corrigir dados incompletos, inexatos ou desatualizados
- Pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários
- Solicitar a portabilidade dos dados
- Revogar o consentimento dado anteriormente
- Se opor a um tratamento e pedir informações sobre compartilhamentos

Para exercer qualquer desses direitos, escreva para [${siteContact.email}](mailto:${siteContact.email}). Podemos pedir informações adicionais para confirmar a sua identidade antes de atender ao pedido.

## 9. Alterações desta política

Podemos atualizar esta política para refletir mudanças no site, nos nossos processos ou na legislação. A data da última atualização fica sempre indicada no topo desta página.

## 10. Contato

Dúvidas sobre esta política ou sobre o tratamento dos seus dados podem ser enviadas para [${siteContact.email}](mailto:${siteContact.email}) ou pelo telefone ${siteContact.phone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3")}.`;

const cookiesBody = `## 1. O que são cookies

Cookies são pequenos arquivos de texto que um site grava no seu navegador. Eles guardam informações sobre a sua visita e permitem que o site funcione corretamente e lembre de algumas preferências.

Além dos cookies, podemos usar tecnologias semelhantes, como armazenamento local do navegador e pixels de acompanhamento. Sempre que falamos em "cookies" nesta página, estamos incluindo essas tecnologias.

## 2. Como usamos cookies

Usamos cookies para manter o site funcionando, entender como ele é utilizado e melhorar a experiência de quem navega. Os dados obtidos por meio de cookies são tratados conforme a nossa [Política de Privacidade](/politica-de-privacidade).

## 3. Tipos de cookies que utilizamos

**Necessários.** Essenciais para o funcionamento do site — por exemplo, para manter a sua sessão e garantir a segurança das páginas. Sem eles o site não funciona corretamente, por isso não podem ser desativados.

**De desempenho e análise.** Ajudam a entender quais páginas são mais visitadas e como as pessoas navegam, de forma agregada, para que possamos melhorar o site.

**De funcionalidade.** Guardam preferências da sua visita para que a navegação fique mais confortável.

**De terceiros.** Algumas seções do site exibem conteúdo hospedado por outras empresas, como a grade de publicações do Instagram e mapas. Esses serviços podem gravar os próprios cookies, seguindo as políticas de privacidade deles.

## 4. Como gerenciar ou desativar cookies

Você pode aceitar, bloquear ou apagar cookies a qualquer momento nas configurações do seu navegador:

- [Google Chrome](https://support.google.com/chrome/answer/95647)
- [Mozilla Firefox](https://support.mozilla.org/pt-BR/kb/protecao-aprimorada-contra-rastreamento-firefox-desktop)
- [Safari](https://support.apple.com/pt-br/guide/safari/sfri11471/mac)
- [Microsoft Edge](https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09)

Bloquear cookies necessários pode fazer com que partes do site deixem de funcionar como esperado.

## 5. Alterações desta política

Podemos atualizar esta política sempre que houver mudança nas ferramentas usadas no site ou na legislação aplicável. A data da última atualização fica indicada no topo desta página.

## 6. Contato

Dúvidas sobre o uso de cookies podem ser enviadas para [${siteContact.email}](mailto:${siteContact.email}).`;

export const legalPageDefaults = {
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    description:
      "Como o Stop Shop coleta, usa, compartilha e protege os dados pessoais de quem visita o site.",
    body: privacyBody,
    fallbackDate: "2026-08-21",
  },
  "politica-de-cookies": {
    title: "Política de Cookies",
    description:
      "Quais cookies o site do Stop Shop utiliza, para que servem e como você pode gerenciá-los.",
    body: cookiesBody,
    fallbackDate: "2026-08-21",
  },
} satisfies Record<string, LegalPageContent>;

export type LegalPageSlug = keyof typeof legalPageDefaults;

/** Registro usado pelo admin e pelas rotas públicas. */
export const legalPages = [
  {
    slug: "politica-de-privacidade" as const,
    settingKey: "legalPrivacy",
    adminLabel: "Política de Privacidade",
  },
  {
    slug: "politica-de-cookies" as const,
    settingKey: "legalCookies",
    adminLabel: "Política de Cookies",
  },
];

export function legalPageBySlug(slug: string) {
  return legalPages.find((page) => page.slug === slug) ?? null;
}
