import React, { useState, useEffect } from 'react';
import { CalendarCheck, Video, Clock } from 'lucide-react';
import { INITIAL_APPOINTMENTS, getStoredAppointments, subscribeAppointments } from '../services/leadService';
import { AppointmentItem } from '../types';
import { getMeetLink, isValidMeetUrl, openGoogleMeet } from '../services/googleCalendar';

export const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>(() => getStoredAppointments());
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  useEffect(() => {
    return subscribeAppointments((updated) => setAppointments(updated));
  }, []);

  const showToast = (text: string, isError = false) => {
    setToastMessage({ text, isError });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleJoinRoom = async (apt: AppointmentItem) => {
    if (openingId) return;

    setOpeningId(apt.id);
    try {
      const meetUrl = await getMeetLink(apt);

      if (!meetUrl) {
        showToast("Meeting link isn't available yet.", true);
        return;
      }

      if (!isValidMeetUrl(meetUrl)) {
        showToast('Unable to open meeting. Please try again.', true);
        return;
      }

      const success = openGoogleMeet(meetUrl);
      if (!success) {
        // Fallback standard window.open in case of browser restrictions
        window.open(meetUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error opening meeting:', error);
      showToast('Unable to open meeting. Please try again.', true);
    } finally {
      setTimeout(() => {
        setOpeningId(null);
      }, 400);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <CalendarCheck className="w-6 h-6 text-blue-400" />
            <span>Booked Consultations</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Appointments booked automatically into your calendar by your LeadPilot AI agent.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Google Calendar Synced
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-5 rounded-2xl bg-[#0a0e1a] border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex flex-col items-center justify-center shrink-0">
                <Clock className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] font-mono font-bold">{apt.time.split(' ')[0]}</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">{apt.businessName}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono">
                    {apt.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Attendee: <strong className="text-slate-200">{apt.contactPerson}</strong>
                </p>
                {apt.notes && (
                  <p className="text-[11px] text-slate-500 mt-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                    Note: {apt.notes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="text-right text-xs">
                <span className="font-bold text-white block">{apt.date}</span>
                <span className="text-slate-400 font-mono">{apt.time}</span>
              </div>

              <button
                type="button"
                onClick={() => handleJoinRoom(apt)}
                disabled={openingId === apt.id}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Video className="w-3.5 h-3.5" />
                <span>{openingId === apt.id ? 'Opening...' : 'Join Room'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Non-disruptive feedback notification toast */}
      {toastMessage && (
        <div
          role="alert"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900/95 border border-slate-700 text-white text-xs font-medium shadow-2xl shadow-black/80 flex items-center gap-2.5 backdrop-blur-md animate-in fade-in"
        >
          <span className={`w-2 h-2 rounded-full ${toastMessage.isError ? 'bg-amber-400' : 'bg-blue-400'}`} />
          <span>{toastMessage.text}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
};
