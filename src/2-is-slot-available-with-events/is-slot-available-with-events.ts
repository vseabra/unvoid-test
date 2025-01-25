import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';

export const isSlotAvailableWithEvents = (
  availability: CalendarAvailability,
  events: Array<Omit<CalendarEvent, 'buffer'>>,
  slot: CalendarSlot,
): boolean => {
  // Your code goes here
  return false;
};
