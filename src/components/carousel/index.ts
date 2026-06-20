import {
  Indicator,
  Indicators,
  NextTrigger,
  PrevTrigger,
  Root,
  Slide,
  Track,
  Viewport,
} from "./Carousel";

/**
 * Compound API surface. The parts live as individual component exports in
 * `Carousel.tsx` (which keeps React Fast Refresh happy); the dot-notation
 * namespace is assembled here so consumers write `<Carousel.Root>` etc.
 */
export const Carousel = {
  Root,
  Viewport,
  Track,
  Slide,
  PrevTrigger,
  NextTrigger,
  Indicators,
  Indicator,
};

export type {
  CarouselContextValue,
  CarouselIndicatorProps,
  CarouselIndicatorsProps,
  CarouselNextTriggerProps,
  CarouselPrevTriggerProps,
  CarouselRootProps,
  CarouselSlideProps,
  CarouselTrackProps,
  CarouselViewportProps,
} from "./types";
