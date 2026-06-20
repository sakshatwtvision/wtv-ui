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
  const lineClass = cn(
    "shrink-0 bg-gray-300 dark:bg-gray-700",
    isHorizontal ? "h-px flex-1" : "w-px flex-1",
  );

  if (!text) {
    return (
      <SeparatorPrimitive
        orientation={orientation}
        data-testid={testId}
        className={cn(
          "shrink-0 bg-gray-300 dark:bg-gray-700",
          isHorizontal ? "h-px w-full" : "w-px self-stretch",
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
