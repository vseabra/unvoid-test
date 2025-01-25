import { CalendarAvailability, CalendarSlot, Time, Weekday } from '../types';

/**
 * isSlotAvailable
 *
 * Determines whether a given medical consultation slot is available based on a
 * doctor's weekly availability.
 *
 * This function checks if a proposed slot:
 *
 * 1. Falls on a day the doctor is available
 * 2. Fits entirely within the doctor's available time range for that day
 *
 * @remarks
 * The function performs two key checks:
 *
 * - Verifies the slot's day is in the doctor's availability
 * - Ensures the entire slot fits within the available time range
 *
 * @param availability - The doctor's weekly availability schedule
 * @param slot - The proposed consultation time slot
 * @returns Boolean indicating whether the slot is available
 */
export const isSlotAvailable = (availability: CalendarAvailability, slot: CalendarSlot): boolean => {
  const { start, durationM } = slot;
  const weekday = start.getDay();
  const MILISECONDS_IN_MINUTE = 60000;

  const end = new Date(start.getTime() + durationM * MILISECONDS_IN_MINUTE);

  const scheduleDay = availability.include.find(day => day.weekday === weekday);
  // If the weekday is not a part of a doctor's availability, we don't neeed to check the time
  if (!scheduleDay) {
    return false;
  }

  const [scheduleStart, scheduleEnd] = scheduleDay.range.map(time =>
    createDateFromTimeAndWeekday(time, weekday, start),
  );

  const isSlotInSchedule = start >= scheduleStart && end <= scheduleEnd;

  return isSlotInSchedule;
};

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
