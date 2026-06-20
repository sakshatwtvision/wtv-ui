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

const SHADOWS = [
  {
    name: "positive",
    token: "shadow-positive",
    utility: "shadow-positive",
    value: "0px 1px 0px rgba(25, 37, 50, 0.1)",
    description: "Hairline lift — cards, inputs, inline chips.",
  },
  {
    name: "default",
    token: "shadow-default",
    utility: "shadow-default",
    value: "ring + 3px + 6px drop",
    description: "Standard floating surface — dropdowns, popovers, tooltips.",
  },
  {
    name: "heavy",
    token: "shadow-heavy",
    utility: "shadow-heavy",
    value: "ring + 8px + 13px drop",
    description: "Deep elevation — modals, dialogs, full-page drawers.",
  },
];

function ShadowPreview() {
  return (
    <div className="mt-large flex flex-col gap-x-large">
      {SHADOWS.map((s) => (
        <div key={s.name} className="flex items-center gap-x-large">
          <div
            className={cn(
              "size-20 shrink-0 rounded-large bg-white dark:bg-gray-800",
              s.utility,
            )}
          />
          <div className="flex flex-col gap-x-small">
            <span className="font-mono text-medium font-medium text-gray-900 dark:text-gray-50">
              {s.token}
            </span>
            <span className="text-medium text-gray-500 dark:text-gray-400">
              {s.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

const TOKENS_CSS = `/* Three elevation levels — consume via utility or CSS variable */
var(--shadow-positive);  /* hairline lift    */
var(--shadow-default);   /* floating surface */
var(--shadow-heavy);     /* deep elevation   */`;

const USAGE_TSX = `// Apply directly as a Tailwind utility class.
<div className="shadow-default rounded-large p-large">
  Dropdown content
</div>`;

export function ShadowPage() {
  return (
    <DocPage>
      <DocHeader
        title="Shadow"
        lead="Three elevation levels that define depth across the UI."
      />

      <DocSection title="Elevation scale">
        <DocText>
          The shadow scale has three named steps —{" "}
          <Code>positive</Code>, <Code>default</Code>, and{" "}
          <Code>heavy</Code> — each adding more perceived depth. Lower steps
          are used for inline surfaces; heavier steps for overlays that float
          above the page.
        </DocText>
        <ShadowPreview />
      </DocSection>

      <DocSection title="Scale values">
        <DocText>
          Each step maps to a <Code>--shadow-*</Code> token and a matching{" "}
          <Code>shadow-*</Code> utility.
        </DocText>
        <DocTable
          headers={["Token", "Use case"]}
          rows={SHADOWS.map((s) => [
            <Code>{s.token}</Code>,
            <ValueChip>{s.description}</ValueChip>,
          ])}
        />
      </DocSection>

      <DocSection title="Using shadow tokens">
        <DocText>
          Reference the tokens as CSS variables in custom stylesheets, or use
          the <Code>shadow-*</Code> utilities directly in className.
        </DocText>
        <CodeBlock code={TOKENS_CSS} />
        <CodeBlock code={USAGE_TSX} />
      </DocSection>
    </DocPage>
  );
}
