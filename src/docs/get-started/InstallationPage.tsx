import * as React from "react";
import {
  Code,
  CodeBlock,
  DocHeader,
  DocPage,
  DocSection,
  DocText,
} from "../doc-ui";

/* ------------------------------------------------------------------ *
 * Code snippets
 * ------------------------------------------------------------------ */

const NPMRC = `@sakshatwtvision:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_PACKAGES_TOKEN}`;

const SHELL_EXPORT = `# Add to ~/.zshrc or ~/.bashrc, then reload your shell
export GITHUB_PACKAGES_TOKEN=ghp_your_token_here`;

const INSTALL = `# pnpm
pnpm add @sakshatwtvision/wtv-ui

# npm
npm install @sakshatwtvision/wtv-ui

# yarn
yarn add @sakshatwtvision/wtv-ui`;

const CSS_VITE = `// React (Vite) — src/main.tsx
import '@sakshatwtvision/wtv-ui/styles';`;

const CSS_NEXTJS = `// Next.js App Router — app/layout.tsx
import '@sakshatwtvision/wtv-ui/styles';`;

const USAGE = `import { Button, Badge, TextInput } from '@sakshatwtvision/wtv-ui';

export function LoginForm() {
  return (
    <div>
      <Badge color="green">New</Badge>
      <TextInput placeholder="Email address" />
      <Button variant="primary" size="medium">Sign in</Button>
    </div>
  );
}`;

const CI_WORKFLOW = `# .github/workflows/ci.yml (in your consumer application)
- name: Install dependencies
  run: pnpm install --frozen-lockfile
  env:
    GITHUB_PACKAGES_TOKEN: \${{ secrets.GITHUB_PACKAGES_TOKEN }}`;

/* ------------------------------------------------------------------ *
 * Sub-components
 * ------------------------------------------------------------------ */

function StepList({ children }: { children: React.ReactNode }) {
  return (
    <ol className="mt-medium space-y-small pl-large text-base leading-relaxed text-gray-600 dark:text-gray-300 [counter-reset:step] list-none">
      {children}
    </ol>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-small [counter-increment:step] before:absolute before:-left-5 before:font-semibold before:text-primary-600 before:content-[counter(step)'.'] dark:before:text-primary-400">
      {children}
    </li>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-medium rounded-medium border border-warning-200 bg-warning-50 px-large py-medium text-small text-warning-800 dark:border-warning-800 dark:bg-warning-950 dark:text-warning-300">
      {children}
    </div>
  );
}

function InfoCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-medium rounded-medium border border-primary-200 bg-primary-50 px-large py-medium text-small text-primary-800 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Page
 * ------------------------------------------------------------------ */

export function InstallationPage() {
  return (
    <DocPage>
      <DocHeader
        title="Installation"
        lead="How to install wtv-ui in your React or Next.js application."
      />

      <DocText>
        This package is hosted on the{" "}
        <strong>GitHub npm registry</strong> (
        <Code>npm.pkg.github.com</Code>), not on npmjs.com. Every developer
        and CI runner needs to authenticate before installing — even to read
        the package. The steps below walk through the one-time setup.
      </DocText>

      {/* Step 1 */}
      <DocSection title="Step 1 — Get a Personal Access Token">
        <DocText>
          GitHub Packages requires each developer to authenticate with their
          own token. This ties access to a GitHub identity so it can be audited
          and revoked on a per-person basis.
        </DocText>

        <StepList>
          <Step>
            Go to{" "}
            <strong>
              GitHub &rarr; Settings &rarr; Developer settings &rarr; Personal
              access tokens &rarr; Tokens (classic)
            </strong>
          </Step>
          <Step>Click <strong>Generate new token (classic)</strong></Step>
          <Step>
            Set a note like:{" "}
            <Code>wtv-ui package access — your name</Code>
          </Step>
          <Step>
            Set expiry to <strong>90 days</strong> and add a calendar reminder
            to rotate it before it expires
          </Step>
          <Step>
            Select these scopes:
            <ul className="mt-x-small list-disc space-y-x-small pl-large">
              <li>
                <Code>repo</Code> — required because the package is linked to a
                private repository
              </li>
              <li>
                <Code>read:packages</Code> — to download packages from the
                registry
              </li>
            </ul>
          </Step>
          <Step>
            Click <strong>Generate token</strong> and copy it immediately — it
            is only shown once
          </Step>
        </StepList>

        <Callout>
          Store the token in your operating system&apos;s credential manager or
          a password manager. Never store it in a plain text file and never
          commit it to a repository.
        </Callout>
      </DocSection>

      {/* Step 2 */}
      <DocSection title="Step 2 — Configure your project's registry">
        <DocText>
          Create or update <Code>.npmrc</Code> at the root of your consumer
          project and commit it. This tells your package manager where to find
          the <Code>@sakshatwtvision</Code> scope.
        </DocText>

        <CodeBlock code={NPMRC} lang="ini" />

        <InfoCallout>
          <strong>Why an environment variable?</strong> The{" "}
          <Code>.npmrc</Code> file is committed to your repo. If the token were
          written directly, it would be visible in git history and to anyone
          with read access. <Code>{"${GITHUB_PACKAGES_TOKEN}"}</Code> is read
          from the environment at install time — the file itself is safe to
          commit.
        </InfoCallout>

        <DocText>
          Set the variable in your shell profile for local development:
        </DocText>
        <CodeBlock code={SHELL_EXPORT} lang="bash" />
      </DocSection>

      {/* Step 3 */}
      <DocSection title="Step 3 — Install the package">
        <CodeBlock code={INSTALL} lang="bash" />
      </DocSection>

      {/* Step 4 */}
      <DocSection title="Step 4 — Import and use">
        <DocText>
          Import the CSS once at your app entry point. This loads the design
          tokens, Inter Variable font, and all component styles.
        </DocText>

        <CodeBlock code={CSS_VITE} />
        <CodeBlock code={CSS_NEXTJS} />

        <DocText>Then import components anywhere in your application:</DocText>
        <CodeBlock code={USAGE} />

        <InfoCallout>
          <strong>Next.js:</strong> The package ships pre-compiled JavaScript
          so <Code>transpilePackages</Code> is not needed. The ESM bundle
          already includes <Code>&quot;use client&quot;</Code> so all
          components work inside React Server Component trees without extra
          config.
        </InfoCallout>
      </DocSection>

      {/* Step 5 */}
      <DocSection title="Step 5 — Authenticate in your CI/CD pipeline">
        <DocText>
          CI runners have no shell profile and cannot read your local{" "}
          <Code>GITHUB_PACKAGES_TOKEN</Code>. You need to supply the token as a
          repository secret so the install step can authenticate.
        </DocText>

        <StepList>
          <Step>
            Go to{" "}
            <strong>
              Settings &rarr; Secrets and variables &rarr; Actions &rarr; New
              repository secret
            </strong>{" "}
            in your consumer repository
          </Step>
          <Step>
            Name: <Code>GITHUB_PACKAGES_TOKEN</Code>
          </Step>
          <Step>
            Value: a classic PAT with <Code>read:packages</Code> scope,
            belonging to a <strong>service account</strong> (not a personal
            developer account — if the developer leaves, their token is revoked
            and CI breaks)
          </Step>
        </StepList>

        <DocText>Reference it in your workflow:</DocText>
        <CodeBlock code={CI_WORKFLOW} lang="yaml" />

        <DocText>
          The <Code>.npmrc</Code> you committed in Step 2 reads{" "}
          <Code>{"${GITHUB_PACKAGES_TOKEN}"}</Code> from the environment, so
          this single <Code>env:</Code> line is all that is needed — no changes
          to <Code>.npmrc</Code> between local and CI.
        </DocText>

        <InfoCallout>
          <strong>Vercel and other platforms:</strong> Add{" "}
          <Code>GITHUB_PACKAGES_TOKEN</Code> as a build environment variable in
          your platform dashboard so deploy-time installs can also authenticate.
        </InfoCallout>
      </DocSection>
    </DocPage>
  );
}
