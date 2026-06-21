# Deploy Plan: Publish `wtv-ui` as a private GitHub Package + host Storybook

## Context

`wtv-ui` is a React component library (Tailwind v4 + Base UI, pnpm-managed). The
company does **not** want it on the public npm registry — it should ship as a
**private GitHub Package**, scoped to the company GitHub org, installable in
consumer React and Next.js apps. New versions should publish automatically via a
**GitHub Actions release on merge to `main`** (tag-based), and the Storybook
static site should be hostable (containerized to `ghcr.io`, with GitHub Pages as
a simpler alternative).

The repo is currently publish-ready in shape: `tsup` + Tailwind CLI emit
`dist/`, `files: ["dist"]`, `exports`/`main`/`module`/`types` are all set, and
`"use client"` is injected into the ESM bundle. The gaps are: the package is
**unscoped** (GitHub Packages requires `@org/name`), and there is **no
`.npmrc`, no `.github/workflows`, and no `Dockerfile`**.

> Note: package is currently under the personal company account
> `sakshatwtvision`. It will move to the real company org later — see Part E.

---

## Background: what are GitHub Packages?

GitHub Packages is a package registry hosted by GitHub, alongside your repos. It
hosts several registry types — the two relevant here:

- **npm registry** (`https://npm.pkg.github.com`) — hosts npm packages. This is
  what `wtv-ui` becomes: a normal npm package (a tarball of `dist/` + manifest),
  just served from GitHub instead of npmjs.com.
- **Container registry** (`ghcr.io`) — hosts Docker/OCI images. We'll use this
  to host the Storybook site as a container image.

Key facts that drive this plan:

- **Packages on the GitHub npm registry MUST be scoped**, and the scope must
  equal the owner's login: `@sakshatwtvision/wtv-ui` (org login, case-sensitive).
- **Private by default**: a package published from a private repo is private. It
  inherits access from the repo/org — only members with access can install it.
- **Auth is always required**, even to *read* a private package. Consumers need a
  Personal Access Token (PAT) with `read:packages`. CI uses the built-in
  `GITHUB_TOKEN`.

---

## Part A — Make the package publishable (one-time repo changes)

### A1. Scope the package — `package.json`

```jsonc
{
  "name": "@sakshatwtvision/wtv-ui",   // was "wtv-ui" — must match org login
  "version": "1.0.2",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sakshatwtvision/wtv-ui.git"
  },
  // ...existing exports/main/module/types/files unchanged
}
```

- `publishConfig.registry` points `pnpm publish` at GitHub instead of npmjs.com.
- `repository.url` is what links the published package to the repo in the GitHub
  UI (so it shows under the repo's "Packages").

### A2. Local publish sanity-check path (optional, before wiring CI)

To publish once by hand to verify (uses a PAT with `write:packages`):

```bash
# one-off, local — NEVER commit a token
echo "@sakshatwtvision:registry=https://npm.pkg.github.com" >> ~/.npmrc
echo "//npm.pkg.github.com/:_authToken=YOUR_PAT_WITH_write:packages" >> ~/.npmrc
pnpm build
pnpm publish --no-git-checks
```

> This is only to confirm the package resolves before CI exists. The real flow is
> the GitHub Action in Part C.

---

## Part B — Consuming the private package (React + Next.js)

Same for both frameworks — the consuming **project** needs registry routing +
auth. Two files in the consumer repo:

### B1. Consumer `.npmrc` (committed, no secret)

```ini
@sakshatwtvision:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

The `${GITHUB_PACKAGES_TOKEN}` is read from the environment, so no secret is
committed. Each developer / CI sets that env var to a PAT (classic) with
`read:packages` scope, and (for SSO orgs) the token must be **SSO-authorized**
for the org.

```bash
export GITHUB_PACKAGES_TOKEN=ghp_xxx   # in shell profile or CI secret
```

### B2. Install

```bash
pnpm add @sakshatwtvision/wtv-ui        # or npm i / yarn add
```

### B3. Use it

```tsx
import { Button } from "@sakshatwtvision/wtv-ui";
import "@sakshatwtvision/wtv-ui/styles";   // the compiled Tailwind CSS
```

- **React (Vite/CRA):** works as-is. Import the CSS once at app entry.
- **Next.js (App Router):** import `"@sakshatwtvision/wtv-ui/styles"` in
  `app/layout.tsx`. The package already injects `"use client"` into its ESM
  build, so client components work in RSC. Because we ship **pre-compiled** JS in
  `dist/`, `transpilePackages` is **not** required. If a future change ships raw
  TS/JSX instead, add `transpilePackages: ['@sakshatwtvision/wtv-ui']` to
  `next.config.js`.
- **Consumer CI** (Vercel/GitHub Actions/etc.): set `GITHUB_PACKAGES_TOKEN` as a
  build env var/secret so installs authenticate.

---

## Part C — Auto-publish on merge to `main` (tag-based release)

**Flow:** bump `version` in `package.json` in your PR → merge to `main` → the
Action tags `v<version>`, creates a GitHub Release, and publishes to GitHub
Packages. If `v<version>` already exists, it no-ops (no double publish). This is
both "tag-based" and "on every merge to main".

### C1. `.github/workflows/release.yml`

```yaml
name: Release

on:
  push:
    branches: [main]

permissions:
  contents: write   # create tags + releases
  packages: write   # publish to GitHub Packages

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }

      - name: Read version
        id: pkg
        run: echo "version=$(node -p "require('./package.json').version")" >> "$GITHUB_OUTPUT"

      - name: Skip if tag already exists
        id: check
        run: |
          if git rev-parse "v${{ steps.pkg.outputs.version }}" >/dev/null 2>&1; then
            echo "exists=true" >> "$GITHUB_OUTPUT"
          else
            echo "exists=false" >> "$GITHUB_OUTPUT"
          fi

      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        if: steps.check.outputs.exists == 'false'
        with:
          node-version: 22
          registry-url: https://npm.pkg.github.com   # writes the publish .npmrc
          cache: pnpm

      - if: steps.check.outputs.exists == 'false'
        run: pnpm install --frozen-lockfile

      - if: steps.check.outputs.exists == 'false'
        run: pnpm build

      - name: Publish
        if: steps.check.outputs.exists == 'false'
        run: pnpm publish --no-git-checks
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Tag + GitHub Release
        if: steps.check.outputs.exists == 'false'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git tag "v${{ steps.pkg.outputs.version }}"
          git push origin "v${{ steps.pkg.outputs.version }}"
          gh release create "v${{ steps.pkg.outputs.version }}" --generate-notes
```

- `setup-node` with `registry-url` generates the authenticated `.npmrc` in CI, so
  `pnpm publish` just works with `NODE_AUTH_TOKEN`.
- The built-in `GITHUB_TOKEN` already has `packages: write` for this repo's org —
  no PAT needed in CI.

### C2. Optional PR validation — `.github/workflows/ci.yml`

Lint + build (+ typecheck) on every PR so broken versions never reach `main`:
`pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm exec tsc -b` → `pnpm build`.

---

## Part D — Host the Storybook static site

`pnpm build-storybook` already emits `storybook-static/`. Two options:

### D1. (Recommended, uses Docker) Container image on `ghcr.io`

`Dockerfile` — multi-stage: build Storybook, serve with nginx.

```dockerfile
FROM node:22-slim AS build
RUN corepack enable
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build-storybook

FROM nginx:alpine
COPY --from=build /app/storybook-static /usr/share/nginx/html
EXPOSE 80
```

`.github/workflows/storybook-image.yml` — build & push to `ghcr.io` on merge to
`main`:

```yaml
name: Storybook image
on:
  push: { branches: [main] }
permissions:
  contents: read
  packages: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ghcr.io/sakshatwtvision/wtv-ui-storybook:latest
```

Then deploy `ghcr.io/sakshatwtvision/wtv-ui-storybook:latest` anywhere (internal
k8s, a VM, Cloud Run, etc.). Private by default; pull requires `read:packages`.

### D2. (Simpler alternative) GitHub Pages

A workflow runs `pnpm build-storybook` and deploys `storybook-static` via
`actions/deploy-pages`. **Caveat:** for a **private** repo, Pages requires a paid
plan, and *access-controlled* (private-audience) Pages requires **GitHub
Enterprise Cloud** — otherwise the Pages site is publicly viewable even though
the repo is private. Use D1 if the docs must stay private.

---

## Part E — Migrating to the real company org later

When the package moves from `sakshatwtvision` to the real org `@neworg`:

1. Transfer the repo to the org (Settings → Transfer), or add the org remote and
   push.
2. Rename `name` → `@neworg/wtv-ui` and update `repository.url` in `package.json`.
3. Update the scope line in the consumer `.npmrc` (`@neworg:registry=...`).
4. Update the image tag in `storybook-image.yml` (`ghcr.io/neworg/...`).
5. Bump version + merge — CI publishes under the new scope. (Old scoped versions
   stay where they are; consumers switch import paths to `@neworg/wtv-ui`.)

No code/component changes are required for the move.

---

## Files to create / modify

| File | Change |
|------|--------|
| `package.json` | Scope name → `@sakshatwtvision/wtv-ui`; add `publishConfig`, `repository` |
| `.github/workflows/release.yml` | **new** — tag-based publish on merge to `main` |
| `.github/workflows/ci.yml` | **new (optional)** — lint/typecheck/build on PRs |
| `Dockerfile` | **new** — build Storybook, serve via nginx |
| `.github/workflows/storybook-image.yml` | **new** — build & push image to `ghcr.io` |
| `README.md` | Add install/auth instructions for consumers |
| consumer repos | `.npmrc` (registry + token env) — documented, not in this repo |

---

## Verification

1. **Local publish dry run:** `pnpm build && pnpm publish --no-git-checks
   --dry-run` — confirm the tarball contains `dist/` and the scoped name.
2. **First real publish:** bump version, merge to `main`, confirm the Action
   publishes and the package appears under the repo's *Packages* + a `v<version>`
   release/tag exists.
3. **Consume from a scratch app:** in a fresh Vite React app and a fresh Next.js
   app, add the `.npmrc` + `GITHUB_PACKAGES_TOKEN`, `pnpm add
   @sakshatwtvision/wtv-ui`, render a `<Button>`, import the `/styles` CSS, and
   confirm it builds and renders.
4. **Storybook image:** confirm the image builds and pushes to `ghcr.io`, then
   `docker run -p 8080:80 ghcr.io/sakshatwtvision/wtv-ui-storybook:latest` and
   load `localhost:8080`.
