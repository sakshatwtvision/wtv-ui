import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

// ─── Variants ───────────────────────────────────────────────────────────────

const trackVariants = cva(
  [
    // Layout
    "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5",
    "transition-colors duration-100",
    // Focus ring
    "outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1",
    "ring-offset-white dark:ring-offset-gray-950",
    // Off (unchecked)
    "bg-gray-300 dark:bg-gray-700",
    // On — Base UI sets data-checked="" (presence flag, not data-state)
    "data-[checked]:bg-primary-600 dark:data-[checked]:bg-primary-500",
    // Base UI sets data-disabled="" when disabled
    "data-[disabled]:cursor-not-allowed",
  ],
  {
    variants: {
      size: {
        base: "h-5 w-9",
        small: "h-4 w-7",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

const thumbVariants = cva(
  [
    "pointer-events-none block translate-x-0 rounded-full bg-white shadow-sm",
    "transition-transform duration-100 ease-out",
  ],
  {
    variants: {
      size: {
        base: "size-4 data-[checked]:translate-x-4",
        small: "size-3 data-[checked]:translate-x-3",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export type SwitchProps = {
  size?: "base" | "small";
  "aria-label"?: string;
  className?: string;
  children?: React.ReactNode;
  defaultChecked?: boolean;
  density?: "low" | "high";
  helpText?: string;
  id?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLSpanElement>;
  onChange?: (checked: boolean) => void;
  onFocus?: React.FocusEventHandler<HTMLSpanElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLSpanElement>;
  testId?: string;
  value?: string;
};

export function Switch({
  "aria-label": ariaLabel,
  className,
  children,
  defaultChecked,
  density,
  helpText,
  id,
  isChecked,
  isDisabled = false,
  isInvalid = false,
  isRequired = false,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  size,
  testId,
  value,
}: SwitchProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer select-none items-center",
        density === "high" ? "gap-x-1.5" : "gap-x-2",
        isDisabled && "cursor-not-allowed opacity-60",
        className,
      )}
      data-testid={testId}
    >
      <SwitchPrimitive.Root
        {...(isChecked !== undefined ? { checked: isChecked } : {})}
        defaultChecked={defaultChecked}
        disabled={isDisabled}
        required={isRequired}
        name={name}
        value={value}
        id={id}
        aria-label={ariaLabel}
        aria-invalid={isInvalid || undefined}
        data-invalid={isInvalid || undefined}
        onCheckedChange={(checked) => onChange?.(checked)}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className={cn(
          trackVariants({ size }),
          // Invalid — red ring replaces nothing else, no layout shift
          isInvalid && ["ring-2 ring-negative-600 dark:ring-negative-500"],
        )}
      >
        <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
      </SwitchPrimitive.Root>

      {(children || helpText) && (
        <span className="flex flex-col gap-0.5">
          {children && (
            <span
              className={cn(
                "text-base leading-[18px] text-gray-800",
                "dark:text-gray-100",
                isInvalid && "text-negative-600 dark:text-negative-400",
              )}
            >
              {children}
            </span>
          )}
          {helpText && (
            <span className="text-small text-gray-500 dark:text-gray-400">
              {helpText}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
