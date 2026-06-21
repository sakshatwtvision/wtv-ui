import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textVariants = cva("", {
  variants: {
    size: {
      "x-small":  "text-[0.6875rem]", // 11px — below token scale
      "small":    "text-small",        // 12px
      "base":     "text-medium",       // 14px — body default
      "medium":   "text-large",        // 16px
      "large":    "text-x-large",      // 20px
      "x-large":  "text-2x-large",     // 24px
      "2x-large": "text-3x-large",     // 36px
      "3x-large": "text-4x-large",     // 48px
      "4x-large": "text-[4rem]",       // 64px — above token scale
    },
    weight: {
      thin:       "font-thin",
      extralight: "font-extralight",
      light:      "font-light",
      normal:     "font-normal",
      medium:     "font-medium",
      semibold:   "font-semibold",
      bold:       "font-bold",
      extrabold:  "font-extrabold",
      black:      "font-black",
    },
    align: {
      left:   "text-left",
      center: "text-center",
      right:  "text-right",
    },
    wrap: {
      wrap:    "text-wrap",
      nowrap:  "text-nowrap",
      pretty:  "text-pretty",
      balance: "text-balance",
    },
    color: {
      default:  "",
      muted:    "text-gray-500 dark:text-gray-400",
      primary:  "text-primary-600 dark:text-primary-400",
      positive: "text-positive-600 dark:text-positive-400",
      negative: "text-negative-600 dark:text-negative-400",
      warning:  "text-warning-600 dark:text-warning-400",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    color: "default",
  },
});

export type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    /** Rendered element. Defaults to "p". */
    as?: "span" | "div" | "p";
    className?: string;
  };

export function Text({
  as: Tag = "p",
  size,
  weight,
  align,
  wrap,
  color,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(textVariants({ size, weight, align, wrap, color, className }))}
      {...props}
    />
  );
}
