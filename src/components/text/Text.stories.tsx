import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    size: {
      control: "select",
      options: [
        "x-small",
        "small",
        "base",
        "medium",
        "large",
        "x-large",
        "2x-large",
        "3x-large",
        "4x-large",
      ],
    },
    weight: {
      control: "select",
      options: [
        "thin",
        "extralight",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
        "black",
      ],
    },
    align: {
      control: "inline-radio",
      options: ["left", "center", "right"],
    },
    wrap: {
      control: "inline-radio",
      options: ["wrap", "nowrap", "pretty", "balance"],
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "positive", "negative", "warning"],
    },
    as: {
      control: "inline-radio",
      options: ["p", "span", "div"],
    },
    children: { control: "text" },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
    size: "base",
    weight: "normal",
    color: "default",
    as: "p",
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Every size in one view, from x-small to 4x-large. */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-large">
      {(
        [
          "x-small",
          "small",
          "base",
          "medium",
          "large",
          "x-large",
          "2x-large",
          "3x-large",
          "4x-large",
        ] as const
      ).map((size) => (
        <div key={size} className="flex items-baseline gap-medium">
          <Text size="small" color="muted" className="w-20 shrink-0">
            {size}
          </Text>
          <Text size={size}>The quick brown fox</Text>
        </div>
      ))}
    </div>
  ),
};

/** Every weight at base size. */
export const AllWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-small">
      {(
        [
          "thin",
          "extralight",
          "light",
          "normal",
          "medium",
          "semibold",
          "bold",
          "extrabold",
          "black",
        ] as const
      ).map((weight) => (
        <div key={weight} className="flex items-baseline gap-medium">
          <Text size="small" color="muted" className="w-24 shrink-0">
            {weight}
          </Text>
          <Text weight={weight}>The quick brown fox jumps over the lazy dog.</Text>
        </div>
      ))}
    </div>
  ),
};

/** Semantic color options. */
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-small">
      {(
        ["default", "muted", "primary", "positive", "negative", "warning"] as const
      ).map((color) => (
        <div key={color} className="flex items-baseline gap-medium">
          <Text size="small" color="muted" className="w-20 shrink-0">
            {color}
          </Text>
          <Text color={color}>The quick brown fox jumps over the lazy dog.</Text>
        </div>
      ))}
    </div>
  ),
};

/** Text alignment options. */
export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-medium">
      {(["left", "center", "right"] as const).map((align) => (
        <Text key={align} align={align} className="w-full">
          {align} — The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
};

/** Wrap modes on a constrained width. */
export const Wrapping: Story = {
  render: () => (
    <div className="flex flex-col gap-medium" style={{ maxWidth: 400 }}>
      {(["wrap", "nowrap", "pretty", "balance"] as const).map((wrap) => (
        <div key={wrap}>
          <Text size="small" color="muted" className="mb-x-small">
            {wrap}
          </Text>
          <Text wrap={wrap} className="overflow-hidden">
            The quick brown fox jumps over the lazy dog and then kept running
            across the field into the distance.
          </Text>
        </div>
      ))}
    </div>
  ),
};

/** Rendered as a span, div, and p. */
export const Elements: Story = {
  render: () => (
    <div className="flex flex-col gap-small">
      <Text as="p">Paragraph — block, margin collapses with siblings.</Text>
      <Text as="div">Div — block, no default margin.</Text>
      <Text as="span">Span — inline, flows with surrounding text.</Text>
    </div>
  ),
};
