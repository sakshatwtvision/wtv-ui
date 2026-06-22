import type { Meta, StoryObj } from "@storybook/react-vite";
import { InstallationPage } from "./InstallationPage";

const meta = {
  title: "Get Started/Installation",
  component: InstallationPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof InstallationPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
