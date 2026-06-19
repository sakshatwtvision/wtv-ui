import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

/**
 * `Checkbox` is a faithful port of Contentful's Forma 36 checkbox, built on
 * the Base UI `Checkbox` primitive. Use the toolbar to flip Light/Dark and the
 * Forma/Iris brand. Every story maps to an example from the Forma 36 docs.
 */
const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    density: { control: "inline-radio", options: ["low", "high"] },
    isChecked: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isIndeterminate: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isRequired: { control: "boolean" },
    helpText: { control: "text" },
    children: { control: "text" },
  },
  args: {
    children: "Accept terms and conditions",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak any prop from the Controls panel. */
export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export const Unchecked: Story = {
  args: { children: "Unchecked" },
};

export const Checked: Story = {
  args: { defaultChecked: true, children: "Checked" },
};

export const Indeterminate: Story = {
  args: { isIndeterminate: true, children: "Indeterminate" },
};

export const Disabled: Story = {
  args: { isDisabled: true, children: "Disabled" },
};

export const DisabledChecked: Story = {
  args: { isDisabled: true, defaultChecked: true, children: "Disabled checked" },
};

export const Invalid: Story = {
  args: { isInvalid: true, children: "I agree to the terms" },
};

/** All states stacked, matching the Forma docs example. */
export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-col gap-small">
      <Checkbox {...args}>Unchecked</Checkbox>
      <Checkbox {...args} defaultChecked>
        Checked
      </Checkbox>
      <Checkbox {...args} isIndeterminate>
        Indeterminate
      </Checkbox>
      <Checkbox {...args} isDisabled>
        Disabled
      </Checkbox>
      <Checkbox {...args} isDisabled defaultChecked>
        Disabled checked
      </Checkbox>
      <Checkbox {...args} isInvalid>
        Invalid
      </Checkbox>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Help text                                                                  */
/* -------------------------------------------------------------------------- */

export const WithHelpText: Story = {
  args: {
    children: "Subscribe to newsletter",
    helpText: "You can unsubscribe at any time from your account settings.",
  },
};

export const WithHelpTextInvalid: Story = {
  args: {
    isInvalid: true,
    children: "I agree to the terms",
    helpText: "You must accept the terms to continue.",
  },
};

/* -------------------------------------------------------------------------- */
/* Density                                                                    */
/* -------------------------------------------------------------------------- */

/** Both density options stacked for easy comparison. */
export const Density: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-col">
      <Checkbox {...args} density="low">
        Low density
      </Checkbox>
      <Checkbox {...args} density="high">
        High density
      </Checkbox>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Controlled                                                                 */
/* -------------------------------------------------------------------------- */

/** Controlled example — the parent owns the checked state. */
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col gap-small">
        <Checkbox {...args} isChecked={checked} onChange={setChecked}>
          {checked ? "Checked" : "Unchecked"} — click to toggle
        </Checkbox>
        <span className="text-small text-gray-500 dark:text-gray-400">
          State: {String(checked)}
        </span>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/* Group — multiple checkboxes                                                */
/* -------------------------------------------------------------------------- */

/** A realistic checkbox list as used in forms. */
export const Group: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <fieldset className="flex flex-col gap-small border-0 p-0">
      <legend className="mb-small text-medium font-medium text-gray-800 dark:text-gray-100">
        Notify me about
      </legend>
      <Checkbox {...args} name="notify" value="comments" defaultChecked>
        Comments on my posts
      </Checkbox>
      <Checkbox {...args} name="notify" value="mentions">
        Mentions
      </Checkbox>
      <Checkbox {...args} name="notify" value="digest" defaultChecked>
        Weekly digest
      </Checkbox>
      <Checkbox {...args} name="notify" value="marketing" isDisabled>
        Marketing emails (unavailable)
      </Checkbox>
    </fieldset>
  ),
};
