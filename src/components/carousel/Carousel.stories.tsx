import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import { Carousel } from ".";

/* -------------------------------------------------------------------------- */
/* Demo slides — Forma palette panels standing in for real imagery            */
/* -------------------------------------------------------------------------- */

const slides = [
  { label: "Slide one", className: "bg-primary-600" },
  { label: "Slide two", className: "bg-positive-600" },
  { label: "Slide three", className: "bg-purple-600" },
  { label: "Slide four", className: "bg-warning-600" },
];

/** Lowercase render helper (not a component) so a colored panel can stand in
 *  for slide imagery without tripping the react-refresh export rule. */
function panel(label: string, className: string) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        "text-x-large font-semibold text-white select-none",
        className,
      )}
    >
      {label}
    </div>
  );
}

/* Shared trigger styling, expressed in Forma tokens (radius / shadow / palette). */
const triggerClass =
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center size-10 " +
  "rounded-full bg-white/80 text-gray-800 shadow-default transition-colors " +
  "hover:bg-white focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-blue-400";

/**
 * `Carousel` is an unstyled compound component (`Carousel.Root` / `.Viewport` /
 * `.Track` / `.Slide` / `.PrevTrigger` / `.NextTrigger` / `.Indicators` /
 * `.Indicator`). It ships no chrome of its own — every part is positioned with
 * your `className`, merged via `cn` so consumer classes win. The stories below
 * dress it with Forma 36 tokens so it matches the rest of the library.
 */
const meta = {
  title: "Layout/Carousel",
  component: Carousel.Root,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    total: slides.length,
    children: null,
    defaultIndex: 0,
    isAutoplayEnabled: false,
    autoplayInterval: 5000,
  },
  argTypes: {
    defaultIndex: {
      control: { type: "number", min: 0, step: 1 },
      description: "Starting slide (uncontrolled).",
    },
    isAutoplayEnabled: {
      control: "boolean",
      description: "Auto-advance on a timer.",
    },
    autoplayInterval: {
      control: { type: "number", min: 500, step: 500 },
      description: "Milliseconds between auto-advances.",
    },
    // Driven by the demo slides / wiring, not the controls panel.
    total: { control: false },
    index: { control: false },
    onIndexChange: { control: false },
    children: { control: false },
    className: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="w-[32rem] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/* Default — triggers + indicators, mirroring the reference usage             */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
  render: (args) => (
    <Carousel.Root
      total={slides.length}
      defaultIndex={args.defaultIndex}
      isAutoplayEnabled={args.isAutoplayEnabled}
      autoplayInterval={args.autoplayInterval}
    >
      <Carousel.Viewport className="h-80 rounded-large shadow-default">
        <Carousel.Track>
          {slides.map((slide) => (
            <Carousel.Slide key={slide.label}>
              {panel(slide.label, slide.className)}
            </Carousel.Slide>
          ))}
        </Carousel.Track>

        <Carousel.PrevTrigger className={cn(triggerClass, "left-large")}>
          <ChevronLeftIcon className="size-5" />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className={cn(triggerClass, "right-large")}>
          <ChevronRightIcon className="size-5" />
        </Carousel.NextTrigger>

        <Carousel.Indicators className="absolute bottom-large left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-small py-x-small backdrop-blur-sm">
          {({ index, isActive }) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                isActive
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/60 hover:bg-white/80",
              )}
            />
          )}
        </Carousel.Indicators>
      </Carousel.Viewport>
    </Carousel.Root>
  ),
};

/* -------------------------------------------------------------------------- */
/* Autoplay — advances on a timer via isAutoplayEnabled                       */
/* -------------------------------------------------------------------------- */

export const Autoplay: Story = {
  render: () => (
    <Carousel.Root
      total={slides.length}
      isAutoplayEnabled
      autoplayInterval={2000}
    >
      <Carousel.Viewport className="h-80 rounded-large shadow-default">
        <Carousel.Track>
          {slides.map((slide) => (
            <Carousel.Slide key={slide.label}>
              {panel(slide.label, slide.className)}
            </Carousel.Slide>
          ))}
        </Carousel.Track>

        <Carousel.Indicators className="absolute bottom-large left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-small py-x-small backdrop-blur-sm">
          {({ index, isActive }) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                isActive
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/60 hover:bg-white/80",
              )}
            />
          )}
        </Carousel.Indicators>
      </Carousel.Viewport>
    </Carousel.Root>
  ),
};

/* -------------------------------------------------------------------------- */
/* Default indicators — omit the render-prop to get the built-in dot buttons  */
/* -------------------------------------------------------------------------- */

export const DefaultIndicators: Story = {
  render: () => (
    <Carousel.Root total={slides.length}>
      <Carousel.Viewport className="h-80 rounded-large shadow-default">
        <Carousel.Track>
          {slides.map((slide) => (
            <Carousel.Slide key={slide.label}>
              {panel(slide.label, slide.className)}
            </Carousel.Slide>
          ))}
        </Carousel.Track>

        <Carousel.PrevTrigger className={cn(triggerClass, "left-large")}>
          <ChevronLeftIcon className="size-5" />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className={cn(triggerClass, "right-large")}>
          <ChevronRightIcon className="size-5" />
        </Carousel.NextTrigger>

        {/* No render-prop → falls back to bare <Carousel.Indicator> buttons,
            styled here from the wrapper via child selectors. */}
        <Carousel.Indicators className="absolute bottom-large left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-small py-x-small [&_button]:size-2 [&_button]:rounded-full [&_button]:bg-white/60 [&_[aria-current=true]]:bg-white" />
      </Carousel.Viewport>
    </Carousel.Root>
  ),
};

/* -------------------------------------------------------------------------- */
/* Controlled — drive the active index from outside                           */
/* -------------------------------------------------------------------------- */

export const Controlled: Story = {
  render: function ControlledStory() {
    const [index, setIndex] = useState(0);
    return (
      <div className="flex flex-col gap-medium">
        <Carousel.Root
          total={slides.length}
          index={index}
          onIndexChange={setIndex}
        >
          <Carousel.Viewport className="h-80 rounded-large shadow-default">
            <Carousel.Track>
              {slides.map((slide) => (
                <Carousel.Slide key={slide.label}>
                  {panel(slide.label, slide.className)}
                </Carousel.Slide>
              ))}
            </Carousel.Track>
          </Carousel.Viewport>
        </Carousel.Root>

        <div className="flex items-center justify-center gap-x-small">
          {slides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "rounded-medium px-small py-x-small text-x-small transition-colors",
                i === index
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------- */
/* Single slide — triggers and indicators hide themselves when total <= 1     */
/* -------------------------------------------------------------------------- */

export const SingleSlide: Story = {
  render: () => (
    <Carousel.Root total={1}>
      <Carousel.Viewport className="h-80 rounded-large shadow-default">
        <Carousel.Track>
          <Carousel.Slide>{panel("Only slide", "bg-gray-700")}</Carousel.Slide>
        </Carousel.Track>

        {/* Render nothing because total <= 1. */}
        <Carousel.PrevTrigger className={cn(triggerClass, "left-large")}>
          <ChevronLeftIcon className="size-5" />
        </Carousel.PrevTrigger>
        <Carousel.NextTrigger className={cn(triggerClass, "right-large")}>
          <ChevronRightIcon className="size-5" />
        </Carousel.NextTrigger>
      </Carousel.Viewport>
    </Carousel.Root>
  ),
};
