import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertCircleIcon, SearchIcon } from "lucide-react";
import { TextInput } from "./TextInput";

/**
 * `TextInput` is a faithful port of Contentful's Forma 36 text input, built on
 * the Base UI `Input` primitive. Use the toolbar to flip Light/Dark and the
 * Forma/Iris brand. Every story maps to an example from the Forma 36 docs.
 */
const meta = {
  title: "Form/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    isInvalid: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
    isRequired: { control: "boolean" },
    placeholder: { control: "text" },
    // Non-control props: rendered via specific stories instead.
    icon: { control: false },
    endIcon: { control: false },
  },
  args: {
    placeholder: "Type something…",
    size: "medium",
  },
  // Give the centered input a sensible width to type into.
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak any prop from the Controls panel. */
export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* Sizes — small · medium · large                                             */
/* -------------------------------------------------------------------------- */

export const Small: Story = {
  args: { size: "small", defaultValue: "I'm a small TextInput" },
};

export const Medium: Story = {
  args: { size: "medium", defaultValue: "I'm a medium TextInput" },
};

export const Large: Story = {
  args: { size: "large", defaultValue: "I'm a large TextInput" },
};

/** All sizes stacked, matching the Forma docs example. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-small">
      <TextInput {...args} size="small" defaultValue="I'm a small TextInput" />
      <TextInput {...args} size="medium" defaultValue="I'm a medium TextInput" />
      <TextInput {...args} size="large" defaultValue="I'm a large TextInput" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* States — disabled · invalid · read-only                                    */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  args: { isDisabled: true, defaultValue: "I'm a disabled TextInput" },
};

export const Invalid: Story = {
  args: { isInvalid: true, defaultValue: "I'm an invalid TextInput" },
};

export const ReadOnly: Story = {
  args: { isReadOnly: true, defaultValue: "I'm a read-only TextInput" },
};

/** All three states stacked, matching the Forma docs example. */
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-small">
      <TextInput {...args} isDisabled defaultValue="I'm a disabled TextInput" />
      <TextInput {...args} isInvalid defaultValue="I'm an invalid TextInput" />
      <TextInput {...args} isReadOnly defaultValue="I'm a read-only TextInput" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Icon — leading icon inside the field                                       */
/* -------------------------------------------------------------------------- */

export const WithIcon: Story = {
  args: {
    icon: <SearchIcon />,
    placeholder: "Search for an item",
  },
};

export const WithIconSmall: Story = {
  args: {
    size: "small",
    icon: <SearchIcon />,
    placeholder: "Search for an item",
  },
};

export const WithIconLarge: Story = {
  args: {
    size: "large",
    icon: <SearchIcon />,
    placeholder: "Search for an item",
  },
};

/* -------------------------------------------------------------------------- */
/* End icon — trailing icon inside the field                                  */
/* -------------------------------------------------------------------------- */

export const WithEndIcon: Story = {
  args: {
    endIcon: <AlertCircleIcon />,
    placeholder: "Enter a value",
  },
};

export const WithBothIcons: Story = {
  args: {
    icon: <SearchIcon />,
    endIcon: <AlertCircleIcon />,
    placeholder: "Search…",
  },
};

/* -------------------------------------------------------------------------- */
/* Password — visibility toggle                                                */
/* -------------------------------------------------------------------------- */

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

export const PasswordSmall: Story = {
  args: {
    type: "password",
    size: "small",
    placeholder: "Enter your password",
  },
};

export const PasswordLarge: Story = {
  args: {
    type: "password",
    size: "large",
    placeholder: "Enter your password",
  },
};

export const PasswordDisabled: Story = {
  args: {
    type: "password",
    isDisabled: true,
    defaultValue: "supersecret",
  },
};

/* -------------------------------------------------------------------------- */
/* Extendable — override styles via className                                 */
/* -------------------------------------------------------------------------- */

/** Consumer `className` wins conflicts (tailwind-merge), so this goes pill-shaped. */
export const CustomClassName: Story = {
  args: {
    defaultValue: "Custom className",
    className: "rounded-full px-medium",
  },
};
