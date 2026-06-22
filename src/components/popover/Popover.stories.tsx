import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button";
import { Text } from "../text";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The anatomy from the spec: a trigger and freeform content. */
export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary">Open</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <Text weight="semibold">Dimensions</Text>
        <Text variant="muted" size="small">
          Set the dimensions for the layer. These values apply to the selected
          element only.
        </Text>
      </PopoverContent>
    </Popover>
  ),
};

/** Positioned to a side with a larger offset. */
export const SideRight: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="secondary">Details</Button>
      </PopoverTrigger>
      <PopoverContent side="right" align="start" className="w-64">
        <Text size="small">
          Popovers hold freeform content — text, inputs, or actions.
        </Text>
      </PopoverContent>
    </Popover>
  ),
};
