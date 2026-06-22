import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "./Switch";

/**
 * `Switch` is a Forma 36 styled toggle, built on the Base UI `Switch`
 * primitive. Use the toolbar to flip Light/Dark and the Forma/Iris brand.
 */
const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "inline-radio", options: ["base", "small"] },
    density: { control: "inline-radio", options: ["low", "high"] },
    isChecked: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isInvalid: { control: "boolean" },
    isRequired: { control: "boolean" },
    helpText: { control: "text" },
    children: { control: "text" },
  },
  args: {
    children: "Airplane Mode",
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Interactive playground — tweak any prop from the Controls panel. */
export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export const Off: Story = {
  args: { children: "Off" },
};

export const On: Story = {
  args: { defaultChecked: true, children: "On" },
};

export const Disabled: Story = {
  args: { isDisabled: true, children: "Disabled" },
};

export const DisabledOn: Story = {
  args: { isDisabled: true, defaultChecked: true, children: "Disabled on" },
};

export const Invalid: Story = {
  args: { isInvalid: true, children: "Invalid" },
};

/** All states stacked. */
export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-col gap-small">
      <Switch {...args}>Off</Switch>
      <Switch {...args} defaultChecked>
        On
      </Switch>
      <Switch {...args} isDisabled>
        Disabled
      </Switch>
      <Switch {...args} isDisabled defaultChecked>
        Disabled on
      </Switch>
      <Switch {...args} isInvalid>
        Invalid
      </Switch>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Size                                                                       */
/* -------------------------------------------------------------------------- */

/** Both sizes stacked for comparison. */
export const Size: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-col gap-small">
      <Switch {...args} size="base" defaultChecked>
        Base
      </Switch>
      <Switch {...args} size="small" defaultChecked>
        Small
      </Switch>
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

/* -------------------------------------------------------------------------- */
/* Controlled                                                                 */
/* -------------------------------------------------------------------------- */

/** Controlled example — the parent owns the checked state. */
export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex flex-col gap-small">
        <Switch {...args} isChecked={checked} onChange={setChecked}>
          {checked ? "On" : "Off"} — click to toggle
        </Switch>
        <span className="text-small text-gray-500 dark:text-gray-400">
          State: {String(checked)}
        </span>
      </div>
    );
  },
};
