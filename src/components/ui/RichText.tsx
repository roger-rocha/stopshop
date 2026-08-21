import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Renderiza o subconjunto de Markdown aceito nos campos de texto longo do
 * admin: `## título`, `### subtítulo`, listas com `-`, parágrafos separados por
 * linha em branco, `**negrito**` e `[texto](link)`.
 *
 * A saída é montada como elementos React — nada de innerHTML —, e os links
 * passam por uma checagem de esquema antes de virar href.
 */

type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] };

function parseBlocks(source: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "p", text: paragraph.join(" ") });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (line.length === 0) {
      flushAll();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      blocks.push({
        type: heading[1].length === 2 ? "h2" : "h3",
        text: heading[2].trim(),
      });
      continue;
    }

    const item = /^[-*]\s+(.*)$/.exec(line);
    if (item) {
      flushParagraph();
      list.push(item[1].trim());
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushAll();
  return blocks;
}

const SAFE_ABSOLUTE = /^(https?:|mailto:|tel:)/i;

function safeHref(href: string): string | null {
  const value = href.trim();
  if (value.startsWith("/") || value.startsWith("#")) return value;
  return SAFE_ABSOLUTE.test(value) ? value : null;
}

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE).filter(Boolean).map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={key} className="font-semibold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const href = safeHref(link[2]);
      // Link com esquema não reconhecido vira texto puro em vez de href inválido.
      if (!href) return <Fragment key={key}>{link[1]}</Fragment>;

      const className =
        "font-medium text-brand-coral underline underline-offset-2 hover:text-brand-coral-dark";

      if (href.startsWith("/") || href.startsWith("#")) {
        return (
          <Link key={key} href={href} className={className}>
            {link[1]}
          </Link>
        );
      }
      return (
        <a
          key={key}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={className}
        >
          {link[1]}
        </a>
      );
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

export function RichText({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const blocks = parseBlocks(content);
  if (blocks.length === 0) return null;

  return (
    <div className={cn("space-y-5", className)}>
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        if (block.type === "h2") {
          return (
            <h2
              key={key}
              className="pt-4 font-display text-2xl font-bold text-text-primary first:pt-0"
            >
              {renderInline(block.text, key)}
            </h2>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={key} className="pt-2 font-display text-xl font-bold text-text-primary">
              {renderInline(block.text, key)}
            </h3>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={key} className="ml-5 list-disc space-y-2 text-text-secondary">
              {block.items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`} className="leading-relaxed">
                  {renderInline(item, `${key}-${itemIndex}`)}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={key} className="leading-relaxed text-text-secondary">
            {renderInline(block.text, key)}
          </p>
        );
      })}
    </div>
  );
}
