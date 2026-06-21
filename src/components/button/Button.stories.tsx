import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, HeartIcon, Plus, SearchIcon } from "lucide-react";
import { TextInput } from "../text-input";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "positive", "negative", "transparent"],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    isLoading: { control: "boolean" },
    isDisabled: { control: "boolean" },
    isFullWidth: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "secondary",
    size: "medium",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Primary: Story = {
  args: { variant: "primary", children: "Primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Secondary" },
};

export const Positive: Story = {
  args: { variant: "positive", children: "Positive" },
};

export const Negative: Story = {
  args: { variant: "negative", children: "Negative" },
};

export const Transparent: Story = {
  render: () => {
    return (
      <Button
        variant={"transparent"}
        startIcon={<HeartIcon size={16} className="text-negative-500" />}
      >
        2 likes
      </Button>
    );
  },
};

/** All five variants side by side. */
export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-small">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="positive">
        Positive
      </Button>
      <Button {...args} variant="negative">
        Negative
      </Button>
      <Button {...args} variant="transparent">
        Transparent
      </Button>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-small">
      <Button {...args} variant="primary" size="small">
        Small
      </Button>
      <Button {...args} variant="primary" size="medium">
        Medium
      </Button>
      <Button {...args} variant="primary" size="large">
        Large
      </Button>
    </div>
  ),
};

export const WithStartIcon: Story = {
  args: {
    variant: "primary",
    startIcon: <Plus className="size-4" />,
    children: "Add entry",
  },
};

export const WithEndIcon: Story = {
  args: {
    variant: "secondary",
    endIcon: <ArrowRight className="size-4" />,
    children: "Continue",
  },
};

export const Loading: Story = {
  args: { variant: "primary", isLoading: true, children: "Saving" },
};

export const Disabled: Story = {
  args: { variant: "secondary", isDisabled: true, children: "Disabled" },
};

export const FullWidth: Story = {
  parameters: { layout: "padded" },
  args: {
    variant: "primary",
    isFullWidth: true,
    endIcon: <ArrowRight className="size-4" />,
    children: "Get started",
  },
};

export const WithInput: Story = {
  parameters: { layout: "padded" },
  render: (args) => (
    <div className="flex items-center gap-small">
      <TextInput
        icon={<SearchIcon />}
        placeholder="Search for an item"
        size={"large"}
      />
      <Button {...args} variant="primary" size={"large"}>
        Search
      </Button>
    </div>
  ),
};

export const CustomClassName: Story = {
  args: {
    variant: "primary",
    className:
      "rounded-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800",
    children: "Custom className",
  },
};

export const RenderedAsLink: Story = {
  args: {
    variant: "secondary",
    render: (
      <a href="https://f36.contentful.com" target="_blank" rel="noreferrer" />
    ),
    children: "Rendered as a link",
  },
};
