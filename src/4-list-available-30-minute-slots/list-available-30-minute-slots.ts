import { addMinutes, eachDayOfInterval } from 'date-fns';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { createDateFromTimeAndWeekday } from '../utils';
import { isSlotAvailableWithBuffer } from '../3-is-slot-available-with-buffer/is-slot-available-with-buffer';

/**
 * Generates available 30-minute slots within a given date range.
 * 
 * @param availability - The doctor's weekly availability schedule
 * @param events - Existing calendar events with potential buffers
 * @param range - The start and end dates to search for available slots
 *
 * @returns An array of available 30-minute slot candidates
 */
export const listAvailable30MinuteSlots = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  range: [Date, Date],
): Array<CalendarSlot> => {
  const [start, end] = range;
  const days = eachDayOfInterval({ start, end });

  return days.map(day => {
    const weekday = day.getDay();
    const scheduleDay = availability.include.find(schedule => schedule.weekday === weekday);

    if (!scheduleDay) return [];

    const [scheduleStart, scheduleEnd] = scheduleDay.range.map(time =>
      createDateFromTimeAndWeekday(time, weekday, start),
    );

    const availableSlots: CalendarSlot[] = [];
    let currentSlotStart = scheduleStart;

    while (currentSlotStart < scheduleEnd) {
      const slot: CalendarSlot = {
        start: currentSlotStart,
        durationM: 30,
      };

      const isAvailable = isSlotAvailableWithBuffer(availability, events, slot);

      if (isAvailable) {
        availableSlots.push(slot);
      }

      currentSlotStart = addMinutes(currentSlotStart, 30);
    }

    return availableSlots;
  }).flat();
};
