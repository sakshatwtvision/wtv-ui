import type { Meta, StoryObj } from "@storybook/react-vite";
import { SpacingPage } from "./Spacing";

const meta = {
  title: "Design Language/Spacing",
  component: SpacingPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SpacingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
