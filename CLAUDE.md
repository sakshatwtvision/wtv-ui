# CLAUDE.md

Guidance for working in this repo. Read this before touching tokens, components, or the `cn` utility.

## What this is

A React component library implementing Contentful's **Forma 36** design language, built on **Tailwind CSS v4 + Base UI**, with components that stay extendable via plain `className`. Vite + React 19 (React Compiler enabled). Icons from **lucide-react**.

> **Package manager: pnpm — only pnpm.** This repo is pnpm-managed (`pnpm-lock.yaml`, `pnpm-workspace.yaml`). Do **not** run `npm install`/`npm i`; mixing npm into a pnpm tree writes a `package-lock.json` and flattens `node_modules`, producing **two copies of React** → `Invalid hook call` at runtime. If that happens: delete `package-lock.json` and run `pnpm install`, then restart the dev server with `--force`.

## Commands

```bash
pnpm dev          # Vite dev server
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
pnpm exec tsc -b  # typecheck only
pnpm add <pkg>    # add a dependency (never `npm install`)
```

There are no unit tests. To verify UI/behavior, run the app and observe (use the `verify` skill / Playwright against the dev server); don't add a test runner just to check a change.

## Layout

```
src/
  styles/
    style.css        # @fontsource Inter import + Tailwind import + @theme tokens + dark mode + base layer
    iris-brand.css   # DEMO-ONLY: scoped [data-brand=iris] override (Radix Iris)
  utils/cn.ts        # clsx + extended tailwind-merge
  components/
    Button/Button.tsx, index.ts   # reference component — copy its structure
    index.ts         # library barrel
  App.tsx            # showcase/playground (theme + brand toggles)
  main.tsx           # imports style.css then iris-brand.css
examples/
  iris-theme.css     # global (unscoped) consumer override example
```

## Design tokens — the rules

Tokens live in the `@theme` block of [src/styles/style.css](src/styles/style.css). Token values are authentic, pulled from `@contentful/f36-tokens`.

- **Naming is kebab-case with Forma's full words**, never Tailwind's abbreviations: `radius-small` not `rounded-sm`, `text-medium` not `text-base`, `spacing-x-large` not `spacing-8`. Spacing scale spelled out: `x-small → small → medium → large → x-large → 2x-large`.
- **Color is a closed palette.** `@theme` starts with `--color-*: initial`, which **removes Tailwind's default colors** (`slate`, `indigo`, `sky`, …). Only Forma palettes exist: `gray`, `blue`, `green`, `red`, `orange`, `yellow`, `purple`. Adding a default Tailwind color won't work unless you define it as a token.
- **Semantic aliases over literal palettes.** `primary→blue`, `positive→green`, `negative→red`, `warning→orange`, defined as `var()` references (`--color-primary-600: var(--color-blue-600)`). Single source of truth — change `blue`, `primary` follows. **Components should use the semantic names** (`bg-primary-600`), not the literal palette, so the brand stays themeable.
- **Scale is `50 → 950`, low = lightest, in BOTH light and dark.** Forma officially ships 100–900; `50`/`950` are derived (50 = 100 lightened 50% toward white; 950 = 900 darkened 40% toward black) and documented in the Gray block comment.
- **Use `@theme`, never `@theme inline`.** Inline would bake values into utilities and break the runtime variable indirection that the whole theming/dark-mode/brand-override story depends on.

## Consumer extensibility (important architectural property)

Utilities compile to `var(--color-primary-600)`, and theme vars live in `@layer theme`. Because **unlayered CSS beats layered CSS** regardless of import order, a consumer reskins the library by redefining `--color-primary-*` in a plain `:root {}` / `.dark {}` block — no rebuild, cascades to every component. See [examples/iris-theme.css](examples/iris-theme.css) (global) and [src/styles/iris-brand.css](src/styles/iris-brand.css) (scoped to `[data-brand=iris]` for the demo switch).

When mapping a 12-step semantic scale (e.g. Radix): pin the brand **solid** (step 9) to `600`, keep `50=lightest → 950=darkest`, and re-point the same slots to the dark palette under `.dark`.

## Dark mode

- Class-based via `@custom-variant dark (&:where(.dark, .dark *))` — toggle `.dark` on `<html>`. (The IDE's CSS linter flags `@custom-variant`/`@theme` as "unknown at-rule"; harmless, Tailwind processes them.)
- `.dark body` flips the page surface; `color-scheme` is set per theme.
- **Convention for solid button variants:** keep the same `-600` base in both themes; light mode *darkens* on interaction (`600→700→800`), dark mode *lightens* (`600→500→400`). Low token numbers are always lighter, so `dark:enabled:hover:bg-primary-500` is lighter than the `600` base — that's intended.

## `cn` and the tailwind-merge gotcha (do not remove)

[src/utils/cn.ts](src/utils/cn.ts) is `clsx` + an **extended** `tailwind-merge`. The extension is **load-bearing**: tailwind-merge only knows Tailwind's default scale names, so it would misclassify our renamed scales — e.g. treat `text-medium` (a font-size) as a text *color* and cancel out `text-white`. The `extendTailwindMerge` config registers our `text-*` (font-size), `radius-*`, `spacing`, and `font-weight` token names. If you add a new renamed scale to `@theme`, add it here too, or `cn` overrides will silently break.

## Component conventions (follow Button as the template)

[src/components/Button/Button.tsx](src/components/Button/Button.tsx) is the reference implementation. Mirror its structure for every new component:

- **Build on a Base UI primitive, aliased `*Primitive`.** Import the headless component from its subpath and rename it: `import { Button as ButtonPrimitive } from '@base-ui/react/button'`. Render `<XPrimitive>` and spread `{...props}` onto it — you inherit accessibility, the `render` prop (polymorphism / composition, e.g. `render={<a href="…" />}`), `ref` forwarding, and `disabled` handling for free. Do **not** hand-roll `useRender` or a custom `as` prop.
- **Variants via `class-variance-authority`, kept private.** Define `const xVariants = cva([...], { variants, defaultVariants })` at module scope. It is **not exported** — a component file's public API is only the component and its `*Props` type.
- **Props are a `type` alias composed with `&` (never `interface`).** Intersect the primitive props, the cva variants, and your extras:

```ts
export type XProps = XPrimitive.Props &
  VariantProps<typeof xVariants> & {
    className?: string;   // narrows the primitive's `string | (state) => string` to a plain string
    isLoading?: boolean;
    // …
  };
```

  Pull `variant`/`size`/etc. straight from `VariantProps<typeof xVariants>` — never re-declare them by hand, and don't export separate `XVariant`/`XSize` aliases (index into `XProps['variant']` if needed). Intersecting `& { className?: string }` collapses the primitive's `string | fn` className to `string` — no `Omit` required.
- **Merge classes with the cva `className` passthrough.** Final className is always `cn(xVariants({ ...variants, className }))` — pass the consumer `className` *into* cva, then wrap in `cn` (extended twMerge) so consumer classes win conflicts.
- **Props API mirrors Forma 36**: boolean props are `is*` (`isDisabled`, `isLoading`, `isFullWidth`); intent is `variant`; sizing is `size` with full words (`small`/`medium`/`large`).
- **Expose state via `data-*` + `aria-*`** (`data-variant`, `data-loading`, `aria-busy`) for styling/testing, and collapse all disabling sources: `disabled={isDisabled || isLoading || disabled}`.
- **Gate hover/active behind `enabled:`** (`enabled:hover:…`) so disabled components don't change color — do not reintroduce per-variant `disabled:hover:` neutralizers.
- **Icons from `lucide-react`**, using the `Icon`-suffixed exports (`LoaderCircleIcon`, `PlusIcon`, …) sized with a token utility (`size-4`). Don't hand-author inline `<svg>`.
- **Barrels.** Export `{ X, type XProps }` from `components/X/index.ts` and surface it in `components/index.ts`. Keeping a file to *only* component + type exports also avoids the `react-refresh/only-export-components` lint.

## Base UI package notes

- The library is **`@base-ui/react`** (stable, 1.x), NOT `@base-ui-components/react` (still prerelease). Don't "fix" the import to the older package.
- Components live at **per-component subpaths** (`@base-ui/react/button`, `@base-ui/react/checkbox`, …); each exposes a `*.Props` namespace type (e.g. `ButtonPrimitive.Props`) and a `render` prop. Extend that `Props` type, not `React.ComponentProps<'button'>` — that's what keeps the typed `render` polymorphism.

## Fonts

Inter is loaded as a single **variable** font via `@import '@fontsource-variable/inter'` at the very top of [src/styles/style.css](src/styles/style.css) (CSS requires `@import` before other rules, so it precedes `@custom-variant`/`@theme`). The `--font-sans` token lists `'Inter Variable'` first. Shipping a real web font keeps rendering identical across OSes — without it, Windows falls back to Segoe UI, whose metrics mis-center text inside fixed-height controls.
