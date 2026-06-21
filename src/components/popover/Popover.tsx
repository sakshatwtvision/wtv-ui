import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "../../utils/cn";

/* -------------------------------------------------------------------------- */
/* Root + trigger                                                             */
/* -------------------------------------------------------------------------- */

export type PopoverProps = PopoverPrimitive.Root.Props;

/** Groups all parts of the popover. Renders no DOM of its own. */
export function Popover(props: PopoverProps) {
  return <PopoverPrimitive.Root {...props} />;
}

export type PopoverTriggerProps = Omit<
  PopoverPrimitive.Trigger.Props,
  "render" | "children"
> & {
  /**
   * The element that opens the popover, e.g. a `Button`. Exactly one React
   * element must be provided — it becomes the trigger (its accessibility
   * props, ref, and open state are merged in).
   */
  children: React.ReactElement;
};

/**
 * Wraps a single child element and turns it into the popover trigger:
 *
 * ```tsx
 * <PopoverTrigger>
 *   <Button variant="secondary">Open</Button>
 * </PopoverTrigger>
 * ```
 */
export function PopoverTrigger({ children, ...props }: PopoverTriggerProps) {
  const count = React.Children.count(children);
  if (count === 0) {
    throw new Error(
      "<PopoverTrigger> requires a single child element to use as the trigger, " +
        "e.g. <PopoverTrigger><Button>Open</Button></PopoverTrigger>.",
    );
  }
  if (count > 1) {
    throw new Error(
      `<PopoverTrigger> expects exactly one child element but received ${count}. ` +
        "Wrap them in a single element.",
    );
  }

  // Exactly one child: assert it's a renderable element (not a string/number).
  const child = React.Children.only(children);
  if (!React.isValidElement(child) || child.type === React.Fragment) {
    throw new Error(
      "<PopoverTrigger> child must be a single React element (e.g. <Button>…</Button>), " +
        "not text or a Fragment.",
    );
  }

  // Hand the element to Base UI's `render` prop so it merges trigger behavior
  // (ref, aria-*, data-popup-open) onto the consumer's component.
  return <PopoverPrimitive.Trigger render={child} {...props} />;
}

/* -------------------------------------------------------------------------- */
/* Popup container                                                            */
/* -------------------------------------------------------------------------- */

// Same chrome as the Menu popup (border / radius / shadow / surface / open-close
// transition). Padding is `p-small` for freeform content, in the spirit of the
// menu's gutter; min-width is dropped so the popover hugs its content.
const popupClasses = cn(
  "z-50 max-h-[var(--available-height)] overflow-y-auto",
  "rounded-medium border border-gray-200 bg-white p-small",
  "text-gray-800 shadow-lg outline-none",
  "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
  "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out",
  "data-starting-style:scale-95 data-starting-style:opacity-0",
  "data-ending-style:scale-95 data-ending-style:opacity-0",
);

export type PopoverContentProps = PopoverPrimitive.Popup.Props & {
  className?: string;
  /** Side of the trigger to render against. @default "bottom" */
  side?: PopoverPrimitive.Positioner.Props["side"];
  /** Alignment along the trigger edge. @default "center" */
  align?: PopoverPrimitive.Positioner.Props["align"];
  /** Gap between trigger and popup, in px. @default 8 */
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
};

export function PopoverContent({
  className,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <PopoverPrimitive.Popup
          className={cn(popupClasses, className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}
