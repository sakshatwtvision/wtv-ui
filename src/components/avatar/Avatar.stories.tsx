import type { Meta, StoryObj } from "@storybook/react-vite";
import { PlusIcon, CheckIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "./Avatar";

const meta = {
  title: "Data/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "base", "medium", "large"],
    },
  },
  args: {
    size: "base",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Image avatar — falls back to initials if the source fails to load. */
export const Image: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

/** Initials shown when there is no image (or it fails to load). */
export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>PP</AvatarFallback>
    </Avatar>
  ),
};

/** Every size, from small (24px) to large (48px). */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-medium">
      {(["small", "base", "medium", "large"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

/** A badge with an icon, anchored to the lower-right edge. */
export const WithBadge: Story = {
  args: {
    size: "large",
  },

  render: () => (
    <Avatar className="grayscale">
      <AvatarImage src="https://github.com/pranathip.png" alt="@pranathip" />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
  ),
};

/** The badge scales with the avatar size. */
export const BadgeSizes: Story = {
  render: () => (
    <div className="flex items-end gap-medium">
      {(["small", "base", "medium", "large"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
          <AvatarBadge>
            <CheckIcon />
          </AvatarBadge>
        </Avatar>
      ))}
    </div>
  ),
};
