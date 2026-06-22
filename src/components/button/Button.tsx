import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";
import { LoaderCircleIcon } from "lucide-react";
import { cn } from "../../utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "select-none whitespace-nowrap align-middle",
    "rounded-medium border font-medium",
    "cursor-pointer transition-colors duration-100 ease-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
    "focus-visible:ring-offset-1 ring-offset-white dark:ring-offset-gray-950",
    "disabled:cursor-not-allowed disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "border-transparent bg-primary-600 text-white",
          "enabled:hover:bg-primary-700 enabled:active:bg-primary-800",
          "dark:enabled:hover:bg-primary-500 dark:enabled:active:bg-primary-400",
        ],
        secondary: [
          "border-gray-300 bg-white text-gray-800",
          "enabled:hover:bg-gray-100 enabled:active:bg-gray-200",
          "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100",
          "dark:enabled:hover:bg-gray-700 dark:enabled:active:bg-gray-600",
        ],
        positive: [
          "border-transparent bg-positive-600 text-white",
          "enabled:hover:bg-positive-700 enabled:active:bg-positive-800",
          "dark:enabled:hover:bg-positive-500 dark:enabled:active:bg-positive-400",
        ],
        negative: [
          "border-transparent bg-negative-600 text-white",
          "enabled:hover:bg-negative-700 enabled:active:bg-negative-800",
          "dark:enabled:hover:bg-negative-500 dark:enabled:active:bg-negative-400",
        ],
        transparent: [
          "border-transparent bg-transparent text-gray-800",
          "enabled:hover:bg-gray-100 enabled:active:bg-gray-200",
          "dark:text-gray-100",
          "dark:enabled:hover:bg-gray-800 dark:enabled:active:bg-gray-700",
        ],
      },
      size: {
        small: "h-8 px-small text-x-small",
        medium: "h-10 px-medium text-small",
        large: "h-12 px-medium text-base",
      },
      isFullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "medium",
      isFullWidth: false,
    },
  },
);

export type ButtonProps = ButtonPrimitive.Props & {
  variant?: "primary" | "secondary" | "positive" | "negative" | "transparent";
  size?: "small" | "medium" | "large";
  isFullWidth?: boolean;
  className?: string;
  /** Disable interaction. Maps to the native `disabled` attribute. */
  isDisabled?: boolean;
  /** Show a spinner and block interaction while an action is in flight. */
  isLoading?: boolean;
  /** Element rendered before the label (replaced by the spinner while loading). */
  startIcon?: React.ReactNode;
  /** Element rendered after the label. */
  endIcon?: React.ReactNode;
};

export function Button({
  className,
  variant,
  size,
  isFullWidth,
  isDisabled = false,
  isLoading = false,
  startIcon,
  endIcon,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      type={type}
      disabled={isDisabled || isLoading || disabled}
      aria-busy={isLoading || undefined}
      data-variant={variant ?? "secondary"}
      data-loading={isLoading || undefined}
      className={cn(buttonVariants({ variant, size, isFullWidth, className }))}
      {...props}
    >
      {isLoading ? (
        <LoaderCircleIcon className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        startIcon
      )}
      {children}
      {endIcon}
    </ButtonPrimitive>
  );
}
