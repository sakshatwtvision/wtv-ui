import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import { cn } from "../../utils/cn";

export type CheckboxProps = {
  "aria-label"?: string;
  className?: string;
  children?: React.ReactNode;
  defaultChecked?: boolean;
  density?: "low" | "high";
  helpText?: string;
  id?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isIndeterminate?: boolean;
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

export function Checkbox({
  "aria-label": ariaLabel,
  className,
  children,
  defaultChecked,
  density,
  helpText,
  id,
  isChecked,
  isDisabled = false,
  isIndeterminate = false,
  isInvalid = false,
  isRequired = false,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  testId,
  value,
}: CheckboxProps) {
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
      <CheckboxPrimitive.Root
        {...(isChecked !== undefined ? { checked: isChecked } : {})}
        defaultChecked={defaultChecked}
        indeterminate={isIndeterminate}
        disabled={isDisabled}
        required={isRequired}
        name={name}
        value={value}
        id={id}
        aria-label={ariaLabel}
        aria-invalid={isInvalid || undefined}
        onCheckedChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        data-invalid={isInvalid || undefined}
        className={cn(
          // Layout
          "relative size-[18px] shrink-0 cursor-pointer rounded-medium border",
          "transition-colors duration-100",
          // Focus ring
          "outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1",
          "ring-offset-white dark:ring-offset-gray-950",
          // Unchecked — light / dark
          "border-gray-400 bg-white",
          "dark:border-gray-600 dark:bg-gray-900",
          // Checked — Base UI sets data-checked="" (presence flag, not data-state)
          "data-[checked]:border-primary-600 data-[checked]:bg-primary-600",
          "dark:data-[checked]:border-primary-500 dark:data-[checked]:bg-primary-500",
          // Indeterminate — Base UI sets data-indeterminate="" (presence flag)
          "data-[indeterminate]:border-primary-600 data-[indeterminate]:bg-primary-600",
          "dark:data-[indeterminate]:border-primary-500 dark:data-[indeterminate]:bg-primary-500",
          // Invalid — red border replaces gray; hover darkens it
          isInvalid && ["border-negative-600", "dark:border-negative-500"],
        )}
      >
        <CheckboxPrimitive.Indicator className="absolute inset-0 flex items-center justify-center text-white">
          {isIndeterminate ? (
            <MinusIcon className="size-3" strokeWidth={3} aria-hidden />
          ) : (
            <CheckIcon className="size-3" strokeWidth={3} aria-hidden />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

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
