import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadiusPage } from "./Radius";

const meta = {
  title: "Design Language/Radius",
  component: RadiusPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RadiusPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
