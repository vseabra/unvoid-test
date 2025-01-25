import { Time, Weekday } from '../types';

/**
 * createDateFromTimeAndWeekday
 *
 * Converts a specific time and weekday to a precise Date object.
 *
 * This function creates a Date that represents the given time on the specified
 * weekday, It's useful for converting abstract time representations to concrete
 * date objects.
 *
 * @example // Creates a Date for next Tuesday at 2:30 PM const appointmentDate
 * = createDateFromTimeAndWeekday( { hours: 14, minutes: 30 }, Weekday.tuesday
 * );
 *
 * @param time - The specific time (hours and minutes) to set
 * @param weekday - The target day of the week (using the Weekday enum)
 * @param referenceDate - Optional date to base the calculation on (defaults to
 *   current date)
 * @returns A Date object representing the specified time on the target weekday
 */
export const createDateFromTimeAndWeekday = (time: Time, weekday: Weekday, referenceDate: Date = new Date()): Date => {
  const date = new Date(referenceDate);

  date.setHours(time.hours, time.minutes, 0, 0);

  const currentWeekday = date.getDay();
  let daysToAdd = weekday - currentWeekday;

  // Handle the case when the weekday is before the current weekday
  if (daysToAdd < 0) {
    daysToAdd += 7;
  }

  date.setDate(date.getDate() + daysToAdd);

  return date;
};
