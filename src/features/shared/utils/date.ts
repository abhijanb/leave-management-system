import { format, differenceInCalendarDays, parseISO } from "date-fns";

export function daysBetween(start: string, end: string) {
  return differenceInCalendarDays(parseISO(end), parseISO(start)) + 1;
}

export function formatDate(d: string) {
  return format(parseISO(d), "MMM d, yyyy");
}
