import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExternalLinkIcon, ArrowRightIcon, DownloadIcon, MailIcon } from "lucide-react";
import { TextLink } from "./TextLink";

/**
 * `TextLink` is a faithful port of Contentful's Forma 36 `TextLink`, built on
 * Base UI's `Button` primitive rendered as an `<a>` element. It inherits text
 * size from its surrounding context — no `size` prop needed.
 *
 * Use the toolbar to flip Light/Dark and the Forma/Iris brand.
 */
const meta = {
  title: "Typography/TextLink",
  component: TextLink,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "positive", "negative", "white"],
    },
    alignIcon: { control: "inline-radio", options: ["start", "end"] },
    isDisabled: { control: "boolean" },
    href: { control: "text" },
    target: { control: "text" },
    children: { control: "text" },
  },
  args: {
    href: "#",
    children: "Learn more",
    variant: "primary",
  },
} satisfies Meta<typeof TextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak any prop from the Controls panel. */
export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* Variants                                                                   */
/* -------------------------------------------------------------------------- */

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-small">
      <TextLink href="#" variant="primary">Primary link</TextLink>
      <TextLink href="#" variant="secondary">Secondary link</TextLink>
      <TextLink href="#" variant="positive">Positive link</TextLink>
      <TextLink href="#" variant="negative">Negative link</TextLink>
      <div className="rounded-medium bg-gray-800 p-medium">
        <TextLink href="#" variant="white">White link</TextLink>
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

/** Icon after the label (default `alignIcon="end"`). */
export const WithIconEnd: Story = {
  args: {
    href: "https://example.com",
    target: "_blank",
    children: "Open in new tab",
    icon: <ExternalLinkIcon />,
    alignIcon: "end",
  },
};

/** Icon before the label (`alignIcon="start"`). */
export const WithIconStart: Story = {
  args: {
    href: "#",
    children: "Send email",
    icon: <MailIcon />,
    alignIcon: "start",
  },
};

/** Different icon styles across variants. */
export const IconVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-small">
      <TextLink href="#" variant="primary" icon={<ArrowRightIcon />}>
        Continue reading
      </TextLink>
      <TextLink href="#" variant="secondary" icon={<DownloadIcon />} alignIcon="start">
        Download report
      </TextLink>
      <TextLink href="#" variant="negative" icon={<ExternalLinkIcon />}>
        Delete account
      </TextLink>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  args: { isDisabled: true, children: "Disabled link" },
};

export const DisabledWithIcon: Story = {
  args: {
    isDisabled: true,
    children: "Disabled with icon",
    icon: <ExternalLinkIcon />,
  },
};

/** All variants in their disabled state. */
export const AllDisabled: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-small">
      <TextLink href="#" variant="primary" isDisabled>Primary disabled</TextLink>
      <TextLink href="#" variant="secondary" isDisabled>Secondary disabled</TextLink>
      <TextLink href="#" variant="positive" isDisabled>Positive disabled</TextLink>
      <TextLink href="#" variant="negative" isDisabled>Negative disabled</TextLink>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Button-as-link (no href)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Without an `href`, TextLink renders a `<button>` styled as a link.
 * Use this for SPA navigation handlers or in-page interactions.
 */
export const AsButton: Story = {
  args: {
    href: undefined,
    children: "Open dialog",
    onClick: () => alert("clicked"),
  },
};

/* -------------------------------------------------------------------------- */
/* Inline in text                                                             */
/* -------------------------------------------------------------------------- */

/** The link inherits text size from its parent — no `size` prop needed. */
export const InlineInText: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-medium max-w-prose">
      <p className="text-medium text-gray-800 dark:text-gray-100">
        By continuing, you agree to our{" "}
        <TextLink href="#">Terms of Service</TextLink> and acknowledge that you
        have read our{" "}
        <TextLink href="#" variant="secondary">Privacy Policy</TextLink>.
      </p>
      <p className="text-large text-gray-800 dark:text-gray-100">
        Need help?{" "}
        <TextLink href="#" icon={<MailIcon />} alignIcon="start">
          Contact support
        </TextLink>{" "}
        or visit our{" "}
        <TextLink href="https://example.com" target="_blank" icon={<ExternalLinkIcon />}>
          documentation
        </TextLink>.
      </p>
      <p className="text-small text-gray-500 dark:text-gray-400">
        Version 2.4.1 ·{" "}
        <TextLink href="#" variant="secondary">
          Release notes
        </TextLink>
      </p>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* External link (auto rel)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * When `target="_blank"`, `rel="noopener noreferrer"` is added automatically.
 * Inspect the rendered `<a>` in DevTools to confirm.
 */
export const ExternalLink: Story = {
  args: {
    href: "https://www.contentful.com",
    target: "_blank",
    children: "Contentful website",
    icon: <ExternalLinkIcon />,
  },
};
