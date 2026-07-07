/**
 * Formats a date string into a human-readable format
 * @param date - Date string (e.g., "Jun 2024" or "2024-06-15")
 * @returns Formatted date string
 */
export const formatDate = (date: string): string => {
  // If already in readable format (e.g., "Jun 2024"), return as is
  if (/^[A-Za-z]{3}\s\d{4}$/.test(date)) {
    return date;
  }

  // Otherwise, parse and format
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return date;
  }
};

/**
 * Formats a duration string (e.g., "June 2025 - Present")
 * @param duration - Duration string
 * @returns Formatted duration
 */
export const formatDuration = (duration: string): string => {
  return duration;
};
