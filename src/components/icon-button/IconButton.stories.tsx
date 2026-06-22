import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleArrowUpIcon, PlusIcon, TrashIcon } from "lucide-react";
import { IconButton } from "./IconButton";

/**
 * `IconButton` is a square icon-only button sharing `Button`'s variants and
 * sizes. Pass a single icon as the child. Set `isRounded` for a full circle.
 * Always provide an `aria-label` for accessibility.
 */
const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "positive", "negative", "transparent"],
    },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    isRounded: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isLoading: { control: "boolean" },
  },
  args: {
    "aria-label": "Upload",
    children: <CircleArrowUpIcon />,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak any prop from the Controls panel. */
export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* Variants                                                                   */
/* -------------------------------------------------------------------------- */

export const Variants: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex items-center gap-small">
      <IconButton {...args} variant="primary" />
      <IconButton {...args} variant="secondary" />
      <IconButton {...args} variant="positive" />
      <IconButton {...args} variant="negative" />
      <IconButton {...args} variant="transparent" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Sizes                                                                      */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex items-center gap-small">
      <IconButton {...args} size="small" />
      <IconButton {...args} size="medium" />
      <IconButton {...args} size="large" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Rounded — full circle                                                      */
/* -------------------------------------------------------------------------- */

/** `isRounded` renders a true circle (square footprint + `rounded-full`). */
export const Rounded: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex items-center gap-small">
      <IconButton {...args} isRounded size="small" variant="primary" />
      <IconButton {...args} isRounded size="medium" variant="primary" />
      <IconButton {...args} isRounded size="large" variant="primary" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  args: { isDisabled: true, variant: "primary" },
};

export const Loading: Story = {
  args: { isLoading: true, variant: "primary" },
};

/** A few common icons. */
export const Icons: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex items-center gap-small">
      <IconButton {...args} aria-label="Add">
        <PlusIcon />
      </IconButton>
      <IconButton {...args} aria-label="Delete" variant="negative">
        <TrashIcon />
      </IconButton>
    </div>
  ),
};
