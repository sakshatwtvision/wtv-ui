import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./Radio";
import { RadioGroup } from "./RadioGroup";

/**
 * `Radio` and `RadioGroup` are faithful ports of Contentful's Forma 36 radio
 * controls, built on Base UI's `Radio` and `RadioGroup` primitives. Individual
 * `Radio` items live inside a `RadioGroup` which manages the selected value.
 * Use the toolbar to flip Light/Dark and the Forma/Iris brand.
 */
const meta = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    density: { control: "inline-radio", options: ["low", "high"] },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isRequired: { control: "boolean" },
    helpText: { control: "text" },
    children: { control: "text" },
  },
  args: {
    value: "option",
    children: "Radio option",
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Interactive playground — standalone Radio (no RadioGroup needed).
 * Use `defaultChecked` / `isChecked` + `onChange` for controlled state.
 */
export const Playground: Story = {
  args: { defaultChecked: false },
};

/* -------------------------------------------------------------------------- */
/* Standalone states (no RadioGroup required)                                 */
/* -------------------------------------------------------------------------- */

export const Unchecked: Story = {
  args: { children: "Unchecked" },
};

export const Checked: Story = {
  args: { defaultChecked: true, children: "Checked" },
};

export const Disabled: Story = {
  args: { isDisabled: true, children: "Disabled" },
};

export const DisabledChecked: Story = {
  args: {
    isDisabled: true,
    defaultChecked: true,
    children: "Disabled checked",
  },
};

export const Invalid: Story = {
  args: { isInvalid: true, children: "Invalid option" },
};

/** All states stacked, matching the Forma 36 docs example. */
export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col gap-small">
      <Radio value="unchecked">Unchecked</Radio>
      <Radio value="checked" defaultChecked>
        Checked
      </Radio>
      <Radio value="disabled" isDisabled>
        Disabled
      </Radio>
      <Radio value="disabled-checked" isDisabled defaultChecked>
        Disabled checked
      </Radio>
      <Radio value="invalid" isInvalid>
        Invalid
      </Radio>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Help text                                                                  */
/* -------------------------------------------------------------------------- */

export const WithHelpText: Story = {
  args: {
    children: "Email notifications",
    helpText: "Receive updates directly to your inbox.",
    defaultChecked: true,
  },
};

export const WithHelpTextInvalid: Story = {
  args: {
    isInvalid: true,
    children: "I accept the terms",
    helpText: "You must accept before continuing.",
  },
};

/* -------------------------------------------------------------------------- */
/* Density                                                                    */
/* -------------------------------------------------------------------------- */

export const Density: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-col">
      <Radio value="low" density="low">
        Low density
      </Radio>
      <Radio value="high" density="high">
        High density
      </Radio>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* RadioGroup — vertical (default)                                            */
/* -------------------------------------------------------------------------- */

export const Group: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <fieldset className="border-0 p-0">
      <legend className="mb-small text-medium font-medium text-gray-800 dark:text-gray-100">
        Preferred contact method
      </legend>
      <RadioGroup defaultValue="email" name="contact">
        <Radio value="email">Email</Radio>
        <Radio value="sms">SMS</Radio>
        <Radio value="push">Push notification</Radio>
        <Radio value="none" isDisabled>
          None (unavailable)
        </Radio>
      </RadioGroup>
    </fieldset>
  ),
};

/* -------------------------------------------------------------------------- */
/* RadioGroup — horizontal                                                    */
/* -------------------------------------------------------------------------- */

export const GroupHorizontal: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <fieldset className="border-0 p-0">
      <legend className="mb-small text-medium font-medium text-gray-800 dark:text-gray-100">
        Plan
      </legend>
      <RadioGroup defaultValue="pro" name="plan" direction="row">
        <Radio value="free">Free</Radio>
        <Radio value="pro">Pro</Radio>
        <Radio value="enterprise">Enterprise</Radio>
      </RadioGroup>
    </fieldset>
  ),
};

/* -------------------------------------------------------------------------- */
/* RadioGroup — disabled at group level                                       */
/* -------------------------------------------------------------------------- */

export const GroupDisabled: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <RadioGroup defaultValue="email" name="contact-disabled" isDisabled>
      <Radio value="email">Email</Radio>
      <Radio value="sms">SMS</Radio>
      <Radio value="push">Push notification</Radio>
    </RadioGroup>
  ),
};

/* -------------------------------------------------------------------------- */
/* RadioGroup — controlled                                                    */
/* -------------------------------------------------------------------------- */

export const GroupControlled: Story = {
  parameters: { layout: "padded" },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState("sms");

    return (
      <div className="flex flex-col gap-small">
        <RadioGroup value={value} onChange={setValue} name="contact-controlled">
          <Radio value="email">Email</Radio>
          <Radio value="sms">SMS</Radio>
          <Radio value="push">Push notification</Radio>
        </RadioGroup>
        <span className="text-small text-gray-500 dark:text-gray-400">
          Selected: {value}
        </span>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/* RadioGroup — with help text                                                */
/* -------------------------------------------------------------------------- */

export const GroupWithHelpText: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <fieldset className="border-0 p-0">
      <legend className="mb-small text-medium font-medium text-gray-800 dark:text-gray-100">
        Notification frequency
      </legend>
      <RadioGroup defaultValue="daily" name="frequency">
        <Radio
          value="realtime"
          helpText="Sent immediately when activity occurs."
        >
          Real-time
        </Radio>
        <Radio value="daily" helpText="A single digest delivered each morning.">
          Daily digest
        </Radio>
        <Radio value="weekly" helpText="A weekly summary every Monday.">
          Weekly digest
        </Radio>
      </RadioGroup>
    </fieldset>
  ),
};
