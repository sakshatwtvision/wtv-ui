import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea";

/**
 * `Textarea` is the multi-line sibling of `TextInput`, built on the Base UI
 * `Input` primitive rendered as a `<textarea>`. It mirrors `TextInput`'s sizes
 * and states. Use the toolbar to flip Light/Dark and the Forma/Iris brand.
 */
const meta = {
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    isInvalid: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    isRequired: { control: "boolean" },
    rows: { control: { type: "number", min: 1 } },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "Type something…",
    size: "medium",
  },
  // Give the centered textarea a sensible width to type into.
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak any prop from the Controls panel. */
export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* Sizes — small · medium · large                                             */
/* -------------------------------------------------------------------------- */

export const Small: Story = {
  args: { size: "small", defaultValue: "I'm a small Textarea" },
};

export const Medium: Story = {
  args: { size: "medium", defaultValue: "I'm a medium Textarea" },
};

export const Large: Story = {
  args: { size: "large", defaultValue: "I'm a large Textarea" },
};

/** All sizes stacked for comparison. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-small">
      <Textarea {...args} size="small" defaultValue="I'm a small Textarea" />
      <Textarea {...args} size="medium" defaultValue="I'm a medium Textarea" />
      <Textarea {...args} size="large" defaultValue="I'm a large Textarea" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* States — disabled · invalid · read-only                                    */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  args: { isDisabled: true, defaultValue: "I'm a disabled Textarea" },
};

export const Invalid: Story = {
  args: { isInvalid: true, defaultValue: "I'm an invalid Textarea" },
};

export const ReadOnly: Story = {
  args: { isReadOnly: true, defaultValue: "I'm a read-only Textarea" },
};

/** All three states stacked. */
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-small">
      <Textarea {...args} isDisabled defaultValue="I'm a disabled Textarea" />
      <Textarea {...args} isInvalid defaultValue="I'm an invalid Textarea" />
      <Textarea {...args} isReadOnly defaultValue="I'm a read-only Textarea" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Rows — visible line count                                                   */
/* -------------------------------------------------------------------------- */

export const Rows: Story = {
  args: {
    rows: 6,
    placeholder: "A taller textarea with rows={6}",
  },
};

/* -------------------------------------------------------------------------- */
/* Extendable — override styles via className                                  */
/* -------------------------------------------------------------------------- */

/** Consumer `className` wins conflicts (tailwind-merge). */
export const CustomClassName: Story = {
  args: {
    defaultValue: "Custom className",
    className: "rounded-large border-primary-600",
  },
};
