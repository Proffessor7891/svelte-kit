/**
 * Formats an ISO date string to 'YYYY-MM-DD'.
 * @param isoDate - Date string in ISO format (e.g., "2017-11-04T19:09:56.428Z").
 * @returns Formatted date string (e.g., "2017-11-04").
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero
  return `${year}-${month}-${day}`;
}
