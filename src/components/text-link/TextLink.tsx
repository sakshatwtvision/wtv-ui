import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textLinkVariants = cva(
  [
    "inline-flex items-center gap-1",
    "underline decoration-current underline-offset-2",
    "cursor-pointer rounded-small transition-colors duration-100",
    "outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
    "focus-visible:ring-offset-1 ring-offset-white dark:ring-offset-gray-950",
    // pointer-events-none blocks hover styles automatically, so no per-variant
    // disabled overrides are needed.
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-primary-600 hover:text-primary-700",
          "dark:text-primary-400 dark:hover:text-primary-300",
        ],
        secondary: [
          "text-gray-700 hover:text-gray-900",
          "dark:text-gray-300 dark:hover:text-gray-100",
        ],
        positive: [
          "text-positive-600 hover:text-positive-700",
          "dark:text-positive-400 dark:hover:text-positive-300",
        ],
        negative: [
          "text-negative-600 hover:text-negative-700",
          "dark:text-negative-400 dark:hover:text-negative-300",
        ],
        white: [
          "text-white hover:text-gray-200",
          "dark:text-white dark:hover:text-gray-200",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type TextLinkProps = ButtonPrimitive.Props &
  VariantProps<typeof textLinkVariants> & {
    className?: string;
    /** The URL the link navigates to. Omit for button-as-link patterns. */
    href?: string;
    /** Anchor target. `_blank` automatically adds `rel="noopener noreferrer"`. */
    target?: string;
    /** Overrides the auto-computed `rel` attribute. */
    rel?: string;
    /** Icon element (from lucide-react). Sized to `1em` so it scales with text. */
    icon?: React.ReactElement;
    /** Whether the icon appears before (`start`) or after (`end`) the label. */
    alignIcon?: "start" | "end";
    isDisabled?: boolean;
    testId?: string;
  };

export function TextLink({
  className,
  variant,
  href,
  target,
  rel,
  icon,
  alignIcon = "end",
  isDisabled = false,
  testId,
  children,
  disabled,
  render,
  ...props
}: TextLinkProps) {
  const resolvedRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  // Prefer an explicit `render` prop; fall back to <a> when href is given;
  // otherwise let ButtonPrimitive default to <button> (button-as-link pattern).
  const renderEl =
    render ?? (href !== undefined ? <a href={href} target={target} rel={resolvedRel} /> : undefined);

  return (
    <ButtonPrimitive
      render={renderEl}
      disabled={isDisabled || disabled}
      data-testid={testId}
      data-variant={variant ?? "primary"}
      className={cn(textLinkVariants({ variant, className }))}
      {...props}
    >
      {icon && alignIcon === "start" && (
        <span className="inline-flex [&_svg]:size-[1em]" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
      {icon && alignIcon !== "start" && (
        <span className="inline-flex [&_svg]:size-[1em]" aria-hidden="true">
          {icon}
        </span>
      )}
    </ButtonPrimitive>
  );
}
