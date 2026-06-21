/**
 * "Getting Started → Spacing" — the spacing foundation page.
 *
 * Doc-only React component (rendered by Spacing.stories.tsx). Not exported from
 * src/index.ts, so it never ships in the published bundle.
 *
 * The measure bars use *literal* width utilities (`w-x-small` … `w-2x-large`)
 * so Tailwind generates them from the named spacing tokens — the bar's width is
 * the real token value, never a hand-set pixel number.
 */
import { cn } from "../../utils/cn";
import {
  Code,
  CodeBlock,
  DocHeader,
  DocPage,
  DocSection,
  DocText,
  DocTable,
  ValueChip,
} from "../doc-ui";

/* The 6-step spacing scale, spelled out in full words. Values mirror the
 * `--spacing-*` tokens in src/styles/style.css (the single source of truth). */
const SPACING = [
  { name: "x-small", token: "spacing-x-small", rem: "0.5rem", px: "8px", w: "w-x-small" },
  { name: "small", token: "spacing-small", rem: "0.75rem", px: "12px", w: "w-small" },
  { name: "medium", token: "spacing-medium", rem: "1rem", px: "16px", w: "w-medium" },
  { name: "large", token: "spacing-large", rem: "1.5rem", px: "24px", w: "w-large" },
  { name: "x-large", token: "spacing-x-large", rem: "2rem", px: "32px", w: "w-x-large" },
  { name: "2x-large", token: "spacing-2x-large", rem: "3rem", px: "48px", w: "w-2x-large" },
];

function SpacingScaleViz() {
  return (
    <div className="mt-large flex flex-col gap-medium">
      {SPACING.map((s) => (
        <div key={s.token} className="flex items-center gap-medium">
          <span className="w-24 shrink-0 font-mono text-small text-gray-500 dark:text-gray-400">
            {s.name}
          </span>
          <div
            className={cn(
              "h-6 rounded-small bg-primary-500 dark:bg-primary-400",
              s.w,
            )}
          />
          <span className="font-mono text-small text-gray-400 dark:text-gray-500">
            {s.px}
          </span>
        </div>
      ))}
    </div>
  );
}

const TOKENS_CSS = `/* Spacing scale — spelled out, never numeric */
var(--spacing-x-small);  /* 8px  */
var(--spacing-small);    /* 12px */
var(--spacing-medium);   /* 16px */
var(--spacing-large);    /* 24px */
var(--spacing-x-large);  /* 32px */
var(--spacing-2x-large); /* 48px */`;

const USAGE_TSX = `// The same names power padding, margin and gap utilities.
<div className="flex gap-small p-medium">
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</div>`;

export function SpacingPage() {
  return (
    <DocPage>
      <DocHeader
        title="Spacing"
        lead="Overview of the spacing scale and how it's applied."
      />

      <DocSection title="Spacing scale">
        <DocText>
          Spacing is a 6-step scale, spelled out in full words —{" "}
          <Code>x-small</Code> through <Code>2x-large</Code> — used for padding,
          margin and gaps. Each bar below is drawn at its real token width.
        </DocText>
        <SpacingScaleViz />
      </DocSection>

      <DocSection title="Scale values">
        <DocText>
          Every step maps to a <Code>--spacing-*</Code> token and a matching set
          of utilities (<Code>p-*</Code>, <Code>m-*</Code>, <Code>gap-*</Code>,{" "}
          <Code>w-*</Code> …).
        </DocText>
        <DocTable
          headers={["Token", "Value", "Pixels"]}
          rows={SPACING.map((s) => [
            <Code>{s.token}</Code>,
            <ValueChip>{s.rem}</ValueChip>,
            <ValueChip>{s.px}</ValueChip>,
          ])}
        />
      </DocSection>

      <DocSection title="Using spacing tokens">
        <DocText>
          Reference the tokens directly as CSS variables, or use the spelled-out
          utilities anywhere a Tailwind spacing value is expected.
        </DocText>
        <CodeBlock code={TOKENS_CSS} lang="css" />
        <CodeBlock code={USAGE_TSX} />
      </DocSection>
    </DocPage>
  );
}
