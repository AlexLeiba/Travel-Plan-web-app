import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Clsx - to add classes conditionally | Useful for dynamically applying Tailwind classes based on state/props. But it doesn resolve class conflicts (if we have more clasnames with same name)
//TMerge - to merge classes with conflicts (CONFLICT RESOLVER CLASS)
