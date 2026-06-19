import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge only knows Tailwind's *default* scale names (`text-sm`,
 * `rounded-md`, ...). Forma 36 renames those scales to full words
 * (`text-medium`, `rounded-small`, `px-x-small`, `font-demi-bold`), so we
 * teach tailwind-merge about them. Without this, a class like `text-small`
 * (a font-size) would be mistaken for a text *color* and would wrongly
 * cancel out `text-white`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // font-size scale  → `text-medium`, `text-x-large`, ...
      text: [
        'small',
        'medium',
        'large',
        'x-large',
        '2x-large',
        '3x-large',
        '4x-large',
      ],
      // border-radius scale → `rounded-small`, `rounded-medium`, … `rounded-2x-large`
      // (`rounded-full` is already a tailwind-merge default, so it isn't listed)
      radius: ['small', 'medium', 'large', 'x-large', '2x-large'],
      // spacing scale → `px-small`, `gap-x-small`, `py-2x-large`, ...
      spacing: [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        '2x-large',
      ],
    },
    classGroups: {
      // font-weight scale → `font-demi-bold` (`font-normal`/`font-medium` known)
      'font-weight': [{ font: ['demi-bold'] }],
    },
  },
});

/**
 * Conditionally join class names and intelligently merge Tailwind utilities.
 *
 * `clsx` resolves conditional/array/object class inputs into a string, then
 * `twMerge` de-duplicates conflicting Tailwind classes so that consumer
 * overrides always win (e.g. `cn('px-large', 'px-small')` → `'px-small'`).
 *
 * This is what makes every component in the library extendable via `className`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
