import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textVariants = cva("", {
  variants: {
    size: {
      "2x-small": "text-2x-small", // 10px
      "x-small": "text-x-small", // 12px
      small: "text-small", // 14px
      base: "text-base", // 16px
      medium: "text-medium", // 18px
      large: "text-large", // 20px
      "x-large": "text-x-large", // 24px
      "2x-large": "text-2x-large", // 28px
      "3x-large": "text-3x-large", // 32px
      "4x-large": "text-4x-large", // 40px
    },
    weight: {
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    wrap: {
      wrap: "text-wrap",
      nowrap: "text-nowrap",
      pretty: "text-pretty",
      balance: "text-balance",
    },
    variant: {
      default: "",
      muted: "text-gray-500 dark:text-gray-400",
      primary: "text-primary-600 dark:text-primary-400",
      positive: "text-positive-600 dark:text-positive-400",
      negative: "text-negative-600 dark:text-negative-400",
      warning: "text-warning-600 dark:text-warning-400",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    variant: "default",
  },
});

export type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: "span" | "div" | "p";
    className?: string;
  };

export function Text({
  as: Tag = "p",
  size,
  weight,
  align,
  wrap,
  variant,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        textVariants({ size, weight, align, wrap, variant, className }),
      )}
      {...props}
    />
  );
}
