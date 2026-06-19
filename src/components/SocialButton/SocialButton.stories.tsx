import type { Meta, StoryObj } from "@storybook/react-vite";
import { SocialButton } from "./SocialButton";

const meta = {
  title: "Components/SocialButton",
  component: SocialButton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    provider: { control: "select", options: ["google"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    variant: {
      control: "select",
      options: ["primary", "secondary", "positive", "negative", "transparent"],
    },
    isDisabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    isFullWidth: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    provider: "google",
  },
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default — secondary (outline) at medium size. */
export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* Sizes                                                                      */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-col items-start gap-small">
      <SocialButton {...args} size="small" />
      <SocialButton {...args} size="medium" />
      <SocialButton {...args} size="large" />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Full width                                                                 */
/* -------------------------------------------------------------------------- */

/** The typical sign-in card layout — full-width button inside a constrained container. */
export const FullWidth: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="w-80">
      <SocialButton {...args} isFullWidth />
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Loading: Story = {
  args: { isLoading: true },
};

/* -------------------------------------------------------------------------- */
/* Custom label                                                               */
/* -------------------------------------------------------------------------- */

/** Override the default "Continue with Google" copy. */
export const CustomLabel: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-col items-start gap-small">
      <SocialButton {...args}>Continue with Google</SocialButton>
      <SocialButton {...args}>Sign in with Google</SocialButton>
      <SocialButton {...args}>Sign up with Google</SocialButton>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* In context — sign-in card                                                 */
/* -------------------------------------------------------------------------- */

export const SignInCard: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex w-80 flex-col gap-medium rounded-large border border-gray-200 p-x-large dark:border-gray-700">
      <div className="flex flex-col gap-x-small">
        <h2 className="text-x-large font-semibold text-gray-900 dark:text-gray-50">
          Welcome back
        </h2>
        <p className="text-medium text-gray-500 dark:text-gray-400">
          Sign in to your account to continue.
        </p>
      </div>
      <SocialButton {...args} isFullWidth />
    </div>
  ),
};
