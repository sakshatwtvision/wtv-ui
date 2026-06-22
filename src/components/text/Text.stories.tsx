import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta = {
  title: "Typography/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    size: {
      control: "select",
      options: [
        "2x-small",
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
    variant: {
      control: "select",
      options: [
        "default",
        "muted",
        "primary",
        "positive",
        "negative",
        "warning",
      ],
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
    variant: "default",
    as: "p",
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-large">
      {(
        [
          "2x-small",
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
          <Text size="small" variant="muted" className="w-20 shrink-0">
            {size}
          </Text>
          <Text size={size}>The quick brown fox</Text>
        </div>
      ))}
    </div>
  ),
};

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
          <Text size="small" variant="muted" className="w-24 shrink-0">
            {weight}
          </Text>
          <Text weight={weight}>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-small">
      {(
        [
          "default",
          "muted",
          "primary",
          "positive",
          "negative",
          "warning",
        ] as const
      ).map((variant) => (
        <div key={variant} className="flex items-baseline gap-medium">
          <Text size="small" variant="muted" className="w-20 shrink-0">
            {variant}
          </Text>
          <Text variant={variant}>
            The quick brown fox jumps over the lazy dog.
          </Text>
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

export const Wrapping: Story = {
  render: () => (
    <div className="flex flex-col gap-medium" style={{ maxWidth: 400 }}>
      {(["wrap", "nowrap", "pretty", "balance"] as const).map((wrap) => (
        <div key={wrap}>
          <Text size="small" variant="muted" className="mb-x-small">
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

export const Elements: Story = {
  render: () => (
    <div className="flex flex-col gap-small">
      <Text as="p">Paragraph — block, margin collapses with siblings.</Text>
      <Text as="div">Div — block, no default margin.</Text>
      <Text as="span">Span — inline, flows with surrounding text.</Text>
    </div>
  ),
};
