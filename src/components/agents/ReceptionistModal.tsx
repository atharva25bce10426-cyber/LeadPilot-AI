import React, { useState } from 'react';
import {
  PhoneCall,
  PhoneIncoming,
  Play,
  Pause,
  Clock,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  PhoneForwarded,
  Sliders,
  X,
  RefreshCw,
  Sparkles,
  Volume2,
  Mic,
  Video,
} from 'lucide-react';
import { SubAgentInfo } from '../../types';
import {
  DEFAULT_RECEPTIONIST_CONFIG,
  registerReceptionistCallAppointment,
} from '../../services/agentService';

interface ReceptionistModalProps {
  agent: SubAgentInfo;
  isOpen: boolean;
  onClose: () => void;
  onToggleStatus: () => void;
}

interface CallExchange {
  speaker: 'agent' | 'caller';
  text: string;
  time: string;
}

export const ReceptionistModal: React.FC<ReceptionistModalProps> = ({
  agent,
  isOpen,
  onClose,
  onToggleStatus,
}) => {
  const [config, setConfig] = useState(DEFAULT_RECEPTIONIST_CONFIG);
  const [isCalling, setIsCalling] = useState(false);
  const [callProgress, setCallProgress] = useState(0);
  const [callCompleted, setCallCompleted] = useState(false);
  const [appointmentSaved, setAppointmentSaved] = useState(false);

  const [transcript, setTranscript] = useState<CallExchange[]>([]);

  if (!isOpen) return null;

  const isActive = agent.status === 'active';

  const handleStartTestCall = () => {
    if (!isActive) return;
    setIsCalling(true);
    setCallProgress(1);
    setCallCompleted(false);
    setAppointmentSaved(false);

    setTranscript([]);

    // Call connect
    setTimeout(() => {
      setTranscript([
        {
          speaker: 'agent',
          text: 'Thank you for calling LeadPilot AI. How can I help you today?',
          time: '00:02',
        },
      ]);
      setCallProgress(2);
    }, 1000);

    // Caller inquiry
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          speaker: 'caller',
          text: "Hi, I'd like to learn more about your automated speed-to-lead qualification for our local clinic.",
          time: '00:08',
        },
      ]);
      setCallProgress(3);
    }, 2400);

    // Agent qualification
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          speaker: 'agent',
          text: 'Absolutely! May I have your name and the best callback number for your file?',
          time: '00:14',
        },
      ]);
      setCallProgress(4);
    }, 3800);

    // Caller provides details
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          speaker: 'caller',
          text: 'This is Dr. Michael Chen with Lonestar Health, and my cell is (512) 555-0184.',
          time: '00:21',
        },
      ]);
      setCallProgress(5);
    }, 5200);

    // Agent schedules
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          speaker: 'agent',
          text: 'Great to connect with you, Dr. Chen. I can schedule a 15-minute consultation with our senior systems specialist. Would this Thursday at 10:00 AM work for you?',
          time: '00:29',
        },
      ]);
      setCallProgress(6);
    }, 6600);

    // Caller agrees
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          speaker: 'caller',
          text: 'Thursday at 10:00 AM is perfect. Looking forward to it.',
          time: '00:35',
        },
      ]);
      setCallProgress(7);
    }, 7800);

    // Agent concludes
    setTimeout(() => {
      setTranscript((prev) => [
        ...prev,
        {
          speaker: 'agent',
          text: "Wonderful! Your appointment is confirmed for Thursday at 10:00 AM. I've generated your Google Meet room link and dispatched an SMS confirmation. Have a great day!",
          time: '00:42',
        },
      ]);
      setCallProgress(8);
      setIsCalling(false);
      setCallCompleted(true);
    }, 9200);
  };

  const handleBookAppointment = () => {
    registerReceptionistCallAppointment({
      callerName: 'Dr. Michael Chen',
      callerPhone: '+1 (512) 555-0184',
      businessName: 'Lonestar Health Clinic',
      serviceInterest: 'Speed-to-lead & Patient Booking AI',
      day: 'Thursday',
      time: '10:00 AM',
    });
    setAppointmentSaved(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0a0e1a] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#080c14] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {agent.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                    }`}
                  />
                  {isActive ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{agent.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleStatus}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isActive
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                  : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Receptionist</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Activate Receptionist</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isActive && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>
                <strong>Receptionist is currently paused.</strong> Automated phone call answering, caller qualification, and consultation booking are suspended.
              </span>
            </div>
          )}

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                {agent.metrics.primaryLabel}
              </span>
              <span className="text-xl font-bold font-mono text-white">
                {agent.metrics.primaryValue}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                {agent.metrics.secondaryLabel}
              </span>
              <span className="text-xl font-bold font-mono text-purple-400">
                {agent.metrics.secondaryValue}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                {agent.metrics.tertiaryLabel}
              </span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {agent.metrics.tertiaryValue}
              </span>
            </div>
          </div>

          {/* Two Columns: Config & Interactive Phone Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Configuration */}
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-purple-400" />
                    <span>Receptionist Settings</span>
                  </h3>
                  <span className="text-[10px] text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    Telephony Ready
                  </span>
                </div>

                {/* Business Hours */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">
                    Receptionist Business Hours
                  </label>
                  <div className="p-2.5 rounded-lg bg-[#07090e] border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      <span>{config.businessHours}</span>
                    </span>
                    <span className="text-emerald-400 font-mono text-[11px]">Enforced</span>
                  </div>
                </div>

                {/* Call Handling Toggles */}
                <div>
                  <label className="text-xs text-slate-400 block mb-2 font-medium">
                    Call Handling Rules
                  </label>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07090e] border border-slate-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-200">Answer calls automatically</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07090e] border border-slate-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-200">Collect caller name & number</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07090e] border border-slate-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-200">Qualify prospect service requirements</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07090e] border border-slate-800">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-200">Offer direct appointment booking</span>
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07090e] border border-slate-800">
                      <div className="flex items-center gap-2">
                        <PhoneForwarded className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-200">Transfer urgent calls</span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">{config.forwardingPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-200 block mb-0.5">Production Telephony Architecture:</strong>
                  Pre-configured for Twilio SIP trunking and Google Meet integration. Calls are transcribed with real-time intent extraction and synced directly to LeadPilot CRM.
                </div>
              </div>
            </div>

            {/* Right: Simulated Call Interface */}
            <div className="space-y-4 flex flex-col">
              <div className="rounded-xl bg-[#06080e] border border-slate-800 flex-1 flex flex-col overflow-hidden shadow-lg min-h-[380px]">
                
                {/* Caller Screen Chrome */}
                <div className="px-4 py-3 bg-[#080c14] border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                    <div>
                      <div className="text-xs font-mono text-white font-bold flex items-center gap-2">
                        <span>Incoming Call Simulation</span>
                        <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-300 text-[10px] rounded border border-purple-500/30">
                          {isCalling ? 'CONNECTED' : callCompleted ? 'COMPLETED' : 'STANDBY'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Caller ID: +1 (512) 555-0184 (Austin, TX)
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleStartTestCall}
                    disabled={!isActive || isCalling}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-500/20 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCalling ? 'animate-spin' : ''}`} />
                    <span>{isCalling ? 'Calling...' : 'Test Call'}</span>
                  </button>
                </div>

                {/* Call Transcript Audio Visualizer */}
                <div className="p-4 flex-1 overflow-y-auto space-y-3 font-sans text-xs">
                  {transcript.length === 0 && !isCalling && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-2">
                      <PhoneIncoming className="w-8 h-8 text-slate-600 animate-bounce" />
                      <p className="text-xs">Click <strong>&quot;Test Call&quot;</strong> to simulate an incoming customer phone call and witness autonomous voice qualification.</p>
                    </div>
                  )}

                  {transcript.map((line, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl leading-relaxed ${
                        line.speaker === 'agent'
                          ? 'bg-purple-950/20 border border-purple-800/30 text-slate-200'
                          : 'bg-slate-900 border border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span className="font-bold text-purple-300">
                          {line.speaker === 'agent' ? 'AI Receptionist' : 'Caller (Dr. Michael Chen)'}
                        </span>
                        <span>{line.time}</span>
                      </div>
                      <div>{line.text}</div>
                    </div>
                  ))}

                  {isCalling && (
                    <div className="flex items-center gap-2 text-xs text-purple-400 italic">
                      <Volume2 className="w-4 h-4 animate-pulse" />
                      <span>Audio processing & speech-to-text live...</span>
                    </div>
                  )}
                </div>

                {/* Call Completed Card */}
                {callCompleted && (
                  <div className="p-3.5 mx-4 mb-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-purple-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Call Completed • Lead Qualified</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                        Intent: High
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1">
                      <div><strong>Caller:</strong> Dr. Michael Chen (+1 512-555-0184)</div>
                      <div><strong>Appointment:</strong> Booked for Thursday, 10:00 AM (Google Meet)</div>
                      <div><strong>Recommended Action:</strong> Follow up with prospect & sync calendar invite.</div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleBookAppointment}
                        disabled={appointmentSaved}
                        className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          appointmentSaved
                            ? 'bg-purple-600 text-white'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/20'
                        }`}
                      >
                        {appointmentSaved ? (
                          <>
                            <CalendarCheck className="w-3.5 h-3.5" />
                            <span>Booked to Consultations & AI Terminal Logged</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Book to Appointments Calendar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#080c14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px]">
            Frontend simulation prototype. Twilio SIP trunking ready.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Back to AI Agent
          </button>
        </div>

      </div>
    </div>
  );
};
