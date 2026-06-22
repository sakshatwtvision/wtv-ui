import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const textareaVariants = cva(
  [
    "m-0 box-border w-full resize-none font-sans",
    "rounded-medium border bg-white text-gray-700",
    // base field font size (14px)
    "text-small",
    // Focus treatment mirrors TextInput: a focus-visible ring, no Forma glow/shadow.
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
        // padding `spacingXs` (8px) — matches TextInput small horizontal padding
        small: "min-h-16 px-x-small py-x-small",
        // padding `spacingS` horizontal, `spacingXs` vertical
        medium: "min-h-20 px-small py-x-small",
        // padding `spacingM` (16px); bumps font to 16px to match TextInput large
        large: "min-h-24 px-medium py-small text-base",
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

export type TextareaProps = Omit<
  InputPrimitive.Props,
  "defaultValue" | "size" | "type"
> & {
  size?: "small" | "medium" | "large";
  className?: string;
  /** Default value for an uncontrolled textarea. */
  defaultValue?: string;
  /** Applies disabled styles. Maps to the native `disabled` attribute. */
  isDisabled?: boolean;
  /** Applies invalid styles and sets `aria-invalid`. */
  isInvalid?: boolean;
  /** Applies read-only styles. Maps to the native `readOnly` attribute. */
  isReadOnly?: boolean;
  /** Marks the field as required (`required` + `aria-required`). */
  isRequired?: boolean;
  /** Visible number of text lines. */
  rows?: number;
  /** `data-testid` applied to the textarea. */
  testId?: string;
  /** Blur the textarea when the Escape key is pressed. */
  willBlurOnEsc?: boolean;
};

export function Textarea({
  className,
  size,
  isInvalid = false,
  isDisabled = false,
  isReadOnly = false,
  isRequired = false,
  rows = 3,
  testId = "cf-ui-textarea",
  willBlurOnEsc = true,
  disabled,
  onKeyDown,
  ...props
}: TextareaProps) {
  const handleKeyDown: NonNullable<InputPrimitive.Props["onKeyDown"]> = (
    event,
  ) => {
    onKeyDown?.(event);
    if (willBlurOnEsc && event.key === "Escape") {
      event.currentTarget.blur();
    }
  };

  return (
    <InputPrimitive
      render={<textarea rows={rows} />}
      disabled={isDisabled || disabled}
      readOnly={isReadOnly}
      required={isRequired}
      aria-invalid={isInvalid || undefined}
      data-invalid={isInvalid || undefined}
      data-testid={testId}
      onKeyDown={handleKeyDown}
      className={cn(textareaVariants({ size, isInvalid }), className)}
      {...props}
    />
  );
}
