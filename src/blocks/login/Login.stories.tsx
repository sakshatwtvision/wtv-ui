import type { Meta, StoryObj } from "@storybook/react-vite";
import { Login } from "./Login";

const HERO =
  "https://incentiwise-d-work-demo-media.s3.amazonaws.com/login_page_banners/WhatsApp_Image_2026-06-03_at_16.51.28.jpeg";

/**
 * The `Login` block is a full-page authentication layout: a form card on the
 * left and a hero image (or auto-advancing carousel) on the right.
 *
 * Pass a single image URL for a static banner, or an array to get prev/next
 * controls, dot indicators, and optional autoplay.
 */
const meta = {
  title: "Blocks/Login",
  component: Login,
  tags: ["autodocs"],
  parameters: {
    // Full-screen removes Storybook's padding so the min-h-screen layout fills
    // the canvas exactly as it would in the browser.
    layout: "fullscreen",
  },
  argTypes: {
    isAutoplayEnabled: { control: "boolean" },
  },
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: three-slide carousel, autoplay off. */
export const Default: Story = {};

/** Single hero image — carousel controls and indicators are hidden. */
export const SingleImage: Story = {
  args: {
    images: HERO,
  },
};

/** Carousel advances automatically every 3.5 s. */
export const WithAutoplay: Story = {
  args: {
    images: [HERO, HERO, HERO],
    isAutoplayEnabled: true,
  },
};

/** Pass objects to supply alt text alongside each image src. */
export const WithAltText: Story = {
  args: {
    images: [
      { src: HERO, alt: "Incentiwise Champions 2026 celebration" },
      { src: HERO, alt: "Team photo at the IPL finals" },
    ],
  },
};
