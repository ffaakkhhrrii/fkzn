import clsx, { ClassValue } from 'clsx';

/**
 * Utility function to merge class names
 * Combines clsx for conditional classes
 * @param inputs - Class names to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
