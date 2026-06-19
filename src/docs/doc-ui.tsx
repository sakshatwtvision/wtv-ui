/**
 * Documentation UI primitives for the "Getting Started" foundation pages.
 *
 * These are plain React components used ONLY by Storybook docs (the *.stories
 * files under src/docs). They are never re-exported from `src/index.ts`, so they
 * never reach the published bundle — tsup only bundles what `index.ts` exports.
 *
 * Everything here renders in the library's own Inter (`font-sans`) and uses the
 * real Forma tokens via literal utility classes, so the docs look like the
 * library, not like Storybook's default Markdown theme.
 */
import * as React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "../utils/cn";

/* ------------------------------------------------------------------ *
 * Page scaffold + typography
 * ------------------------------------------------------------------ */

/** Centered reading column. Sets the Inter face and base body color. */
export function DocPage({ children }: { children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-large py-x-large font-sans text-large leading-default text-gray-600 dark:text-gray-300">
      {children}
    </article>
  );
}

/** Page title + lead paragraph, e.g. "Color" / "Understanding the color system." */
export function DocHeader({ title, lead }: { title: string; lead: string }) {
  return (
    <header className="mb-2x-large">
      <h1 className="text-4x-large font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-small text-x-large text-gray-500 dark:text-gray-400">{lead}</p>
    </header>
  );
}

/** A titled section. Generous top spacing separates sections like Radix docs. */
export function DocSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-2x-large">
      <h2 className="text-2x-large font-semibold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Body paragraph. */
export function DocText({ children }: { children: React.ReactNode }) {
  return <p className="mt-medium text-large leading-relaxed">{children}</p>;
}

/** Inline `code` chip. */
export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-small bg-gray-100 px-1.5 py-0.5 font-mono text-[0.875em] text-primary-700 dark:bg-gray-800 dark:text-primary-300">
      {children}
    </code>
  );
}

/* ------------------------------------------------------------------ *
 * Code block (lightweight syntax highlighting + copy)
 * ------------------------------------------------------------------ */

type TokenKind = "comment" | "string" | "prop" | "hex" | "tag" | "fn" | "attr";

// On-brand token colors (Forma palette), with dark-mode counterparts.
const TOKEN_CLASS: Record<TokenKind, string> = {
  comment: "text-gray-400 italic dark:text-gray-500",
  string: "text-green-700 dark:text-green-400",
  prop: "text-purple-600 dark:text-purple-300",
  hex: "text-orange-600 dark:text-orange-300",
  tag: "text-primary-700 dark:text-primary-300",
  fn: "text-primary-600 dark:text-primary-300",
  attr: "text-red-600 dark:text-red-300",
};

// One ordered pass over the source. Earlier alternatives win, so comments and
// strings are consumed whole before their contents can match anything else.
const TOKEN_RE =
  /(?<comment>\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(?<string>"[^"]*"|'[^']*'|`[^`]*`)|(?<prop>--[\w-]+)|(?<hex>#[0-9a-fA-F]{3,8}\b)|(?<tag><\/?[A-Za-z][\w.]*|\/?>)|(?<fn>\b[A-Za-z_][\w-]*(?=\())|(?<attr>\b[A-Za-z][\w-]*(?==))/g;

function highlight(code: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  TOKEN_RE.lastIndex = 0;
  for (let m = TOKEN_RE.exec(code); m; m = TOKEN_RE.exec(code)) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const groups = m.groups as Record<TokenKind, string | undefined>;
    const kind = (Object.keys(TOKEN_CLASS) as TokenKind[]).find(
      (k) => groups[k] != null,
    )!;
    out.push(
      <span key={key++} className={TOKEN_CLASS[kind]}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeBlock({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      className={cn(
        "group relative mt-medium overflow-hidden rounded-medium bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800",
        className,
      )}
    >
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-small text-gray-500 opacity-0 transition hover:bg-gray-200 hover:text-gray-700 focus-visible:opacity-100 group-hover:opacity-100 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      >
        {copied ? (
          <CheckIcon className="size-4 text-positive-600 dark:text-positive-400" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </button>
      <pre className="overflow-x-auto p-large font-mono text-medium leading-relaxed text-gray-700 dark:text-gray-200">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Reference table
 * ------------------------------------------------------------------ */

/** A bordered reference table (Step / value style), reused across foundations. */
export function DocTable({
  headers,
  rows,
}: {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="mt-large overflow-hidden rounded-medium ring-1 ring-gray-200 dark:ring-gray-800">
      <table className="w-full border-collapse text-left text-medium">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-900">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-large py-small font-semibold text-gray-800 dark:text-gray-100"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-t border-gray-200 dark:border-gray-800"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-large py-small align-middle text-gray-600 dark:text-gray-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A value chip, e.g. `16px`, for use inside tables. */
export function ValueChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-small bg-gray-100 px-1.5 py-0.5 font-mono text-small text-gray-600 dark:bg-gray-800 dark:text-gray-300">
      {children}
    </span>
  );
}
