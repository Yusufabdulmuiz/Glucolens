import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely.
 * Handles conditional classes and conflicts (e.g., 'bg-red-500' overrides 'bg-blue-500').
 * * @param inputs - List of class strings or conditional objects.
 * @returns A single merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}