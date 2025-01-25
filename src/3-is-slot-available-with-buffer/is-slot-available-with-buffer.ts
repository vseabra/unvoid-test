import { addMinutes, subMinutes } from 'date-fns';
import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { isSlotAvailableWithEvents } from '../2-is-slot-available-with-events/is-slot-available-with-events';

/**
 * isSlotAvailableWithBuffer
 *
 * Determines if a given calendar slot is available, considering doctor's availability 
 * and existing events with their potential buffer zones.
 * 
 * @param availability - The doctor's weekly availability schedule
 * @param events - Existing calendar events, which may include buffer times
 * @param slot - The proposed consultation time slot
 *
 * @returns A boolean indicating whether the slot can be scheduled
 * 
 * @remarks
 * - Reuses the existing `isSlotAvailableWithEvents` logic but with expanded buffers
 * 
 */
export const isSlotAvailableWithBuffer = (
  availability: CalendarAvailability,
  events: Array<CalendarEvent>,
  slot: CalendarSlot,
): boolean => {
  return isSlotAvailableWithEvents(availability, expandEventsWithBuffers(events), slot);
};

/**
 * expandEventsWithBuffers
 *
 * Transforms events by expanding them to include their buffers
 *
 * This function takes events with optional buffers and creates additional
 * events that represent the buffer time before and after each event.
 *
 * @param events - The original calendar events
 * @returns the buffered events
 */
export const expandEventsWithBuffers = (events: Array<CalendarEvent>): Array<CalendarEvent> => {
  return events.flatMap(event => {
    if (!event.buffer) {
      return [event];
    }

    const bufferedEvents: CalendarEvent[] = [
      {
        start: subMinutes(event.start, event.buffer.before),
        end: event.start,
      },
			// The original event, eventually we could use this if we need to point which event blocked a slot. 
			// If this is not needed, we could simplify the code by expanding the original event itself.
      event, 
      {
        start: event.end,
        end: addMinutes(event.end, event.buffer.after),
      },
    ];

    return bufferedEvents;
  });
};
