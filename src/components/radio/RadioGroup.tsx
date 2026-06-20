import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { RadioGroupCtx } from "./Radio";
import { cn } from "../../utils/cn";

// Omit the native div `onChange` to replace it with Forma's value-based signature.
export type RadioGroupProps = Omit<RadioGroupPrimitive.Props, "onChange"> & {
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  direction?: "column" | "row";
  testId?: string;
  onChange?: (value: string) => void;
};

export function RadioGroup({
  className,
  isDisabled,
  isRequired,
  direction = "column",
  testId,
  disabled,
  required,
  onValueChange,
  onChange,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupCtx.Provider value={true}>
      <RadioGroupPrimitive
        disabled={isDisabled || disabled}
        required={isRequired || required}
        onValueChange={onChange ? (val) => onChange(val) : onValueChange}
        data-testid={testId}
        className={cn(
          "flex",
          direction === "row"
            ? "flex-row flex-wrap gap-medium"
            : "flex-col gap-small",
          className,
        )}
        {...props}
      >
        {children}
      </RadioGroupPrimitive>
    </RadioGroupCtx.Provider>
  );
}
