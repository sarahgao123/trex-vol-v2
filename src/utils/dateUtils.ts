/**
 * Convert local datetime to UTC ISO string for database storage
 */
export function toUTCString(localDateTime: string | null): string | null {
  if (!localDateTime) return null;
  return new Date(localDateTime).toISOString();
}

/**
 * Convert UTC datetime to local datetime string for form inputs
 */
export function toLocalDateTimeString(utcDateTime: string | null): string {
  if (!utcDateTime) return '';
  const date = new Date(utcDateTime);
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .slice(0, 16);
}

/**
 * Format UTC datetime to local display string
 */
export function formatLocalDateTime(utcDateTime: string | null): string {
  if (!utcDateTime) return '';
  return new Date(utcDateTime).toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Check if a time slot is currently active
 */
export function isTimeSlotActive(startTime: string | null, endTime: string | null): boolean {
  if (!startTime || !endTime) return true; // Flexible time slots are always active
  
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  return now >= start && now <= end;
}