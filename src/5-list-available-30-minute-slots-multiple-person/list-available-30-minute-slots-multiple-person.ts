import { CalendarAvailability, CalendarEvent, CalendarSlot } from '../types';
import { isSlotAvailableWithBuffer } from '../3-is-slot-available-with-buffer/is-slot-available-with-buffer';
import { listAvailable30MinuteSlots } from '../4-list-available-30-minute-slots/list-available-30-minute-slots';

/**
 * listAvailable30MinuteSlotsMultiplePerson
 *
 * Generates available 30-minute slots that work for ALL attendees within a given date range.
 * 
 * This function finds 30-minute slots by:
 * 1. Generating slots that would work for the first attendee
 * 2. Filtering these slots to ensure they work for all other attendees
 * 
 * @param attendees - An array of attendees with their availability and events
 * @param range - The start and end dates to search for available slots
 * @returns An array of 30-minute slot candidates available to all attendees
 */
export const listAvailable30MinuteSlotsMultiplePerson = (
  attendees: Array<{
    availability: CalendarAvailability;
    events: Array<CalendarEvent>;
  }>,
  range: [Date, Date],
): Array<CalendarSlot> => {
	// The result will be the intersection of all attendees' available slots, so it cannot be greater in length than the slots of the first attendee.
	// It can also not contain a slot that is not avaialble for the first attendee, so we can start our search from the first attendee's slots.
  if (attendees.length === 0) return [];

  // Generate slots for the first attendee
  const initialSlots = listAvailable30MinuteSlots(
    attendees[0].availability, 
    attendees[0].events, 
    range
  );

  // Filter these slots to ensure they work for all other attendees
  return initialSlots.filter(slot => 
    attendees.every(attendee => 
      isSlotAvailableWithBuffer(
        attendee.availability, 
        attendee.events, 
        slot
      )
    )
  );
};
