/**
 * Formats an ISO date string to a more readable format (e.g., "Apr 1, 2025")
 */
export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Gets a timestamp for a new incident
 */
export const getCurrentTimestamp = (): string => {
  return new Date().toISOString();
};