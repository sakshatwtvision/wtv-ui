import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./Separator";
import { SocialButton } from "../SocialButton";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    text: { control: "text" },
  },
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* Horizontal                                                                 */
/* -------------------------------------------------------------------------- */

export const Horizontal: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="w-80">
      <Separator />
    </div>
  ),
};

export const HorizontalWithText: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="w-80">
      <Separator text="OR" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Vertical                                                                   */
/* -------------------------------------------------------------------------- */

export const Vertical: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex h-16 items-stretch">
      <span className="text-medium text-gray-700 dark:text-gray-300">Left</span>
      <Separator orientation="vertical" className="mx-medium" />
      <span className="text-medium text-gray-700 dark:text-gray-300">Right</span>
    </div>
  ),
};

export const VerticalWithText: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex h-32 items-stretch gap-medium">
      <span className="text-medium text-gray-700 dark:text-gray-300">Section A</span>
      <Separator orientation="vertical" text="OR" />
      <span className="text-medium text-gray-700 dark:text-gray-300">Section B</span>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* In context — sign-in card                                                 */
/* -------------------------------------------------------------------------- */

/** The canonical "social login + email" split that ships in almost every auth UI. */
export const SignInCard: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-80 flex-col gap-medium rounded-large border border-gray-200 p-x-large dark:border-gray-700">
      <div className="flex flex-col gap-x-small">
        <h2 className="text-x-large font-semibold text-gray-900 dark:text-gray-50">
          Sign in
        </h2>
        <p className="text-medium text-gray-500 dark:text-gray-400">
          Welcome back — pick a method below.
        </p>
      </div>

      <SocialButton provider="google" isFullWidth />

      <Separator text="OR" />

      <div className="flex flex-col gap-small">
        <TextInput placeholder="Email address" type="email" />
        <TextInput placeholder="Password" type="password" />
        <Button variant="primary" isFullWidth>
          Continue with email
        </Button>
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Custom text                                                                */
/* -------------------------------------------------------------------------- */

export const CustomText: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex w-80 flex-col gap-medium">
      <Separator text="OR" />
      <Separator text="AND" />
      <Separator text="· · ·" />
      <Separator text="THEN" />
    </div>
  ),
};
