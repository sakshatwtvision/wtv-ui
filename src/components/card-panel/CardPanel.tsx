import * as React from "react";
import { cn } from "../../utils/cn";

export type CardPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function CardPanel({ className, children, ...props }: CardPanelProps) {
  return (
    <div
      className={cn(
        "rounded-large bg-white shadow-default dark:bg-gray-800 p-large",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
