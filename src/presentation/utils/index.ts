// Utility functions for the Presentation Layer

/**
 * Converts a TaskStatus string to a more readable, translated label.
 * @param status The status string ('todo', 'in_progress', 'done')
 * @returns The translation key for the status.
 */
export const getStatusTranslationKey = (status: string): string => {
  switch (status) {
    case 'todo':
      return 'status_todo';
    case 'in_progress':
      return 'status_in_progress';
    case 'done':
      return 'status_done';
    default:
      return 'status_todo';
  }
};

/**
 * Simple function to format a date string.
 * @param dateString The date string to format.
 * @returns A formatted date string.
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
