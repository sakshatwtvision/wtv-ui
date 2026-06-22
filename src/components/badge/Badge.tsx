import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center font-medium select-none whitespace-nowrap",
    "rounded-medium",
  ],
  {
    variants: {
      variant: {
        default: "",
        filled: "",
      },
      color: {
        gray: "",
        blue: "",
        green: "",
        red: "",
        orange: "",
        yellow: "",
        purple: "",
      },
      size: {
        small: "h-5 gap-0.5 px-x-small text-x-small [&_svg]:size-3",
        medium: "h-6 gap-1 px-small text-x-small [&_svg]:size-3",
        large: "h-7 gap-1 px-small text-small [&_svg]:size-3.5",
      },
    },
    compoundVariants: [
      // default — tinted background, dark text; accessible contrast on 100→700 pairing
      { variant: "default", color: "gray",   className: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" },
      { variant: "default", color: "blue",   className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
      { variant: "default", color: "green",  className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
      { variant: "default", color: "red",    className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
      { variant: "default", color: "orange", className: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
      // yellow-800 on yellow-100 for WCAG AA contrast (yellow-700 is borderline)
      { variant: "default", color: "yellow", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300" },
      { variant: "default", color: "purple", className: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },

      // filled — solid background, white text; yellow uses dark text (white on yellow fails WCAG AA)
      { variant: "filled", color: "gray",   className: "bg-gray-600 text-white dark:bg-gray-500" },
      { variant: "filled", color: "blue",   className: "bg-blue-600 text-white dark:bg-blue-500" },
      { variant: "filled", color: "green",  className: "bg-green-600 text-white dark:bg-green-500" },
      { variant: "filled", color: "red",    className: "bg-red-600 text-white dark:bg-red-500" },
      { variant: "filled", color: "orange", className: "bg-orange-600 text-white dark:bg-orange-500" },
      { variant: "filled", color: "yellow", className: "bg-yellow-400 text-yellow-950 dark:bg-yellow-500 dark:text-yellow-950" },
      { variant: "filled", color: "purple", className: "bg-purple-600 text-white dark:bg-purple-500" },
    ],
    defaultVariants: {
      variant: "default",
      color: "blue",
      size: "medium",
    },
  },
);

// Omit HTML's legacy `color` attribute so our `color` prop takes its place cleanly.
export type BadgeProps = Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> & {
  variant?: "default" | "filled";
  color?: "gray" | "blue" | "green" | "red" | "orange" | "yellow" | "purple";
  size?: "small" | "medium" | "large";
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export function Badge({
  className,
  variant,
  color,
  size,
  startIcon,
  endIcon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, color, size, className }))}
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
    </span>
  );
}
