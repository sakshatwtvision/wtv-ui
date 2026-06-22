import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPage } from "./Color";

const meta = {
  title: "Design Language/Color",
  component: ColorPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ColorPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
