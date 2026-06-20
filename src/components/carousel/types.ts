import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

export type CarouselContextValue = {
  activeIndex: number;
  total: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
};

export type CarouselRootProps = {
  children: ReactNode;
  /** Number of slides — drives wrapping, indicators, and trigger visibility. */
  total: number;
  /** Starting slide for the uncontrolled case. */
  defaultIndex?: number;
  /** Active slide for the controlled case. */
  index?: number;
  /** Fires with the wrapped index whenever the active slide changes. */
  onIndexChange?: (index: number) => void;
  /** Auto-advance to the next slide on a timer. No-op with a single slide. */
  isAutoplayEnabled?: boolean;
  /** Milliseconds between auto-advances. Defaults to 5000. */
  autoplayInterval?: number;
  className?: string;
};

export type CarouselViewportProps = HTMLAttributes<HTMLDivElement>;

export type CarouselTrackProps = HTMLAttributes<HTMLDivElement>;

export type CarouselSlideProps = HTMLAttributes<HTMLDivElement>;

export type CarouselPrevTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type CarouselNextTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type CarouselIndicatorsProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  /** Render-prop for custom indicators; omit for the default dots. */
  children?: (args: { index: number; isActive: boolean }) => ReactNode;
};

export type CarouselIndicatorProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  index: number;
};
