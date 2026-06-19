import * as React from "react";
import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { RadioGroupCtx } from "./RadioGroupContext";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadioProps = Omit<RadioPrimitive.Root.Props, "onChange"> & {
  "aria-label"?: string;
  className?: string;
  children?: React.ReactNode;
  /** Uncontrolled initial selected state (standalone use only). */
  defaultChecked?: boolean;
  density?: "low" | "high";
  helpText?: string;
  id?: string;
  /** Controlled selected state (standalone use only). */
  isChecked?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  /** Fires with `true` when selected (standalone use only). */
  onChange?: (checked: boolean) => void;
  testId?: string;
};

// ─── Inner control (always rendered inside some RadioGroup context) ───────────

type RadioItemProps = Omit<RadioProps, "isChecked" | "defaultChecked" | "onChange">;

function RadioItem({
  "aria-label": ariaLabel,
  className,
  children,
  density,
  helpText,
  id,
  isDisabled = false,
  isInvalid = false,
  isRequired = false,
  testId,
  disabled,
  value,
  ...props
}: RadioItemProps) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer select-none items-center",
        density === "high" ? "gap-x-1.5" : "gap-x-2",
        (isDisabled || disabled) && "cursor-not-allowed opacity-60",
        // Picks up disabled state propagated from a parent RadioGroup via data-disabled
        "has-[[data-disabled]]:cursor-not-allowed has-[[data-disabled]]:opacity-60",
        className,
      )}
      data-testid={testId}
    >
      <RadioPrimitive.Root
        value={value}
        disabled={isDisabled || disabled}
        required={isRequired}
        id={id}
        aria-label={ariaLabel}
        aria-invalid={isInvalid || undefined}
        data-invalid={isInvalid || undefined}
        className={cn(
          "relative size-[18px] shrink-0 cursor-pointer rounded-full border-2",
          "transition-colors duration-100",
          "outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1",
          "ring-offset-white dark:ring-offset-gray-950",
          // Unchecked
          "border-gray-400 bg-white",
          "dark:border-gray-600 dark:bg-gray-900",
          // Checked — Base UI sets data-checked="" when this item is selected
          "data-[checked]:border-primary-600 data-[checked]:bg-primary-600",
          "dark:data-[checked]:border-primary-500 dark:data-[checked]:bg-primary-500",
          // Disabled — Base UI sets data-disabled="" when group or item is disabled
          "data-[disabled]:cursor-not-allowed",
          // Invalid
          isInvalid && ["border-negative-600", "dark:border-negative-500"],
        )}
        {...props}
      >
        <RadioPrimitive.Indicator className="absolute inset-0 flex items-center justify-center">
          <span className="size-[6px] rounded-full bg-white" aria-hidden />
        </RadioPrimitive.Indicator>
      </RadioPrimitive.Root>

      {(children || helpText) && (
        <span className="flex flex-col gap-0.5">
          {children && (
            <span
              className={cn(
                "text-medium leading-[18px] text-gray-800",
                "dark:text-gray-100",
                isInvalid && "text-negative-600 dark:text-negative-400",
              )}
            >
              {children}
            </span>
          )}
          {helpText && (
            <span className="text-small text-gray-500 dark:text-gray-400">{helpText}</span>
          )}
        </span>
      )}
    </label>
  );
}

// ─── Standalone wrapper (manages own RadioGroup context) ──────────────────────

function StandaloneRadio({
  value: valueProp,
  isChecked,
  defaultChecked = false,
  onChange,
  isDisabled,
  disabled,
  ...rest
}: RadioProps) {
  // Use a stable sentinel when value is omitted so the group has something to match.
  const radioValue = valueProp ?? "__radio__";

  const [internalValue, setInternalValue] = React.useState<string>(
    defaultChecked ? radioValue : "",
  );

  // Controlled: isChecked drives visual state; uncontrolled: internalValue does.
  const groupValue =
    isChecked !== undefined ? (isChecked ? radioValue : "") : internalValue;

  return (
    <RadioGroupPrimitive
      value={groupValue}
      onValueChange={(v) => {
        if (isChecked === undefined) setInternalValue(v);
        onChange?.(v === radioValue);
      }}
      disabled={isDisabled || disabled}
    >
      <RadioItem value={radioValue} isDisabled={isDisabled} disabled={disabled} {...rest} />
    </RadioGroupPrimitive>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

/**
 * A single radio button.
 *
 * **Standalone use** — pass `defaultChecked` (uncontrolled) or `isChecked` +
 * `onChange` (controlled). The radio manages its own RadioGroup context.
 *
 * **Group use** — place inside a `<RadioGroup>`. The group manages which value
 * is selected; `isChecked` / `defaultChecked` / `onChange` are ignored.
 */
export function Radio(props: RadioProps) {
  const inGroup = React.useContext(RadioGroupCtx);

  if (!inGroup) {
    return <StandaloneRadio {...props} />;
  }

  // Strip standalone-only props before passing to the inner control.
  const { isChecked: _ic, defaultChecked: _dc, onChange: _oc, ...rest } = props;
  return <RadioItem {...rest} />;
}
