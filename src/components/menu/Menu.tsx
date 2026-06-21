import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "../../utils/cn";

/* -------------------------------------------------------------------------- */
/* Root + trigger                                                             */
/* -------------------------------------------------------------------------- */

export type MenuProps = MenuPrimitive.Root.Props;

/** Groups all parts of the menu. Renders no DOM of its own. */
export function Menu(props: MenuProps) {
  return <MenuPrimitive.Root {...props} />;
}

export type MenuTriggerProps = Omit<
  MenuPrimitive.Trigger.Props,
  "render" | "children"
> & {
  /**
   * The element that opens the menu, e.g. a `Button`. Exactly one React
   * element must be provided — it becomes the trigger (its accessibility
   * props, ref, and open state are merged in).
   */
  children: React.ReactElement;
};

/**
 * Wraps a single child element and turns it into the menu trigger:
 *
 * ```tsx
 * <MenuTrigger>
 *   <Button variant="secondary">Open</Button>
 * </MenuTrigger>
 * ```
 */
export function MenuTrigger({ children, ...props }: MenuTriggerProps) {
  const count = React.Children.count(children);
  if (count === 0) {
    throw new Error(
      "<MenuTrigger> requires a single child element to use as the trigger, " +
        "e.g. <MenuTrigger><Button>Open</Button></MenuTrigger>.",
    );
  }
  if (count > 1) {
    throw new Error(
      `<MenuTrigger> expects exactly one child element but received ${count}. ` +
        "Wrap them in a single element.",
    );
  }

  // Exactly one child: assert it's a renderable element (not a string/number).
  const child = React.Children.only(children);
  if (!React.isValidElement(child) || child.type === React.Fragment) {
    throw new Error(
      "<MenuTrigger> child must be a single React element (e.g. <Button>…</Button>), " +
        "not text or a Fragment.",
    );
  }

  // Hand the element to Base UI's `render` prop so it merges trigger behavior
  // (ref, aria-*, data-popup-open) onto the consumer's component.
  return <MenuPrimitive.Trigger render={child} {...props} />;
}

/** Groups related items inside the popup. */
export type MenuGroupProps = MenuPrimitive.Group.Props;

export function MenuGroup(props: MenuGroupProps) {
  return <MenuPrimitive.Group {...props} />;
}

/* -------------------------------------------------------------------------- */
/* Popup container                                                            */
/* -------------------------------------------------------------------------- */

const popupClasses = cn(
  "z-50 min-w-[12rem] max-h-[var(--available-height)] overflow-y-auto",
  "rounded-medium border border-gray-200 bg-white p-x-small",
  "text-gray-800 shadow-lg outline-none",
  "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100",
  // Open/close transition, anchored to the positioner's transform origin.
  "origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out",
  "data-starting-style:scale-95 data-starting-style:opacity-0",
  "data-ending-style:scale-95 data-ending-style:opacity-0",
);

export type MenuContentProps = MenuPrimitive.Popup.Props & {
  className?: string;
  /** Side of the trigger to render against. @default "bottom" */
  side?: MenuPrimitive.Positioner.Props["side"];
  /** Alignment along the trigger edge. @default "start" */
  align?: MenuPrimitive.Positioner.Props["align"];
  /** Gap between trigger and popup, in px. @default 4 */
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
};

export function MenuContent({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  ...props
}: MenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          className={cn(popupClasses, className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

/* -------------------------------------------------------------------------- */
/* Items                                                                      */
/* -------------------------------------------------------------------------- */

const itemVariants = cva(
  [
    "relative flex cursor-pointer select-none items-center gap-2",
    "rounded-small px-small py-[0.4375rem] text-small leading-none outline-none",
    "data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      /** Adds left padding so text aligns with items that have a leading icon. */
      inset: { true: "pl-large", false: "" },
    },
    defaultVariants: { inset: false },
  },
);

export type MenuItemProps = MenuPrimitive.Item.Props &
  VariantProps<typeof itemVariants> & {
    className?: string;
  };

export function MenuItem({ className, inset, ...props }: MenuItemProps) {
  return (
    <MenuPrimitive.Item
      className={cn(itemVariants({ inset, className }))}
      {...props}
    />
  );
}

const labelVariants = cva(
  "px-small py-x-small text-x-small font-medium text-gray-500 dark:text-gray-400",
  {
    variants: { inset: { true: "pl-large", false: "" } },
    defaultVariants: { inset: false },
  },
);

export type MenuLabelProps = MenuPrimitive.GroupLabel.Props &
  VariantProps<typeof labelVariants> & {
    className?: string;
  };

export function MenuLabel({ className, inset, ...props }: MenuLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      className={cn(labelVariants({ inset, className }))}
      {...props}
    />
  );
}

export type MenuSeparatorProps = MenuPrimitive.Separator.Props & {
  className?: string;
};

export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <MenuPrimitive.Separator
      className={cn(
        "-mx-x-small my-x-small h-px bg-gray-200 dark:bg-gray-700",
        className,
      )}
      {...props}
    />
  );
}

export type MenuShortcutProps = React.ComponentProps<"span">;

/** Right-aligned keyboard hint, e.g. `⌘B`. */
export function MenuShortcut({ className, ...props }: MenuShortcutProps) {
  return (
    <span
      className={cn(
        "ml-auto pl-medium text-x-small tracking-wide text-gray-400 dark:text-gray-500",
        className,
      )}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Submenu                                                                    */
/* -------------------------------------------------------------------------- */

export type MenuSubProps = MenuPrimitive.SubmenuRoot.Props;

export function MenuSub(props: MenuSubProps) {
  return <MenuPrimitive.SubmenuRoot {...props} />;
}

export type MenuSubTriggerProps = MenuPrimitive.SubmenuTrigger.Props &
  VariantProps<typeof itemVariants> & {
    className?: string;
  };

export function MenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      className={cn(
        itemVariants({ inset, className }),
        "data-popup-open:bg-gray-100 dark:data-popup-open:bg-gray-800",
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" aria-hidden="true" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

export type MenuSubContentProps = MenuPrimitive.Popup.Props & {
  className?: string;
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
};

export function MenuSubContent({
  className,
  align = "start",
  sideOffset = 0,
  ...props
}: MenuSubContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side="inline-end"
        align={align}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          className={cn(popupClasses, className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}
