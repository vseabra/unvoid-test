import { addMinutes } from 'date-fns';
import { CalendarAvailability, CalendarSlot, Time, Weekday } from '../types';
import { createDateFromTimeAndWeekday } from '../utils';

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
  const end = addMinutes(start, durationM);
  const weekday = start.getDay();

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
