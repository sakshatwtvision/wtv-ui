/**
 * "Getting Started → Color" — the color foundation page.
 *
 * Doc-only React component (rendered by Color.stories.tsx). Not exported from
 * src/index.ts, so it never ships in the published bundle.
 *
 * Swatches use *literal* color utility classes (`bg-blue-500`, `bg-purple-50`,
 * …) rather than inline `var(--…)`, so Tailwind's scanner generates them and
 * there is nothing to safelist.
 */
import { cn } from "../../utils/cn";
import {
  Code,
  CodeBlock,
  DocHeader,
  DocPage,
  DocSection,
  DocText,
} from "../doc-ui";

/* ---- The 7 base colors (closed palette) ---- */
const BASE_COLORS = [
  { name: "Gray", className: "bg-gray-500" },
  { name: "Blue", className: "bg-blue-500" },
  { name: "Green", className: "bg-green-500" },
  { name: "Red", className: "bg-red-500" },
  { name: "Orange", className: "bg-orange-500" },
  { name: "Yellow", className: "bg-yellow-500" },
  { name: "Purple", className: "bg-purple-500" },
];

function BaseColorGrid() {
  return (
    <div className="mt-large grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
      {BASE_COLORS.map((c) => (
        <div key={c.name} className="flex flex-col gap-x-small">
          <div
            className={cn(
              "h-20 rounded-medium shadow-positive ring-1 ring-inset ring-black/5 dark:ring-white/10",
              c.className,
            )}
          />
          <span className="text-small tabular-nums text-gray-500 dark:text-gray-400">
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---- A representative 50 → 950 scale (purple) ---- */
const PURPLE_SCALE: Array<[step: string, className: string]> = [
  ["50", "bg-purple-50"],
  ["100", "bg-purple-100"],
  ["200", "bg-purple-200"],
  ["300", "bg-purple-300"],
  ["400", "bg-purple-400"],
  ["500", "bg-purple-500"],
  ["600", "bg-purple-600"],
  ["700", "bg-purple-700"],
  ["800", "bg-purple-800"],
  ["900", "bg-purple-900"],
  ["950", "bg-purple-950"],
];

function PurpleScale() {
  return (
    <div className="mt-large grid grid-cols-11 gap-1">
      {PURPLE_SCALE.map(([step, className]) => (
        <div key={step} className="flex flex-col items-center gap-1">
          <div className={cn("size-16 rounded-medium", className)} />
          <span className="text-small tabular-nums text-gray-500 dark:text-gray-400">
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---- Code samples for the semantic-alias section ---- */
const ALIAS_CSS = `/* Semantic names are var() aliases onto a literal palette.
   Change the palette and every alias follows. */
--color-primary-600: var(--color-blue-600);
--color-positive-600: var(--color-green-600);
--color-negative-600: var(--color-red-600);
--color-warning-600: var(--color-orange-600);`;

const USAGE_TSX = `// Components reference the semantic name — never the palette.
<Button className="bg-primary-600 hover:bg-primary-700">
  Save changes
</Button>`;

export function ColorPage() {
  return (
    <DocPage>
      <DocHeader
        title="Color"
        lead="Understanding the color system and how components consume it."
      />

      <DocSection title="A closed palette">
        <DocText>
          The theme starts by clearing Tailwind's defaults (
          <Code>--color-*: initial</Code>), so <Code>slate</Code>,{" "}
          <Code>indigo</Code>, <Code>sky</Code> and friends simply don't exist.
          There are only{" "}
          <strong className="font-demi-bold text-gray-800 dark:text-gray-100">
            7 base colors
          </strong>{" "}
          (shown below), keeping the brand consistent and the bundle lean.
        </DocText>
        <BaseColorGrid />
      </DocSection>

      <DocSection title="The 50 → 950 scale">
        <DocText>
          Every base color is an 11-step scale that runs from <Code>50</Code>{" "}
          (lightest) to <Code>950</Code> (darkest), light to dark in both
          themes. For example, here's the <Code>purple</Code> scale:
        </DocText>
        <PurpleScale />
      </DocSection>

      <DocSection title="Semantic aliases">
        <DocText>
          Components consume{" "}
          <strong className="font-demi-bold text-gray-800 dark:text-gray-100">
            semantic names, not literal palettes
          </strong>
          . A button uses <Code>primary-600</Code>, never <Code>blue-600</Code>.
          The semantic names are <Code>var()</Code> aliases onto a literal
          palette, so re-pointing <Code>primary</Code> reskins every component
          at once.
        </DocText>
        <CodeBlock code={ALIAS_CSS} />
        <CodeBlock code={USAGE_TSX} />
      </DocSection>
    </DocPage>
  );
}
