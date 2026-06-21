import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PostCard } from "./PostCard";

const meta = {
  title: "Blocks/PostCard",
  component: PostCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="mx-auto max-w-2xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const BODY = (
  <>
    <p>
      It gives me great pleasure to recognize <strong>Tanvi</strong> for her
      exceptional initiative, ownership, and dedication across multiple HR
      initiatives, particularly her valuable contributions to{" "}
      <strong>Incentiwise</strong>.
    </p>
    <p>
      Tanvi consistently demonstrates a proactive mindset, taking on
      responsibilities beyond her core role and ensuring tasks are executed
      with efficiency, accuracy, and a strong sense of accountability. Her
      ability to identify opportunities, drive improvements and support
      critical HR activities has significantly contributed to the team&apos;s
      success.
    </p>
    <p>
      Her commitment, positive attitude and willingness to go the extra mile
      embody the values we strive to foster within our organization.
    </p>
    <p>
      Thank you, Tanvi for your outstanding contributions and continued
      excellence. Your efforts are truly appreciated and make a meaningful
      difference.
    </p>
  </>
);

export const Default: Story = {
  args: {
    title: "Well Done!",
    points: 1000,
    date: "8 Jun 2026",
    fromUser: { name: "Manish Dwivedi" },
    toUser: { name: "Tanvi Rajput" },
    body: BODY,
    closingLine: "Congratulations on this well-deserved recognition! 👏 ☀️",
    tags: [
      "#CUSTOMER FIRST",
      "#INNOVATION & DESIGN EXCELLENCE",
      "#HAPPY PLACE TO WORK",
      "#QUALITY TO OUR STANDARDS",
      "#GROWTH MINDSET",
      "#EFFICIENCY",
      "#TEAM FIRST",
      "#OWNERSHIP AND INITIATIVE",
    ],
    reactionCount: 3,
    commentCount: 1,
    currentUser: { name: "You" },
  },
};

export const WithAvatars: Story = {
  args: {
    ...Default.args,
    fromUser: {
      name: "Manish Dwivedi",
      avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=manish",
    },
    toUser: {
      name: "Tanvi Rajput",
      avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=tanvi",
    },
    currentUser: {
      name: "Sakshi Agarwal",
      avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=sakshi",
    },
  },
};

export const Reacted: Story = {
  args: {
    ...Default.args,
    isReacted: true,
    reactionCount: 4,
  },
};

export const NoPoints: Story = {
  args: {
    ...Default.args,
    points: undefined,
  },
};

export const NoTags: Story = {
  args: {
    ...Default.args,
    tags: undefined,
  },
};

export const Feed: Story = {
  args: {
    ...Default.args,
  },
  parameters: { layout: "padded" },
  render: () => (
    <div className="mx-auto flex max-w-2xl flex-col gap-large bg-gray-100 p-large dark:bg-gray-950">
      <PostCard
        title="Well Done!"
        points={1000}
        date="8 Jun 2026"
        fromUser={{ name: "Manish Dwivedi" }}
        toUser={{ name: "Tanvi Rajput" }}
        body="Tanvi's contributions to the HR team this quarter have been exceptional. Her ownership and initiative set a high bar for the whole org."
        closingLine="Congratulations on this well-deserved recognition! 👏"
        tags={["#OWNERSHIP AND INITIATIVE", "#CUSTOMER FIRST", "#TEAM FIRST"]}
        reactionCount={3}
        commentCount={1}
        currentUser={{ name: "You" }}
      />
      <PostCard
        title="Above & Beyond"
        points={500}
        date="5 Jun 2026"
        fromUser={{ name: "Priya Sharma" }}
        toUser={{ name: "Ravi Kumar" }}
        body="Ravi stepped up during the product launch and ensured everything ran smoothly under tight deadlines. A true team player."
        closingLine="Thank you, Ravi! 🚀"
        tags={["#EFFICIENCY", "#GROWTH MINDSET"]}
        reactionCount={7}
        commentCount={2}
        isReacted
        currentUser={{ name: "You" }}
      />
    </div>
  ),
};
