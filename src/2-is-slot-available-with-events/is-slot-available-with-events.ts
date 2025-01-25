import { addMinutes } from 'date-fns';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { isSlotAvailable } from '../1-is-slot-available/is-slot-available';

export const isSlotAvailableWithEvents = (
  availability: CalendarAvailability,
  events: Array<Omit<CalendarEvent, 'buffer'>>,
  slot: CalendarSlot,
): boolean => {
  const { start, durationM } = slot;
  const end = addMinutes(start, durationM)

  const isAvailableBySchedule = isSlotAvailable(availability, slot);
  if (!isAvailableBySchedule) {
    return false;
  }
  const isOverlappingWithEvents = events.some(event => 
    (start < event.end && end > event.start)
  );

  return !isOverlappingWithEvents;
};
