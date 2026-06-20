import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShadowPage } from "./ShadowPage";

const meta = {
  title: "Getting Started/Shadow",
  component: ShadowPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ShadowPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
