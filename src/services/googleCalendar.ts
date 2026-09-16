import { AppointmentItem } from '../types';

/**
 * Google Calendar & Google Meet Integration Service
 *
 * Architecture Overview:
 * In production, Google Calendar events and Google Meet conference rooms are created
 * securely via server-side endpoints (e.g., /api/calendar/events) utilizing Google Cloud
 * service accounts or user-authorized OAuth2 tokens.
 *
 * Security Note:
 * NEVER store Google client secrets, service account private keys, or restricted API keys
 * in the client-side code. The frontend only receives and consumes the final validated
 * conference room URL (meetUrl).
 */

/**
 * Validates that a string is a valid Google Meet URL format.
 * Matches standard Google Meet patterns:
 * - https://meet.google.com/abc-defg-hij
 * - https://meet.google.com/lookup/...
 */
export function isValidMeetUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  
  // Standard Google Meet URL pattern
  const googleMeetRegex = /^https:\/\/(meet\.google\.com)\/([a-z0-9]+(-[a-z0-9]+)*)/i;
  return googleMeetRegex.test(trimmed);
}

/**
 * Retrieves the Google Meet link for a given appointment.
 * In current client architecture: resolves the appointment's stored meetUrl.
 * In production: can fetch or generate missing links via backend calendar sync.
 */
export async function getMeetLink(appointment: AppointmentItem): Promise<string | null> {
  // Simulate minimal async resolution to allow visual feedback if needed
  await new Promise((resolve) => setTimeout(resolve, 200));

  if (appointment.meetUrl && appointment.meetUrl.trim() !== '') {
    return appointment.meetUrl.trim();
  }

  return null;
}

/**
 * Safely launches the Google Meet meeting in a new browser tab.
 * Keeps the LeadPilot AI application open in the current tab.
 */
export function openGoogleMeet(meetUrl: string): boolean {
  if (!isValidMeetUrl(meetUrl)) {
    return false;
  }

  try {
    const openedWindow = window.open(meetUrl, '_blank', 'noopener,noreferrer');
    return !!openedWindow;
  } catch (error) {
    console.error('Failed to open Google Meet window:', error);
    return false;
  }
}

/**
 * Service Abstraction for Google Calendar event creation.
 * Prepared for production backend connection:
 *
 * Production Flow:
 * LeadPilot AI Agent -> Appointment Booked -> Google Calendar Event Created
 * -> Google Meet Conference Generated -> meetUrl Stored with Appointment.
 */
export interface CreateCalendarEventPayload {
  title: string;
  attendeeEmail: string;
  attendeeName: string;
  startTime: string;
  endTime?: string;
  description?: string;
}

export async function createCalendarEvent(
  payload: CreateCalendarEventPayload
): Promise<{ eventId: string; meetUrl: string }> {
  // Architectural placeholder for backend API integration
  // e.g.: const res = await fetch('/api/calendar/events', { method: 'POST', body: JSON.stringify(payload) });
  console.info('[GoogleCalendarService] Creating calendar event via secure backend gateway:', payload);
  
  const simulatedEventId = `gcal-evt-${Date.now()}`;
  const simulatedMeetCode = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
  const simulatedMeetUrl = `https://meet.google.com/${simulatedMeetCode}`;

  return {
    eventId: simulatedEventId,
    meetUrl: simulatedMeetUrl,
  };
}

export async function createMeetConference(eventId: string): Promise<string> {
  // Architectural placeholder for generating conferenceData on existing calendar event
  console.info('[GoogleCalendarService] Generating conference link for event:', eventId);
  const code = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
  return `https://meet.google.com/${code}`;
}
