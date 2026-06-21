/**
 * "Getting Started → Border radius" — the corner-radius foundation page.
 *
 * Doc-only React component (rendered by Radius.stories.tsx). Not exported from
 * src/index.ts, so it never ships in the published bundle.
 *
 * Both the scale boxes and the component demo use *literal* `rounded-*`
 * utilities, so the rounding shown is always the real token value. The demo
 * renders real library components (TextInput + Button) with a radius override
 * via className — which doubles as proof of the "extend via className" story.
 */
import { Button } from "../../components/button";
import { TextInput } from "../../components/text-input";
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

/* The full radius scale. Values mirror the `--radius-*` tokens in
 * src/styles/style.css (the single source of truth). */
const RADIUS = [
  { name: "none", token: "radius-none", px: "0px", cls: "rounded-none" },
  {
    name: "x-small",
    token: "radius-x-small",
    px: "4px",
    cls: "rounded-x-small",
  },
  { name: "small", token: "radius-small", px: "8px", cls: "rounded-small" },
  { name: "medium", token: "radius-medium", px: "16px", cls: "rounded-medium" },
  { name: "large", token: "radius-large", px: "24px", cls: "rounded-large" },
  {
    name: "x-large",
    token: "radius-x-large",
    px: "32px",
    cls: "rounded-x-large",
  },
  {
    name: "2x-large",
    token: "radius-2x-large",
    px: "40px",
    cls: "rounded-2x-large",
  },
  { name: "full", token: "radius-full", px: "9999px", cls: "rounded-full" },
];

function RadiusScaleViz() {
  return (
    <div className="mt-large rounded-large bg-gray-50 p-large ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
      <div className="flex items-stretch gap-small">
        {RADIUS.map((r) => (
          <div
            key={r.name}
            className="flex min-w-0 flex-1 flex-col items-center gap-x-small"
          >
            <div
              className={cn(
                "size-12 w-full bg-primary-100 ring-1 ring-inset ring-primary-300 dark:bg-primary-950 dark:ring-primary-800",
                r.cls,
              )}
            />
            <span className="font-mono text-small text-gray-500 dark:text-gray-400">
              {r.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* The radii shown applied to a real composer (input + button). */
const DEMO_RADII = [
  { name: "none", cls: "rounded-none" },
  { name: "small", cls: "rounded-small" },
  { name: "medium", cls: "rounded-medium" },
  { name: "large", cls: "rounded-large" },
  { name: "full", cls: "rounded-full" },
];

function ComponentDemo() {
  return (
    <div className="mt-large divide-y divide-dashed divide-gray-200 rounded-large ring-1 ring-gray-200 dark:divide-gray-800 dark:ring-gray-800">
      {DEMO_RADII.map((r) => (
        <div key={r.name} className="flex items-center gap-medium p-large">
          <span className="w-16 shrink-0 font-mono text-small text-gray-500 dark:text-gray-400">
            {r.name}
          </span>
          <div className="flex flex-1 items-center gap-small">
            <TextInput placeholder="Reply…" className={cn("flex-1", r.cls)} />
            <Button variant="primary" className={r.cls}>
              Send
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

const USAGE_TSX = `// Every component defaults to rounded-medium; override per instance.
<Button className="rounded-full">Send</Button>
<TextInput className="rounded-small" />`;

const TOKENS_CSS = `/* Radius scale — a closed set (--radius-*: initial) */
var(--radius-none);     /* 0px    */
var(--radius-x-small);  /* 4px    */
var(--radius-small);    /* 8px    */
var(--radius-medium);   /* 16px   */
var(--radius-large);    /* 24px   */
var(--radius-x-large);  /* 32px   */
var(--radius-2x-large); /* 40px   */
var(--radius-full);     /* 9999px */`;

export function RadiusPage() {
  return (
    <DocPage>
      <DocHeader
        title="Radius"
        lead="The corner-radius scale, and how it softens the UI."
      />

      <DocSection title="Radius scale">
        <DocText>
          Radius is a closed scale — <Code>--radius-*: initial</Code> clears
          Tailwind's defaults, leaving only these named steps from{" "}
          <Code>none</Code> to <Code>full</Code>. On Chromium the corners are
          rendered as smooth <em>squircles</em>, so the rounding curves rather
          than cutting a hard quarter-circle.
        </DocText>
        <RadiusScaleViz />
      </DocSection>

      <DocSection title="Scale values">
        <DocText>
          Each step maps to a <Code>--radius-*</Code> token and a matching{" "}
          <Code>rounded-*</Code> utility.
        </DocText>
        <DocTable
          headers={["Token", "Value", "Pixels"]}
          rows={RADIUS.map((r) => [
            <Code>{r.token}</Code>,
            <ValueChip>{r.cls}</ValueChip>,
            <ValueChip>{r.px}</ValueChip>,
          ])}
        />
      </DocSection>

      <DocSection title="Applied to components">
        <DocText>
          Every component defaults to <Code>rounded-medium</Code>. Because the
          radius is just a class, you can soften or sharpen any instance with a{" "}
          <Code>rounded-*</Code> override — here the same composer at five
          radii:
        </DocText>
        <ComponentDemo />
      </DocSection>

      <DocSection title="Using radius tokens">
        <DocText>
          Reference the tokens directly as CSS variables, or use the{" "}
          <Code>rounded-*</Code> utilities anywhere.
        </DocText>
        <CodeBlock code={USAGE_TSX} />
        <CodeBlock code={TOKENS_CSS} lang="css" />
      </DocSection>
    </DocPage>
  );
}
