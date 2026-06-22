import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva } from "class-variance-authority";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "../../utils/cn";

const textInputVariants = cva(
  [
    "m-0 box-border w-full font-sans",
    "rounded-medium border bg-white text-gray-700",
    // base field font size (14px)
    "text-small",
    // Focus treatment mirrors Button: a focus-visible ring, no Forma glow/shadow.
    "outline-none transition-colors duration-100 ease-out",
    "focus-visible:ring-2 focus-visible:ring-blue-400",
    "focus-visible:ring-offset-1 ring-offset-white dark:ring-offset-gray-950",
    "placeholder:text-gray-500",
    "dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500",
    // Forma fills the field gray and blocks the cursor when disabled
    "disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800",
  ],
  {
    variants: {
      size: {
        // height 32px, padding `spacingXs` (8px)
        small: "h-8 px-x-small",
        // height 40px, padding `10px spacingS` → 12px horizontal
        medium: "h-10 px-small",
        // height 48px, padding `spacingM` (16px); bumps font to 16px to match Button's large
        large: "h-12 px-medium text-base",
      },
      isInvalid: {
        true: "border-negative-600",
        false: "border-gray-300 dark:border-gray-700",
      },
    },
    defaultVariants: {
      size: "medium",
      isInvalid: false,
    },
  },
);

// Per-size adornment geometry. Tailwind needs full literal class names (no
// interpolation), so each size carries its complete set: how far the icon sits
// from the edge, how much text padding clears it, and how big the icon renders.
// Insets/padding step in lockstep with the cva `px-*` so the icon stays optically
// centered in the field's horizontal padding at every size.
const sizeAdornments = {
  small: {
    iconStart: "left-x-small",
    iconEnd: "right-x-small",
    padStart: "pl-x-large",
    padEnd: "pr-x-large",
    iconSize: "[&_svg]:size-4",
  },
  medium: {
    iconStart: "left-small",
    iconEnd: "right-small",
    padStart: "pl-x-large",
    padEnd: "pr-x-large",
    iconSize: "[&_svg]:size-4",
  },
  large: {
    iconStart: "left-medium",
    iconEnd: "right-medium",
    padStart: "pl-2x-large",
    padEnd: "pr-2x-large",
    iconSize: "[&_svg]:size-5",
  },
} as const;

export type TextInputProps = Omit<InputPrimitive.Props, "defaultValue" | "size"> & {
  size?: "small" | "medium" | "large";
  className?: string;
  /** Default value for an uncontrolled input. */
  defaultValue?: string;
  /** Applies disabled styles. Maps to the native `disabled` attribute. */
  isDisabled?: boolean;
  /** Applies invalid styles and sets `aria-invalid`. */
  isInvalid?: boolean;
  /** Applies read-only styles. Maps to the native `readOnly` attribute. */
  isReadOnly?: boolean;
  /** Marks the field as required (`required` + `aria-required`). */
  isRequired?: boolean;
  /** Icon rendered inside the field, before the text. */
  icon?: React.ReactNode;
  /** Icon rendered inside the field, after the text. Ignored when `type="password"` — the visibility toggle occupies that slot. */
  endIcon?: React.ReactNode;
  /** `data-testid` applied to the input. */
  testId?: string;
  /** Blur the input when the Escape key is pressed. */
  willBlurOnEsc?: boolean;
};

export function TextInput({
  className,
  size,
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  icon,
  endIcon,
  testId = "cf-ui-text-input",
  willBlurOnEsc = true,
  type = "text",
  disabled,
  onKeyDown,
  ...props
}: TextInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;
  const hasEndSlot = isPassword || !!endIcon;
  const adornments = sizeAdornments[size ?? "medium"];

  const handleKeyDown: NonNullable<InputPrimitive.Props["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    if (willBlurOnEsc && event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  const input = (
    <InputPrimitive
      type={resolvedType}
      disabled={isDisabled || disabled}
      readOnly={isReadOnly}
      required={isRequired}
      aria-invalid={isInvalid || undefined}
      data-invalid={isInvalid || undefined}
      data-testid={testId}
      onKeyDown={handleKeyDown}
      className={cn(
        textInputVariants({ size, isInvalid }),
        icon && adornments.padStart,
        hasEndSlot && adornments.padEnd,
        className,
      )}
      {...props}
    />
  );

  if (!icon && !hasEndSlot) return input;

  return (
    <div className="relative flex w-full">
      {input}

      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 flex items-center text-gray-600 dark:text-gray-400",
            adornments.iconSize,
            adornments.iconStart,
          )}
        >
          {icon}
        </span>
      )}

      {isPassword ? (
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          disabled={isDisabled || disabled}
          onClick={() => setShowPassword((v) => !v)}
          className={cn(
            "absolute inset-y-0 flex cursor-pointer items-center text-gray-500",
            "hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
            "outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            adornments.iconSize,
            adornments.iconEnd,
          )}
        >
          {showPassword ? <EyeIcon aria-hidden /> : <EyeOffIcon aria-hidden />}
        </button>
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 flex items-center text-gray-600 dark:text-gray-400",
            adornments.iconSize,
            adornments.iconEnd,
          )}
        >
          {endIcon}
        </span>
      )}
    </div>
  );
}
