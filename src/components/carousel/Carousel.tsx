import { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";
import type {
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

/**
 * `Carousel` is an unstyled compound component: every part is layout-only and
 * fully extendable through `className` (merged with `cn`, so consumer classes
 * win conflicts). State lives in `Root` and is shared via context, with a
 * controlled (`index` + `onIndexChange`) and uncontrolled (`defaultIndex`)
 * mode. There is no Forma 36 / Base UI carousel primitive, so this is a custom
 * implementation that mirrors the library's `data-slot` + `className` ethos
 * rather than wrapping a headless primitive.
 */
const CarouselContext = createContext<CarouselContextValue>({
  activeIndex: 0,
  total: 0,
  goTo: () => {},
  next: () => {},
  prev: () => {},
});

export function Root({
  children,
  total,
  defaultIndex = 0,
  index: controlledIndex,
  onIndexChange,
  isAutoplayEnabled = false,
  autoplayInterval = 5000,
  className,
}: CarouselRootProps) {
  const [internalIndex, setInternalIndex] = useState(defaultIndex);
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const goTo = (next: number) => {
    if (total <= 0) return;
    // Wrap into [0, total) so prev() from the first slide lands on the last.
    const wrapped = ((next % total) + total) % total;
    if (!isControlled) setInternalIndex(wrapped);
    onIndexChange?.(wrapped);
  };

  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  // Autoplay: advance on a timer. `next` is captured through a ref (synced in
  // an effect, never during render) so the interval always calls the latest
  // closure — correct index, working in both controlled and uncontrolled mode —
  // without resetting the timer on every render.
  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  });
  useEffect(() => {
    if (!isAutoplayEnabled || total <= 1) return;
    const id = setInterval(() => nextRef.current(), autoplayInterval);
    return () => clearInterval(id);
  }, [isAutoplayEnabled, autoplayInterval, total]);

  return (
    <CarouselContext.Provider value={{ activeIndex, total, goTo, next, prev }}>
      <div data-slot="carousel-root" className={className}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function Viewport({
  className,
  children,
  ...props
}: CarouselViewportProps) {
  return (
    <div
      data-slot="carousel-viewport"
      className={cn("relative h-full w-full overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function Track({
  className,
  style,
  children,
  ...props
}: CarouselTrackProps) {
  const { activeIndex } = useContext(CarouselContext);

  return (
    <div
      data-slot="carousel-track"
      className={cn(
        "flex h-full w-full transition-transform duration-500 ease-out",
        className,
      )}
      style={{
        transform: `translateX(-${activeIndex * 100}%)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Slide({ className, children, ...props }: CarouselSlideProps) {
  return (
    <div
      data-slot="carousel-slide"
      className={cn("relative h-full w-full shrink-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function PrevTrigger({
  className,
  onClick,
  children,
  "aria-label": ariaLabel = "Previous slide",
  ...props
}: CarouselPrevTriggerProps) {
  const { prev, total } = useContext(CarouselContext);

  if (total <= 1) return null;

  return (
    <button
      data-slot="carousel-prev-trigger"
      type="button"
      aria-label={ariaLabel}
      onClick={(e) => {
        prev();
        onClick?.(e);
      }}
      className={cn("cursor-pointer rounded-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function NextTrigger({
  className,
  onClick,
  children,
  "aria-label": ariaLabel = "Next slide",
  ...props
}: CarouselNextTriggerProps) {
  const { next, total } = useContext(CarouselContext);

  if (total <= 1) return null;

  return (
    <button
      data-slot="carousel-next-trigger"
      type="button"
      aria-label={ariaLabel}
      onClick={(e) => {
        next();
        onClick?.(e);
      }}
      className={cn("cursor-pointer rounded-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function Indicators({
  className,
  children,
  ...props
}: CarouselIndicatorsProps) {
  const { total, activeIndex } = useContext(CarouselContext);

  if (total <= 1) return null;

  return (
    <div data-slot="carousel-indicators" className={cn(className)} {...props}>
      {Array.from({ length: total }, (_, index) => {
        const isActive = index === activeIndex;
        if (children) return children({ index, isActive });
        return <Indicator key={index} index={index} aria-current={isActive} />;
      })}
    </div>
  );
}

export function Indicator({
  className,
  onClick,
  index,
  "aria-label": ariaLabel,
  ...props
}: CarouselIndicatorProps) {
  const { goTo } = useContext(CarouselContext);

  return (
    <button
      data-slot="carousel-indicator"
      type="button"
      aria-label={ariaLabel ?? `Go to slide ${index + 1}`}
      onClick={(e) => {
        goTo(index);
        onClick?.(e);
      }}
      className={cn("cursor-pointer rounded-full", className)}
      {...props}
    />
  );
}
