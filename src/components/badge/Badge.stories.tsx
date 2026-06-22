import type { Meta, StoryObj } from "@storybook/react-vite";
import { StarIcon, CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import { Badge } from "./Badge";

const meta = {
  title: "Data/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "filled"] },
    color: {
      control: "inline-radio",
      options: ["gray", "blue", "green", "red", "orange", "yellow", "purple"],
    },
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
    variant: "default",
    color: "blue",
    size: "medium",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/* -------------------------------------------------------------------------- */
/* Variants                                                                   */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  args: { variant: "default", children: "Changed" },
};

export const Filled: Story = {
  args: { variant: "filled", children: "New" },
};

/* -------------------------------------------------------------------------- */
/* All colors — default variant                                                */
/* -------------------------------------------------------------------------- */

export const AllColorsDefault: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-small">
      <Badge color="gray">Gray</Badge>
      <Badge color="blue">Blue</Badge>
      <Badge color="green">Green</Badge>
      <Badge color="red">Red</Badge>
      <Badge color="orange">Orange</Badge>
      <Badge color="yellow">Yellow</Badge>
      <Badge color="purple">Purple</Badge>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* All colors — filled variant                                                 */
/* -------------------------------------------------------------------------- */

export const AllColorsFilled: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-small">
      <Badge variant="filled" color="gray">Gray</Badge>
      <Badge variant="filled" color="blue">Blue</Badge>
      <Badge variant="filled" color="green">Green</Badge>
      <Badge variant="filled" color="red">Red</Badge>
      <Badge variant="filled" color="orange">Orange</Badge>
      <Badge variant="filled" color="yellow">Yellow</Badge>
      <Badge variant="filled" color="purple">Purple</Badge>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Sizes                                                                       */
/* -------------------------------------------------------------------------- */

export const Sizes: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex items-center gap-small">
      <Badge size="small" color="blue">Small</Badge>
      <Badge size="medium" color="blue">Medium</Badge>
      <Badge size="large" color="blue">Large</Badge>
    </div>
  ),
};

export const SizesFilled: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex items-center gap-small">
      <Badge variant="filled" size="small" color="blue">Small</Badge>
      <Badge variant="filled" size="medium" color="blue">Medium</Badge>
      <Badge variant="filled" size="large" color="blue">Large</Badge>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                       */
/* -------------------------------------------------------------------------- */

export const WithStartIcon: Story = {
  args: {
    color: "green",
    startIcon: <CheckCircleIcon />,
    children: "Verified",
  },
};

export const WithEndIcon: Story = {
  args: {
    color: "red",
    endIcon: <AlertCircleIcon />,
    children: "Error",
  },
};

export const WithBothIcons: Story = {
  args: {
    color: "purple",
    startIcon: <StarIcon />,
    endIcon: <StarIcon />,
    children: "Featured",
  },
};

export const IconsFilled: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-small">
      <Badge variant="filled" color="green" startIcon={<CheckCircleIcon />}>
        Approved
      </Badge>
      <Badge variant="filled" color="red" endIcon={<AlertCircleIcon />}>
        Failed
      </Badge>
      <Badge variant="filled" color="purple" startIcon={<StarIcon />}>
        Featured
      </Badge>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/* Accessibility — semantic role for live regions                              */
/* -------------------------------------------------------------------------- */

/** Pass `role="status"` when the badge content updates dynamically. */
export const LiveStatus: Story = {
  args: {
    color: "green",
    variant: "filled",
    role: "status",
    "aria-label": "Order status: Shipped",
    children: "Shipped",
  },
};
