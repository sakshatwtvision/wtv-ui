# wtv-ui

A production-grade React component library for WTVision products — built on **Tailwind CSS v4**, **Base UI**, and the **Forma 36** design language. Ships as a private GitHub Package, consumed by any React or Next.js application in the organisation.

**Live Storybook →** https://sakshatwtvision.github.io/wtv-ui

---

## Table of Contents

1. [Why this library exists](#why-this-library-exists)
2. [Component catalogue](#component-catalogue)
3. [Technology stack](#technology-stack)
4. [Consumer guide — installing in your project](#consumer-guide--installing-in-your-project)
   - [Step 1 — get a Personal Access Token](#step-1--get-a-personal-access-token)
   - [Step 2 — configure your project's registry](#step-2--configure-your-projects-registry)
   - [Step 3 — install the package](#step-3--install-the-package)
   - [Step 4 — import and use](#step-4--import-and-use)
   - [Step 5 — authenticate in your CI/CD pipeline](#step-5--authenticate-in-your-cicd-pipeline)
5. [Contributor guide — working on this library](#contributor-guide--working-on-this-library)
   - [Prerequisites](#prerequisites)
   - [Local setup](#local-setup)
   - [Adding a new component](#adding-a-new-component)
   - [Raising a pull request](#raising-a-pull-request)
6. [Release process and versioning](#release-process-and-versioning)
   - [Semantic versioning policy](#semantic-versioning-policy)
   - [How a release works end-to-end](#how-a-release-works-end-to-end)
   - [Rolling back a bad release in production](#rolling-back-a-bad-release-in-production)
7. [Branch protection rules](#branch-protection-rules)
8. [CI/CD pipeline reference](#cicd-pipeline-reference)
9. [Theming and customisation](#theming-and-customisation)
10. [Testing strategy — current state and roadmap](#testing-strategy--current-state-and-roadmap)
11. [Migration to the company organisation](#migration-to-the-company-organisation)

---

## Why this library exists

Consumer applications used to solve the same UI problems independently — inconsistent buttons, mismatched spacing, duplicated dark-mode logic, conflicting CSS. This library eliminates that by providing a **single, versioned source of truth** for every shared UI primitive.

The consequences of *not* having a shared library are real:

- **Visual inconsistency across products** — brand damage that erodes user trust
- **Duplicated effort across teams** — every team reinventing the same Button wastes engineering velocity
- **No single place to fix an accessibility bug** — a WCAG violation in a bespoke component cannot be patched centrally, creating compliance risk

Every component in this library is accessible by default, dark-mode aware, fully typed, and themeable without touching library source code.

---

## Component catalogue

| Component | Description |
|-----------|-------------|
| `Avatar` | User avatar with image and initials fallback |
| `Badge` | Inline status/label indicator with colour variants |
| `Button` | Primary interaction control — solid, outline, transparent variants |
| `CardPanel` | Surface container for grouped content |
| `Carousel` | Horizontally scrollable content rail |
| `Checkbox` | Accessible checkbox with controlled and uncontrolled modes |
| `IconButton` | Icon-only action button |
| `Menu` | Dropdown menu with keyboard navigation |
| `Popover` | Anchored floating panel |
| `Radio` | Radio button for single-selection groups |
| `Separator` | Visual divider — horizontal and vertical |
| `SocialButton` | OAuth/social login action button |
| `Switch` | Toggle control (on/off) |
| `Text` | Typography primitive with size, weight, and variant props |
| `TextInput` | Single-line form input |
| `TextLink` | Accessible anchor element styled to design tokens |
| `Textarea` | Multi-line form input |

Browse every component with live examples, prop tables, and interaction demos at the **[Storybook](https://sakshatwtvision.github.io/wtv-ui)**.

---

## Technology stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 + React Compiler | Automatic memoisation — no manual `useMemo`/`useCallback` |
| Headless primitives | Base UI 1.x | Accessibility and keyboard handling built in, zero styling opinion |
| Styling | Tailwind CSS v4 | Design tokens as CSS custom properties — reskinnable at runtime without a rebuild |
| Build | tsup + Tailwind CLI | Dual ESM/CJS output, pre-compiled CSS, no consumer rebuild required |
| Package manager | pnpm | Strict, fast, workspace-aware — prevents duplicate dependency issues |
| Docs / playground | Storybook 10 | Stories serve as both living documentation and interaction test fixtures |

---

## Consumer guide — installing in your project

This package lives on the **GitHub npm registry** (`npm.pkg.github.com`), not on npmjs.com. Authentication is required even to read it — this is intentional to ensure internal packages remain private to the organisation.

### Step 1 — get a Personal Access Token

> **Why a PAT?** GitHub Packages requires authentication for private packages. Each developer needs their own token tied to their GitHub identity so access can be audited and revoked individually. Never share tokens or commit them to a repository.

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Set a meaningful note: `wtv-ui package access — <your name>`
4. Set expiry to **90 days** and add a calendar reminder to rotate it before it expires
5. Check the following scopes:
   - `repo` — required because the package is hosted on a private repository
   - `read:packages` — to download packages from the registry
6. Click **Generate token** and copy it immediately — it is shown only once

Store the token in your operating system's credential manager or password manager. Never store it in a plain text file.

### Step 2 — configure your project's registry

Create or update `.npmrc` at the **root of your consumer project** and commit it:

```ini
@sakshatwtvision:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

> **Why an environment variable, not the token directly?** The `.npmrc` file is committed to your repository. If the token were hardcoded, it would be exposed in version history and to every developer with read access — a critical security vulnerability. `${GITHUB_PACKAGES_TOKEN}` is read from the environment at install time, keeping the secret out of the codebase entirely.

Set the environment variable in your shell profile so it is always available for local development:

```bash
# Add to ~/.zshrc or ~/.bashrc, then reload your shell (source ~/.zshrc)
export GITHUB_PACKAGES_TOKEN=ghp_your_token_here
```

### Step 3 — install the package

```bash
# pnpm (recommended — matches the library's package manager)
pnpm add @sakshatwtvision/wtv-ui

# npm
npm install @sakshatwtvision/wtv-ui

# yarn
yarn add @sakshatwtvision/wtv-ui
```

### Step 4 — import and use

**Import the CSS exactly once at your app entry point.** This loads the design tokens, Inter Variable font, and all component styles.

```tsx
// React (Vite) — src/main.tsx
import '@sakshatwtvision/wtv-ui/styles';
```

```tsx
// Next.js App Router — app/layout.tsx
import '@sakshatwtvision/wtv-ui/styles';
```

Then import components anywhere in your application:

```tsx
import { Button, Badge, TextInput } from '@sakshatwtvision/wtv-ui';

export function LoginForm() {
  return (
    <div>
      <Badge color="green">New</Badge>
      <TextInput placeholder="Email address" />
      <Button variant="primary" size="medium">Sign in</Button>
    </div>
  );
}
```

**Next.js specifics:** The package ships pre-compiled JavaScript — no raw TypeScript or JSX — so `transpilePackages` is **not required** in `next.config.js`. The ESM bundle already contains `"use client"` at the top of the file, so all components work correctly inside React Server Component trees without additional configuration.

**Dark mode:** The library uses class-based dark mode. Add the `.dark` class to your `<html>` element to activate it — consistent with Tailwind's `darkMode: 'class'` convention. The toggle mechanism (button, system preference listener) is the responsibility of the consuming application.

### Step 5 — authenticate in your CI/CD pipeline

When your application runs `pnpm install` inside a GitHub Actions workflow, the runner has no shell profile — it cannot read your local `GITHUB_PACKAGES_TOKEN`. You need to inject the token as a CI secret.

> **Why a service account token, not a personal token?** If you use your personal PAT as the CI secret and you leave the organisation, your token is revoked and every pipeline that depends on it breaks immediately. A service account (a bot GitHub account) has a token that is independent of any individual's employment status.

**Set up the secret in your consumer repository:**

1. Go to **Settings → Secrets and variables → Actions → New repository secret**
2. Name: `GITHUB_PACKAGES_TOKEN`
3. Value: a PAT (classic) with `read:packages` scope, belonging to a service account

**Reference it in your workflow:**

```yaml
# .github/workflows/ci.yml (in your consumer application)
- name: Install dependencies
  run: pnpm install --frozen-lockfile
  env:
    GITHUB_PACKAGES_TOKEN: ${{ secrets.GITHUB_PACKAGES_TOKEN }}
```

The `.npmrc` you committed in Step 2 reads `${GITHUB_PACKAGES_TOKEN}` from the environment. This single `env:` line is all that is needed — no modification to `.npmrc` between local and CI.

**Vercel / other cloud platforms:** Add `GITHUB_PACKAGES_TOKEN` as a build environment variable in your platform dashboard so the deploy-time install step can authenticate.

---

## Contributor guide — working on this library

### Prerequisites

| Tool | Version | Why |
|------|---------|-----|
| Node.js | 20 LTS or later | Runtime for Vite, tsup, and Storybook |
| pnpm | 11.x | **Only pnpm.** See warning below. |
| Git | 2.x | — |

> **Do not use `npm install` or `yarn install` in this repository.** This repo is pnpm-managed (`pnpm-lock.yaml`). Running `npm install` writes a `package-lock.json` and flattens `node_modules`, producing **two copies of React** in the dependency tree. The symptom is `Invalid hook call` errors at runtime, which are difficult to trace back to their root cause. If this happens: delete `package-lock.json` and run `pnpm install`, then restart the dev server.

### Local setup

```bash
# 1. Clone the repository
git clone https://github.com/sakshatwtvision/wtv-ui.git
cd wtv-ui

# 2. Install dependencies (pnpm only)
pnpm install

# 3. Start the development playground
pnpm dev

# 4. Start Storybook (recommended for component work)
pnpm storybook
```

Available scripts:

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Vite dev server — `App.tsx` showcase/playground |
| `pnpm storybook` | Storybook on port 6006 |
| `pnpm build` | Compile JS + CSS → `dist/` |
| `pnpm lint` | ESLint across all TypeScript files |
| `pnpm exec tsc -b` | Typecheck only (no emit) |
| `pnpm build-storybook` | Build Storybook static site |

### Adding a new component

All components follow the same structural pattern. `Button` is the canonical reference implementation — read `src/components/button/Button.tsx` before building anything new.

```
src/components/
  YourComponent/
    YourComponent.tsx     ← implementation + cva variants
    index.ts              ← barrel: export { YourComponent, type YourComponentProps }
```

**Checklist before raising a PR:**

- [ ] Built on a Base UI primitive — `import { X as XPrimitive } from '@base-ui/react/x'`
- [ ] Variants defined with `class-variance-authority` — the `cva` object is **not exported**
- [ ] Props type is a `type` alias composed with `&`, not an `interface extends`
- [ ] Final className: `cn(xVariants({ ...variants, className }))` so consumer classes always win
- [ ] Boolean props use the `is*` prefix: `isDisabled`, `isLoading`, `isFullWidth`
- [ ] Disabled state uses `enabled:hover:` utilities — no `disabled:hover:` neutralizers
- [ ] Icons from `lucide-react` using `*Icon` named exports, sized with a token utility (`size-4`)
- [ ] Component exported from `src/components/index.ts`
- [ ] `.stories.tsx` file with at minimum: Default, AllVariants, and Disabled stories
- [ ] `pnpm lint` and `pnpm exec tsc -b` both pass with zero errors locally

### Raising a pull request

> **Why a pull request for every change?** Direct pushes to `main` are blocked by branch protection. This is not bureaucracy — it is the mechanism that ensures every change is reviewed, CI-validated, and traceable in the audit log. A PR that merges broken code triggers an immediate broken release that affects every consuming application.

```bash
# 1. Always branch from latest main
git checkout main && git pull
git checkout -b feat/your-component-name

# 2. Make changes. Commit with Conventional Commits messages
git commit -m "feat(badge): add purple colour variant"
git commit -m "fix(button): disabled state not applied when isLoading is true"
git commit -m "docs(avatar): add controlled story example"

# 3. Push and open the PR on GitHub targeting main
git push -u origin feat/your-component-name
```

The `CI` workflow runs automatically on the PR — lint, typecheck, and build must all pass. At least one reviewer approval is required before merging.

**Commit message convention:**

| Prefix | When to use | SemVer impact |
|--------|-------------|---------------|
| `feat:` | New component or new backward-compatible prop | Minor bump |
| `fix:` | Bug fix, no API change | Patch bump |
| `docs:` | Story or README changes only | No bump |
| `chore:` | Tooling, CI, dependency updates | No bump |
| `BREAKING CHANGE:` | Removed prop, renamed export, changed behaviour | Major bump |

> Clear commit messages are not a style preference — they are the audit trail. When a director asks "what changed between the version our app uses and the latest one", the answer lives in `git log` and GitHub Releases, which are generated from commit messages.

---

## Release process and versioning

### Semantic versioning policy

This library follows **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`

| Segment | Increments when | Meaning for consumers |
|---------|-----------------|----------------------|
| **MAJOR** — `2.0.0` | Breaking API change — removed prop, renamed export, changed behaviour | You **must** update your code before upgrading |
| **MINOR** — `1.3.0` | New component or new backward-compatible prop added | Safe to upgrade — existing code continues to work |
| **PATCH** — `1.2.4` | Bug fix, internal refactor, style correction | Safe to upgrade — no API changes whatsoever |

> **Why SemVer matters at the enterprise level.** Consumer applications pin to a specific version (`@sakshatwtvision/wtv-ui@1.2.4`). Without a versioning contract, a library update could silently break a production application on the next deploy. SemVer is the agreement that tells consuming teams exactly how risky an upgrade is before they take it — major upgrades require engineering time, minor upgrades are low risk, patch upgrades should be routine.

### How a release works end-to-end

Releases are **fully automated** — no manual publish commands after initial setup.

```
Developer bumps version in package.json inside a feature branch
                    ↓
      Pull Request reviewed and approved
                    ↓
            Merged to main
                    ↓
      release.yml workflow triggers on push to main
                    ↓
      Reads version from package.json → e.g. "1.3.0"
                    ↓
      Checks: does git tag v1.3.0 already exist?
         YES → skip entirely (safe to merge non-version PRs)
         NO  → continue
                    ↓
    pnpm install → pnpm build → pnpm publish --no-git-checks
                    ↓
      Git tag v1.3.0 created and pushed to origin
                    ↓
    GitHub Release created with auto-generated changelog
                    ↓
  Package visible at github.com/sakshatwtvision/wtv-ui → Packages
```

**To release a new version:**

1. In your feature branch, update `"version"` in `package.json` following SemVer
2. Raise and merge a PR as normal
3. The workflow handles everything — no further action is required

**To verify a release succeeded:**

- Actions tab → green `Release` run
- Repo sidebar → Packages → `@sakshatwtvision/wtv-ui`
- Releases tab → new entry with auto-generated changelog

### Rolling back a bad release in production

> **Why a rollback procedure?** A library bug that reaches production can affect every consuming application simultaneously, because they all share the same package. A fast, documented rollback procedure is not pessimism — it is the operational discipline expected of a shared platform.

**Immediate rollback — fix the consumer in under 5 minutes:**

The fastest path is in the consuming application, not the library. Pin to the last known-good version:

```bash
# In the consuming application
pnpm add @sakshatwtvision/wtv-ui@1.2.3   # the last good version

git commit -m "fix: pin wtv-ui to 1.2.3 — 1.2.4 caused regression in Button"
git push
```

This redeploys the consumer with the previous version. The broken version stays published but no one uses it.

**Follow-up — publish a patch from the library:**

```bash
# Branch from the last good tag — NOT from current main (which has the bad code)
git checkout v1.2.3
git checkout -b hotfix/button-disabled-regression

# Apply the minimal fix
# ...

# Bump to the next patch version
# Edit package.json: "version": "1.2.3" → "1.2.4"

git commit -m "fix(button): correct disabled state regression introduced in 1.2.4"
git push origin hotfix/button-disabled-regression

# Open PR → review → merge → CI publishes 1.2.5 automatically
```

Consuming teams then upgrade from their pinned version to `1.2.5`:

```bash
pnpm add @sakshatwtvision/wtv-ui@1.2.5
```

**What NOT to do:** Never delete or overwrite a published version. GitHub Packages treats published versions as immutable — attempting to republish the same version number results in a `409 Conflict` error and breaks CI. Always increment the version.

---

## Branch protection rules

> **Why enforce branch protection?** Without it, a single mistaken `git push --force` or an unreviewed direct commit to `main` could publish a broken release to every consuming application before anyone notices. Protection rules make `main` a deployment gate, not just a storage location.

Configure at **Settings → Branches → Add rule → Branch name pattern: `main`**:

| Rule | Value | Why |
|------|-------|-----|
| Require a pull request before merging | Enabled | No direct commits to `main` |
| Required approvals | 1 minimum | Peer review catches issues before they ship |
| Dismiss stale reviews on new commits | Enabled | An approval covers exactly the code reviewed — not a later version of it |
| Require status checks to pass | Enabled — select `validate` | Broken code cannot reach `main` |
| Require branches to be up to date before merging | Enabled | Prevents integration failures from diverged branches |
| Do not allow bypassing the above settings | Enabled | Administrators must also follow the rules — no exceptions |
| Automatically delete head branches | Enabled | Keeps the branch list clean post-merge |

---

## CI/CD pipeline reference

Three workflows run automatically. All live in `.github/workflows/`.

### `ci.yml` — Pull Request validation

**Triggers:** Every pull request targeting `main`

**Steps:** install → lint → typecheck → build

**Why it matters:** Acts as the merge gate. A PR cannot merge unless all four steps pass. This guarantees `main` always contains code that lints cleanly, typechecks, and produces a valid build artefact.

### `release.yml` — Publish to GitHub Packages

**Triggers:** Every push (merge) to `main`

**Steps:**
1. Read `version` from `package.json`
2. Check if git tag `v<version>` already exists
3. If tag exists → exit with no action _(idempotent — merging a chore PR does not re-publish)_
4. If tag absent → install → build → publish → create tag → create GitHub Release

**Auth:** Uses the workflow's built-in `GITHUB_TOKEN` with `packages: write` declared in the workflow permissions. No developer PAT is stored as a repository secret for publishing.

### `storybook-pages.yml` — Deploy documentation

**Triggers:** Every push (merge) to `main`

**Steps:** install → `pnpm build-storybook` → deploy to GitHub Pages

**Output:** `https://sakshatwtvision.github.io/wtv-ui` — always reflects the latest state of `main`. No manual deployment is ever needed.

---

## Theming and customisation

The library exposes all design tokens as CSS custom properties. Consumer applications can retheme every component without touching library source code or triggering a rebuild.

**Global reskin (entire application):**

```css
/* your-app/src/global.css */
:root {
  --color-primary-600: #7c3aed;   /* replace blue primary with purple */
  --color-primary-500: #8b5cf6;
  --color-primary-700: #6d28d9;
}

.dark {
  --color-primary-600: #7c3aed;
  --color-primary-500: #8b5cf6;
}
```

**Scoped reskin (multi-brand, section-level):**

```css
[data-brand="iris"] {
  --color-primary-600: #5b50e8;
}
```

This works because Tailwind utilities compile to `var(--color-primary-600)` references, not hardcoded hex values. Consumer CSS is unlayered — it always wins over library tokens, which are in `@layer theme`.

---

## Testing strategy — current state and roadmap

### Current state

The library currently uses **Storybook as living documentation and manual test fixtures**. Every component has stories covering all variants, all interactive states (disabled, loading, error, focused), and both controlled and uncontrolled modes. These are verified visually during development and PR review, and the Storybook site is publicly available for stakeholder review at any time.

This is a deliberate, pragmatic starting point. Manual story coverage at this stage provides high confidence at low overhead.

### Recommended next steps

As consuming teams scale and depend on this library's stability, the following testing layers should be added in priority order.

---

#### Layer 1 — Component unit tests with Vitest + Testing Library

> **Why Vitest over Jest?** Vitest runs inside Vite's pipeline — the same bundler used in development. This means identical module resolution, identical transforms, and dramatically faster runs. There is no separate Jest transform configuration to maintain for TypeScript, Tailwind, or path aliases.

**Install:**

```bash
pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

**`vitest.config.ts`:**

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/components/**/*.tsx'],
      exclude: ['src/components/**/*.stories.tsx'],
      thresholds: {
        lines: 75,
        functions: 75,
        branches: 75,
        statements: 75,
      },
    },
  },
});
```

**`src/test/setup.ts`:**

```ts
import '@testing-library/jest-dom';
```

**Example — `src/components/button/Button.test.tsx`:**

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const handler = vi.fn();
    render(<Button isDisabled onClick={handler}>Click me</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handler).not.toHaveBeenCalled();
  });

  it('exposes aria-busy when loading', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
```

Add to `package.json` scripts:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

---

#### Layer 2 — Interaction tests inside Storybook with `@storybook/test`

> **Why in-browser interaction tests?** Storybook `play` functions simulate real user interactions in an actual browser — click, type, tab, focus. This catches a class of bugs that jsdom cannot: focus trap behaviour in Menus and Popovers, CSS-driven transitions, portal positioning, and anything relying on real layout geometry.

**Install:**

```bash
pnpm add -D @storybook/test @storybook/addon-interactions
```

**Example — Checkbox with a `play` function:**

```tsx
import { expect, userEvent, within } from '@storybook/test';

export const ControlledToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    await expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};
```

Run all story interaction tests headlessly in CI:

```bash
pnpm exec storybook test --ci
```

---

#### Layer 3 — Coverage enforcement in CI

> **Why enforce thresholds in CI, not just locally?** Thresholds that only exist in config files are suggestions. Enforced in CI, they are a hard gate — a PR that drops coverage below the floor cannot merge. This ensures no component ships untested, which matters when that component is used across multiple production applications.

**Target: 75–85% line coverage**

The 75% floor ensures meaningful coverage without demanding tests for trivial render-only paths. The 85% ceiling is deliberate — coverage above 85% often means writing tests to satisfy a metric rather than to find real bugs, which wastes engineering time and produces brittle test suites that break on implementation refactors.

Add to `.github/workflows/ci.yml`:

```yaml
- name: Unit tests with coverage
  run: pnpm test:coverage

- name: Upload coverage report
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/
```

The `thresholds` block in `vitest.config.ts` causes `vitest run --coverage` to exit non-zero if coverage drops below 75% — which fails the CI step and blocks the PR.

---

#### What to test — priority guide by component type

| Component type | High-priority tests |
|---------------|---------------------|
| Interactive (Button, Checkbox, Switch, Radio) | Click activation, keyboard activation (Enter/Space), disabled state blocks interaction, loading state exposes `aria-busy` |
| Form inputs (TextInput, Textarea) | Value binding, `onChange` fires with correct value, error state renders, placeholder visible when empty |
| Disclosure (Menu, Popover) | Opens on trigger, closes on Escape, closes on outside click, focus returns to trigger on close |
| Display only (Badge, Text, Separator) | Renders expected HTML element, correct variant classes applied |
| Compound (Avatar) | Image renders when `src` valid, fallback renders when `src` fails or is absent |

**What not to test:** Do not test class names, DOM structure, or implementation details. Test observable **behaviour** — what a user or assistive technology would experience. Tests tied to implementation details break on refactors and provide false confidence.

---

## Migration to the company organisation

This library is currently hosted under `@sakshatwtvision`. When it moves to the official `@wtvision-labs` organisation:

1. Transfer the GitHub repository (Settings → Danger Zone → Transfer)
2. Update `package.json` → `"name": "@wtvision-labs/wtv-ui"`
3. Update `package.json` → `"repository.url"` to the new repo URL
4. Update consumer `.npmrc` scope: `@wtvision-labs:registry=https://npm.pkg.github.com`
5. Update `GITHUB_PACKAGES_TOKEN` in all consumer CI secrets (same PAT format, same scopes)
6. Bump version and merge — CI publishes under the new scope automatically

No component source code changes are required. Previous versions remain accessible under `@sakshatwtvision` for consumers that have not yet migrated their import paths.

---

## Internal backlog

The following improvements are tracked for future sprints:

1. Add a `muted` semantic colour variant mirroring gray tones (alongside `primary`, `positive`, `negative`, `warning`)
2. Audit all components — none should reference literal colour palette variables; only semantic aliases
3. Standardise `cn()` class ordering: responsive prefixes (`sm:`, `md:`) grouped by property type on separate lines
4. Rename `md:` and `lg:` breakpoints to `medium:` and `large:` to match the spacing token naming convention

---

## Licence

Internal — not for public distribution. All rights reserved by WTVision.
