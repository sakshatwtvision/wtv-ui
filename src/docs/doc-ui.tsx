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
import { createHighlighter } from "shiki";
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
 * Code block — Shiki syntax highlighting + copy button
 * ------------------------------------------------------------------ */

// Singleton: one highlighter shared across all CodeBlock instances.
// Loaded once on module init so the first render is fast.
type ShikiHighlighter = Awaited<ReturnType<typeof createHighlighter>>;

let _hlPromise: Promise<ShikiHighlighter> | null = null;

function getHighlighter() {
  return (_hlPromise ??= createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: ["tsx", "typescript", "javascript", "jsx", "css", "bash", "json"],
  }));
}

// Kick off loading immediately so it's ready by first render.
getHighlighter();

export function CodeBlock({
  code,
  lang = "tsx",
  showLineNumbers = true,
  className,
}: {
  code: string;
  /** Shiki language id. Defaults to "tsx". */
  lang?: string;
  showLineNumbers?: boolean;
  className?: string;
}) {
  const [html, setHtml] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    getHighlighter()
      .then((hl) => {
        setHtml(
          hl.codeToHtml(code, {
            lang,
            themes: { light: "github-light", dark: "github-dark" },
          }),
        );
      })
      .catch(() => setHtml(""));
  }, [code, lang]);

  const onCopy = () => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div
      className={cn(
        "group relative mt-medium overflow-hidden rounded-medium bg-gray-50 ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800",
        className,
      )}
    >
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2 top-2 z-10 inline-flex size-8 items-center justify-center rounded-small text-gray-500 opacity-0 transition hover:bg-gray-200 hover:text-gray-700 focus-visible:opacity-100 group-hover:opacity-100 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      >
        {copied ? (
          <CheckIcon className="size-4 text-positive-600 dark:text-positive-400" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </button>
      {html ? (
        <div
          className={cn(
            "shiki-wrapper font-mono text-large leading-relaxed",
            showLineNumbers && "shiki-line-numbers",
          )}
          // Source is our own dev-time code strings, not user content
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto p-large font-mono text-large leading-relaxed text-gray-700 dark:text-gray-200">
          <code>{code}</code>
        </pre>
      )}
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
