import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

type AvatarSize = "small" | "base" | "medium" | "large";

/** Propagates the root `size` to `AvatarFallback` / `AvatarBadge`. */
const AvatarSizeContext = React.createContext<AvatarSize>("base");

const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center",
    "rounded-full align-middle select-none",
    "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  ],
  {
    variants: {
      size: {
        small: "size-6", // 24px
        base: "size-8", // 32px
        medium: "size-10", // 40px
        large: "size-12", // 48px
      },
    },
    defaultVariants: { size: "base" },
  },
);

export type AvatarProps = AvatarPrimitive.Root.Props &
  VariantProps<typeof avatarVariants> & {
    className?: string;
  };

export function Avatar({ size = "base", className, ...props }: AvatarProps) {
  const resolved = size ?? "base";
  return (
    <AvatarSizeContext.Provider value={resolved}>
      <AvatarPrimitive.Root
        data-size={resolved}
        className={cn(avatarVariants({ size, className }))}
        {...props}
      />
    </AvatarSizeContext.Provider>
  );
}

export type AvatarImageProps = AvatarPrimitive.Image.Props & {
  className?: string;
};

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      className={cn("size-full rounded-full object-cover", className)}
      {...props}
    />
  );
}

/** Initials text size per avatar size. */
const fallbackTextSize: Record<AvatarSize, string> = {
  small: "text-2x-small", // 10px
  base: "text-x-small", // 12px
  medium: "text-small", // 14px
  large: "text-base", // 16px
};

export type AvatarFallbackProps = AvatarPrimitive.Fallback.Props & {
  className?: string;
};

export function AvatarFallback({ className, ...props }: AvatarFallbackProps) {
  const size = React.useContext(AvatarSizeContext);
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full",
        "font-medium uppercase leading-none",
        fallbackTextSize[size],
        className,
      )}
      {...props}
    />
  );
}

/** Badge dot + icon size per avatar size. */
const badgeSize: Record<AvatarSize, string> = {
  small: "size-3 [&_svg]:size-2", // 12px / 8px
  base: "size-4 [&_svg]:size-2.5", // 16px / 10px
  medium: "size-5 [&_svg]:size-3", // 20px / 12px
  large: "size-6 [&_svg]:size-3.5", // 24px / 14px
};

export type AvatarBadgeProps = React.ComponentProps<"span"> & {
  className?: string;
};

export function AvatarBadge({ className, ...props }: AvatarBadgeProps) {
  const size = React.useContext(AvatarSizeContext);
  return (
    <span
      data-slot="avatar-badge"
      // Centered on the circle's lower-right edge (~45°), regardless of size.
      className={cn(
        "absolute left-[85%] top-[85%] -translate-x-1/2 -translate-y-1/2",
        "inline-flex items-center justify-center rounded-full",
        "bg-primary-600 text-white",
        "ring-2 ring-white dark:ring-gray-950",
        badgeSize[size],
        className,
      )}
      {...props}
    />
  );
}
