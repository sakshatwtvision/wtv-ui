import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cn } from "../../utils/cn";

export type SeparatorProps = SeparatorPrimitive.Props & {
  className?: string;
  /** Label rendered in the center of the separator line, e.g. `"OR"`. */
  text?: React.ReactNode;
  testId?: string;
};

export function Separator({
  orientation = "horizontal",
  text,
  className,
  testId,
  ...props
}: SeparatorProps) {
  const isHorizontal = orientation === "horizontal";

  // Shared classes for the line segment(s).
  // border-t/border-l render more consistently than h-px/w-px at fractional DPR values.
  const lineClass = cn(
    "shrink-0 border-gray-300 dark:border-gray-700",
    isHorizontal ? "flex-1 border-t" : "flex-1 border-l",
  );

  if (!text) {
    return (
      <SeparatorPrimitive
        orientation={orientation}
        data-testid={testId}
        className={cn(
          "shrink-0 border-gray-300 dark:border-gray-700",
          isHorizontal ? "w-full border-t" : "self-stretch border-l",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <SeparatorPrimitive
      orientation={orientation}
      data-testid={testId}
      className={cn(
        "flex shrink-0 items-center",
        isHorizontal
          ? "w-full flex-row gap-x-small"
          : "h-full flex-col gap-y-small",
        className,
      )}
      {...props}
    >
      <span className={lineClass} aria-hidden="true" />
      <span
        className={cn(
          "shrink-0 select-none text-small text-gray-500 dark:text-gray-400",
          // Rotate the label for vertical separators so it reads naturally.
          !isHorizontal && "-rotate-90",
        )}
      >
        {text}
      </span>
      <span className={lineClass} aria-hidden="true" />
    </SeparatorPrimitive>
  );
}
