import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge only knows Tailwind's *default* scale names (`text-sm`,
 * `rounded-md`, ...). Forma 36 renames those scales to full words
 * (`text-medium`, `rounded-small`, `px-x-small`), so we teach tailwind-merge
 * about them. Without this, a class like `text-small` (a font-size) would be
 * mistaken for a text *color* and would wrongly cancel out `text-white`.
 *
 * Font weights use Tailwind's standard names (`font-medium`, `font-semibold`,
 * …), which tailwind-merge already knows — so no font-weight extension here.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // font-size scale  → `text-medium`, `text-x-large`, ...
      text: [
        '2x-small',
        'x-small',
        'small',
        'base',
        'medium',
        'large',
        'x-large',
        '2x-large',
        '3x-large',
        '4x-large',
      ],
      // border-radius scale → `rounded-x-small`, `rounded-small`, … `rounded-2x-large`
      // (`rounded-none` / `rounded-full` are tailwind-merge defaults, so omitted)
      radius: ['x-small', 'small', 'medium', 'large', 'x-large', '2x-large'],
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
