# wtv-ui

A production-grade React component library for WTVision products, built on **Tailwind CSS v4**, **Base UI**, and the **Forma 36** design language. Ships as a private GitHub Package and can be installed in any React or Next.js application in the organisation.

**Live Storybook:** https://sakshatwtvision.github.io/wtv-ui

---

## Table of Contents

1. [Why this library exists](#why-this-library-exists)
2. [Technology stack](#technology-stack)
3. [Consumer guide](#consumer-guide)
   - [Step 1 - get a Personal Access Token](#step-1---get-a-personal-access-token)
   - [Step 2 - configure your project's registry](#step-2---configure-your-projects-registry)
   - [Step 3 - install the package](#step-3---install-the-package)
   - [Step 4 - import and use](#step-4---import-and-use)
   - [Step 5 - authenticate in your CI/CD pipeline](#step-5---authenticate-in-your-cicd-pipeline)
4. [Contributor guide](#contributor-guide)
   - [Prerequisites](#prerequisites)
   - [Local setup](#local-setup)
   - [Adding a new component](#adding-a-new-component)
   - [Raising a pull request](#raising-a-pull-request)
5. [Release process and versioning](#release-process-and-versioning)
   - [Semantic versioning policy](#semantic-versioning-policy)
   - [How a release works end-to-end](#how-a-release-works-end-to-end)
   - [Rolling back a bad release in production](#rolling-back-a-bad-release-in-production)
6. [Branch protection rules](#branch-protection-rules)
7. [CI/CD pipeline reference](#cicd-pipeline-reference)
8. [Theming and customisation](#theming-and-customisation)
9. [Testing strategy](#testing-strategy)
10. [Migration to the company organisation](#migration-to-the-company-organisation)

---

## Why this library exists

Before this library, every product team was solving the same UI problems from scratch. The result was inconsistent buttons across apps, different spacing scales, duplicated dark-mode logic, and no single place to fix a bug that appeared in multiple products.

This library gives every team a shared, versioned set of UI primitives. The practical benefits:

- A bug fixed here is fixed everywhere that uses the library
- Every product looks and feels consistent, which strengthens the brand
- Teams spend less time building common UI and more time on product work
- Accessibility is handled once, centrally, not repeated in every codebase

Every component is accessible by default, dark-mode aware, fully typed in TypeScript, and themeable without touching this library's source code.

---

## Technology stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | React 19 + React Compiler | Automatic memoisation, no manual `useMemo` or `useCallback` |
| Headless primitives | Base UI 1.x | Accessibility and keyboard handling built in, no styling opinions |
| Styling | Tailwind CSS v4 | Design tokens as CSS custom properties, reskinnable at runtime without a rebuild |
| Build | tsup + Tailwind CLI | Dual ESM/CJS output with pre-compiled CSS, no consumer rebuild needed |
| Package manager | pnpm | Strict, fast, and workspace-aware, prevents duplicate dependency issues |
| Docs | Storybook 10 | Stories act as both living documentation and manual test fixtures |

---

## Consumer guide

This package lives on the **GitHub npm registry** (`npm.pkg.github.com`), not on npmjs.com. Authentication is required to install it, even in read-only mode. This keeps internal packages private to the organisation.

### Step 1 - get a Personal Access Token

#### Why you need a PAT

GitHub Packages requires every developer to authenticate with their own token. This means access is tied to a GitHub identity, which can be audited and revoked on an individual basis. Shared tokens or tokens committed to a repository are a security risk and should never be used.

1. Go to **GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)**
2. Click **Generate new token (classic)**
3. Set a note like: `wtv-ui package access - <your name>`
4. Set expiry to **90 days** and add a calendar reminder to rotate it before it expires
5. Select these scopes:
   - `repo` - required because the package is linked to a private repository
   - `read:packages` - to download packages from the registry
6. Click **Generate token** and copy it immediately. It is only shown once.

Store the token in your operating system's credential manager or a password manager. Do not store it in a plain text file.

### Step 2 - configure your project's registry

Create or update `.npmrc` at the root of your consumer project and commit it:

```ini
@sakshatwtvision:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

#### Why use an environment variable instead of the token directly

The `.npmrc` file is committed to your repository. If the token were written directly in the file, it would be exposed in git history and visible to anyone with read access to the repo. Using `${GITHUB_PACKAGES_TOKEN}` means the token is read from the environment at install time. The file itself is safe to commit.

Set the environment variable in your shell profile so it is available locally:

```bash
# Add to ~/.zshrc or ~/.bashrc, then reload your shell
export GITHUB_PACKAGES_TOKEN=ghp_your_token_here
```

### Step 3 - install the package

```bash
# pnpm
pnpm add @sakshatwtvision/wtv-ui

# npm
npm install @sakshatwtvision/wtv-ui

# yarn
yarn add @sakshatwtvision/wtv-ui
```

### Step 4 - import and use

Import the CSS once at your app entry point. This loads the design tokens, Inter Variable font, and all component styles.

```tsx
// React (Vite) - src/main.tsx
import '@sakshatwtvision/wtv-ui/styles';
```

```tsx
// Next.js App Router - app/layout.tsx
import '@sakshatwtvision/wtv-ui/styles';
```

Then import and use components anywhere:

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

**Next.js specifics:** The package ships pre-compiled JavaScript, so `transpilePackages` is not required in `next.config.js`. The ESM bundle already includes `"use client"` at the top, so all components work correctly inside React Server Component trees.

**Dark mode:** The library uses class-based dark mode. Add the `.dark` class to your `<html>` element to activate it. How you toggle that class (a button, a system preference listener) is up to the consuming application.

### Step 5 - authenticate in your CI/CD pipeline

When your application runs `pnpm install` inside a GitHub Actions workflow, the runner has no shell profile and cannot read your local `GITHUB_PACKAGES_TOKEN`. You need to supply the token as a repository secret.

#### Why use a service account, not a personal token

If you use your personal PAT as the CI secret and then leave the organisation, your token is revoked and every pipeline depending on it breaks immediately. A service account is a dedicated GitHub account whose token is independent of any individual's employment. This is standard practice for any CI credential that grants access to shared resources.

**Set up the secret in your consumer repository:**

1. Go to **Settings > Secrets and variables > Actions > New repository secret**
2. Name: `GITHUB_PACKAGES_TOKEN`
3. Value: a classic PAT with `read:packages` scope, from a service account

**Reference it in your workflow:**

```yaml
# .github/workflows/ci.yml (in your consumer application)
- name: Install dependencies
  run: pnpm install --frozen-lockfile
  env:
    GITHUB_PACKAGES_TOKEN: ${{ secrets.GITHUB_PACKAGES_TOKEN }}
```

The `.npmrc` you committed in Step 2 reads `${GITHUB_PACKAGES_TOKEN}` from the environment, so this single `env:` line is enough. No changes to `.npmrc` are needed between local and CI environments.

**Vercel and other platforms:** Add `GITHUB_PACKAGES_TOKEN` as a build environment variable in your platform dashboard so installs during deployment can authenticate.

---

## Contributor guide

### Prerequisites

| Tool | Version | Note |
|------|---------|------|
| Node.js | 20 LTS or later | Runtime for Vite, tsup, and Storybook |
| pnpm | 11.x | Only pnpm. See the warning below. |
| Git | 2.x | |

**Do not run `npm install` or `yarn install` in this repository.** This repo uses pnpm and has a `pnpm-lock.yaml`. Running `npm install` writes a `package-lock.json` and flattens `node_modules`, which creates two copies of React in the tree. The result is `Invalid hook call` errors at runtime that are hard to trace. If this happens, delete `package-lock.json`, run `pnpm install`, and restart the dev server.

### Local setup

```bash
# Clone the repository
git clone https://github.com/sakshatwtvision/wtv-ui.git
cd wtv-ui

# Install dependencies
pnpm install

# Start the development playground
pnpm dev

# Start Storybook (recommended when working on components)
pnpm storybook
```

Available scripts:

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Vite dev server, the App.tsx showcase |
| `pnpm storybook` | Storybook on port 6006 |
| `pnpm build` | Compile JS and CSS into `dist/` |
| `pnpm lint` | ESLint across all TypeScript files |
| `pnpm exec tsc -b` | Typecheck only, no emit |
| `pnpm build-storybook` | Build the Storybook static site |

### Adding a new component

All components follow the same structure. Read `src/components/button/Button.tsx` before building anything new, it is the canonical reference.

```
src/components/
  YourComponent/
    YourComponent.tsx     - implementation and cva variants
    index.ts              - barrel: export { YourComponent, type YourComponentProps }
```

**Checklist before raising a PR:**

- [ ] Built on a Base UI primitive: `import { X as XPrimitive } from '@base-ui/react/x'`
- [ ] Variants defined with `class-variance-authority`, the `cva` object is not exported
- [ ] Props type is a `type` alias composed with `&`, not an `interface extends`
- [ ] Final className is `cn(xVariants({ ...variants, className }))` so consumer classes always win
- [ ] Boolean props use the `is*` prefix: `isDisabled`, `isLoading`, `isFullWidth`
- [ ] Disabled state uses `enabled:hover:` utilities, not `disabled:hover:` neutralizers
- [ ] Icons from `lucide-react` using `*Icon` exports, sized with a token utility like `size-4`
- [ ] Component exported from `src/components/index.ts`
- [ ] A `.stories.tsx` file exists with at minimum: Default, AllVariants, and Disabled stories
- [ ] `pnpm lint` and `pnpm exec tsc -b` both pass with zero errors

### Raising a pull request

#### Why every change needs a pull request

Direct pushes to `main` are blocked by branch protection rules. This is not process for the sake of process. It is what ensures every change is reviewed, passes CI, and is traceable in the audit log. A change that merges broken code will immediately trigger a broken release that affects every team consuming this library.

```bash
# Always branch from latest main
git checkout main && git pull
git checkout -b feat/your-component-name

# Make changes. Use Conventional Commits for messages
git commit -m "feat(badge): add purple colour variant"
git commit -m "fix(button): disabled state not applied when isLoading is true"
git commit -m "docs(avatar): add controlled story example"

# Push and open the PR targeting main
git push -u origin feat/your-component-name
```

The CI workflow runs automatically on every PR. Lint, typecheck, and build must all pass. At least one reviewer approval is required before merging.

**Commit message convention:**

| Prefix | When to use | Version impact |
|--------|-------------|----------------|
| `feat:` | New component or new backward-compatible prop | Minor bump |
| `fix:` | Bug fix with no API change | Patch bump |
| `docs:` | Story or README changes only | No bump |
| `chore:` | Tooling, CI, dependency updates | No bump |
| `BREAKING CHANGE:` | Removed prop, renamed export, changed behaviour | Major bump |

#### Why commit messages matter

Commit messages are the audit trail. When a team asks what changed between the version they are running and the latest one, the answer comes from `git log` and GitHub Releases, which are generated directly from commit messages. Vague messages like "fix stuff" make it impossible to assess upgrade risk.

---

## Release process and versioning

### Semantic versioning policy

This library follows **Semantic Versioning**: `MAJOR.MINOR.PATCH`

| Segment | When it changes | What it means for your app |
|---------|-----------------|---------------------------|
| **MAJOR** (`2.0.0`) | Breaking change: removed prop, renamed export, changed behaviour | You must update your code before upgrading |
| **MINOR** (`1.3.0`) | New component or new backward-compatible prop | Safe to upgrade, existing code keeps working |
| **PATCH** (`1.2.4`) | Bug fix, internal refactor, style correction | Safe to upgrade, no API changes |

#### Why SemVer matters

Your application pins to a specific version of this library. Without a clear versioning contract, any library update could silently break your app on the next deploy. SemVer is the agreement that tells you exactly how risky an upgrade is before you take it. Major upgrades need engineering time. Minor and patch upgrades are generally safe to absorb quickly.

### How a release works end-to-end

Releases are fully automated. There are no manual publish steps once the workflow is in place.

```
Developer bumps version in package.json inside a feature branch
                    ↓
      Pull Request reviewed and approved
                    ↓
            Merged to main
                    ↓
      release.yml triggers on push to main
                    ↓
      Reads version from package.json
                    ↓
      Checks: does git tag v<version> already exist?
         YES - skip, nothing to do
         NO  - continue
                    ↓
    pnpm install -> pnpm build -> pnpm publish
                    ↓
      Git tag created and pushed
                    ↓
    GitHub Release created with auto-generated notes
                    ↓
  Package visible under the repo's Packages tab
```

**To cut a new release:**

1. Bump `"version"` in `package.json` inside your feature branch, following SemVer
2. Raise and merge a PR as normal
3. The workflow handles everything else

**To verify a release succeeded:**

- Actions tab: look for a green `Release` run
- Repo sidebar: Packages section shows the new version
- Releases tab: new entry with auto-generated changelog

### Rolling back a bad release in production

#### Why you need a rollback plan

A bug in this library can affect every consuming application at once because they all share the same package. The ability to roll back quickly is not optional, it is a baseline operational requirement for any shared platform component.

**Fastest fix: pin the consumer to the last good version**

This takes under 5 minutes and does not require a library change.

```bash
# In the consuming application
pnpm add @sakshatwtvision/wtv-ui@1.2.3

git commit -m "fix: pin wtv-ui to 1.2.3, version 1.2.4 caused regression in Button"
git push
```

The consumer redeploys with the previous version. The broken version stays published but no application is using it.

**Follow-up: publish a patch from the library**

Branch from the last good tag, not from `main`, which contains the bad code.

```bash
git checkout v1.2.3
git checkout -b hotfix/button-disabled-regression

# Apply the fix, then bump the version
# Edit package.json: "1.2.3" -> "1.2.5"

git commit -m "fix(button): correct disabled state regression"
git push origin hotfix/button-disabled-regression

# Open PR, review, merge. CI publishes 1.2.5 automatically.
```

Teams then upgrade from their pinned version:

```bash
pnpm add @sakshatwtvision/wtv-ui@1.2.5
```

**Important:** Never delete or overwrite a published version. GitHub Packages treats published versions as immutable. Attempting to republish the same version number returns a `409 Conflict` error and breaks CI. Always increment the version.

---

## Branch protection rules

#### Why branch protection matters

Without protection, a single force push or a direct commit to `main` could publish a broken release before anyone sees it. Branch protection makes `main` a deployment gate. Nothing reaches it without review and passing CI.

Configure at **Settings > Branches > Add rule > Branch name pattern: `main`**:

| Rule | Value | Why |
|------|-------|-----|
| Require a pull request before merging | Enabled | No direct commits to `main` |
| Required approvals | 1 minimum | A second set of eyes catches issues before they ship |
| Dismiss stale reviews when new commits are pushed | Enabled | An approval is for specific code, not for whatever gets added afterward |
| Require status checks to pass | Enabled, select `validate` | Broken code cannot reach `main` |
| Require branches to be up to date | Enabled | Prevents issues from branches that have diverged from `main` |
| Do not allow bypassing the above settings | Enabled | Admins follow the same rules as everyone else |
| Automatically delete head branches | Enabled | Keeps the branch list clean after merging |

---

## CI/CD pipeline reference

Three workflows run automatically. They all live in `.github/workflows/`.

### `ci.yml`

**Triggers:** Every pull request targeting `main`

**Steps:** install, lint, typecheck, build

This is the merge gate. A PR cannot be merged until all four steps pass. It guarantees that `main` always contains code that lints cleanly, typechecks, and builds successfully.

### `release.yml`

**Triggers:** Every push to `main` (i.e. every merge)

**Steps:**
1. Read `version` from `package.json`
2. Check whether the git tag `v<version>` already exists
3. If it exists, exit with no action (merging docs or chore PRs does not trigger a publish)
4. If it does not exist, install, build, publish, create the git tag, and create a GitHub Release

Auth is handled by the built-in `GITHUB_TOKEN` with `packages: write` permission. No developer PAT is needed as a repository secret for publishing.

### `storybook.yml`

**Triggers:** Every push to `main`

**Steps:** install, build Storybook, deploy to GitHub Pages

The Storybook site at `https://sakshatwtvision.github.io/wtv-ui` always reflects the current state of `main`. No manual deployment is ever needed.

---

## Theming and customisation

All design tokens are CSS custom properties. Consumer applications can retheme every component without modifying library code or running a rebuild.

**Global reskin:**

```css
/* your-app/src/global.css */
:root {
  --color-primary-600: #7c3aed;
  --color-primary-500: #8b5cf6;
  --color-primary-700: #6d28d9;
}

.dark {
  --color-primary-600: #7c3aed;
  --color-primary-500: #8b5cf6;
}
```

**Scoped reskin for a specific section or brand:**

```css
[data-brand="iris"] {
  --color-primary-600: #5b50e8;
}
```

This works because Tailwind utilities compile to `var(--color-primary-600)` references rather than hardcoded hex values. Consumer CSS is unlayered and always wins over library tokens, which live in `@layer theme`.

---

## Testing strategy

### Current state

The library currently uses Storybook as living documentation and manual test fixtures. Every component has stories covering all variants and interactive states (disabled, loading, error, focused) in both controlled and uncontrolled modes. These are reviewed visually during development and PR review, and the Storybook site is publicly available for stakeholder review.

This is a deliberate starting point. Story coverage provides good confidence at low overhead for a library at this stage.

### Recommended next steps

The following testing layers should be added as the library and its consumer base grows.

---

#### Layer 1 - Component unit tests with Vitest and Testing Library

##### Why Vitest instead of Jest

Vitest runs inside Vite's pipeline, the same bundler used in development. This means identical module resolution, identical transforms, and significantly faster test runs. There is no separate Jest config to maintain for TypeScript, Tailwind, or path aliases.

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

**Example test (`src/components/button/Button.test.tsx`):**

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

Add to `package.json`:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

---

#### Layer 2 - Interaction tests inside Storybook

##### Why in-browser interaction tests

Storybook `play` functions simulate real user interactions in a real browser, not jsdom. This catches bugs that unit tests miss: focus traps in Menus and Popovers, CSS-driven transitions, portal positioning, and anything that depends on actual layout geometry.

**Install:**

```bash
pnpm add -D @storybook/test @storybook/addon-interactions
```

**Example (`Checkbox.stories.tsx`):**

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

Run interaction tests headlessly in CI:

```bash
pnpm exec storybook test --ci
```

---

#### Layer 3 - Coverage enforcement in CI

##### Why enforce thresholds in CI

A coverage threshold that only lives in a config file is a suggestion. Enforcing it in CI makes it a hard gate: a PR that drops coverage below the minimum cannot be merged. This ensures no component ships untested, which matters when that component is in use across multiple production apps.

**Target: 75-85% line coverage**

The 75% floor means tests cover real code paths, not just the happy path. The 85% ceiling is intentional. Going above it usually means writing tests to chase a number rather than to catch actual bugs, which produces brittle test suites and slows development without improving quality.

Add to `ci.yml`:

```yaml
- name: Unit tests with coverage
  run: pnpm test:coverage

- name: Upload coverage report
  uses: actions/upload-artifact@v4
  with:
    name: coverage-report
    path: coverage/
```

The `thresholds` block in `vitest.config.ts` causes the coverage command to exit with a non-zero code if coverage falls below 75%, which fails the CI step and blocks the PR.

---

#### What to test, by component type

| Type | Focus areas |
|------|-------------|
| Interactive (Button, Checkbox, Switch, Radio) | Click and keyboard activation, disabled state blocks interaction, loading state sets `aria-busy` |
| Form inputs (TextInput, Textarea) | Value binding, `onChange` fires correctly, error state renders, placeholder visible when empty |
| Disclosure (Menu, Popover) | Opens on trigger, closes on Escape, closes on outside click, focus returns to trigger |
| Display only (Badge, Text, Separator) | Renders the right HTML element, correct variant applied |
| Compound (Avatar) | Image renders when `src` is valid, fallback renders when `src` fails or is absent |

Test observable behaviour, not implementation details. Do not assert on class names or DOM structure. If a test breaks because you renamed a CSS class but the component still works correctly, the test was testing the wrong thing.

---

## Migration to the company organisation

This library currently lives under `@sakshatwtvision`. When it moves to the official `@wtvision-labs` organisation:

1. Transfer the repository on GitHub (Settings > Danger Zone > Transfer)
2. Update `package.json`: rename to `@wtvision-labs/wtv-ui` and update `repository.url`
3. Update the `.npmrc` scope in all consumer projects: `@wtvision-labs:registry=https://npm.pkg.github.com`
4. Update `GITHUB_PACKAGES_TOKEN` secrets in consumer CI pipelines (same token format, same scopes)
5. Bump the version and merge, CI publishes under the new scope automatically

No component code changes are needed. Previous versions remain accessible under `@sakshatwtvision` for teams that have not yet updated their import paths.

---

## Internal backlog

1. Add a `muted` semantic colour variant that mirrors the gray tones, alongside `primary`, `positive`, `negative`, and `warning`
2. Audit all components to ensure none reference literal palette variables directly, only semantic aliases
3. Standardise `cn()` class ordering so responsive prefixes are grouped consistently
4. Rename `md:` and `lg:` breakpoints to `medium:` and `large:` to match the spacing token naming convention

---

## Licence

Internal. Not for public distribution. All rights reserved by WTVision.
