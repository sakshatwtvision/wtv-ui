import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPage } from "./Color";

const meta = {
  title: "Getting Started/Color",
  component: ColorPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ColorPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
