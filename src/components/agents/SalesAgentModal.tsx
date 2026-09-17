import React, { useState } from 'react';
import {
  Target,
  Play,
  Pause,
  Send,
  Sparkles,
  CalendarCheck,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  Building2,
  X,
  RefreshCw,
  Mail,
  Zap,
} from 'lucide-react';
import { SubAgentInfo } from '../../types';
import {
  DEFAULT_SALES_METRICS,
  executeSalesAgentAction,
} from '../../services/agentService';

interface SalesAgentModalProps {
  agent: SubAgentInfo;
  isOpen: boolean;
  onClose: () => void;
  onToggleStatus: () => void;
}

const PIPELINE_STAGES = [
  'New Lead',
  'Qualified',
  'Contacted',
  'Interested',
  'Meeting Booked',
  'Converted',
];

interface MockTargetLead {
  id: string;
  name: string;
  contact: string;
  score: number;
  intent: 'High' | 'Urgent';
  stage: string;
  sampleMessage: string;
}

const TARGET_LEADS: MockTargetLead[] = [
  {
    id: 'lead-1',
    name: 'Premier Real Estate Group',
    contact: 'David Vance (Managing Principal)',
    score: 97,
    intent: 'High',
    stage: 'Qualified',
    sampleMessage:
      'Hi David, I noticed your team is currently looking for ways to improve online lead conversion. LeadPilot AI can help automate qualification and appointment booking. Would you be open to a quick 15-minute consultation?',
  },
  {
    id: 'lead-2',
    name: 'Capital Real Estate Hub',
    contact: 'Elena Rostova (Team Lead)',
    score: 94,
    intent: 'Urgent',
    stage: 'Contacted',
    sampleMessage:
      'Elena, open house traffic dropped off 40% on Sundays without instant SMS engagement. Our AI Sales Agent can engage your visitors within 45 seconds to secure showing requests.',
  },
  {
    id: 'lead-3',
    name: 'Metro Real Estate Specialists',
    contact: 'Marcus Thorne (Founder)',
    score: 91,
    intent: 'High',
    stage: 'Interested',
    sampleMessage:
      'Marcus, following up on your question about out-of-state relocation qualification. We have 3 pre-built criteria templates ready for Austin luxury buyers.',
  },
];

export const SalesAgentModal: React.FC<SalesAgentModalProps> = ({
  agent,
  isOpen,
  onClose,
  onToggleStatus,
}) => {
  const [metrics, setMetrics] = useState(DEFAULT_SALES_METRICS);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState(0);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  if (!isOpen) return null;

  const isActive = agent.status === 'active';
  const currentLead = TARGET_LEADS[selectedLeadIndex];

  const handleAction = (
    action: 'follow_up' | 'generate_reply' | 'schedule_meeting' | 'mark_interested'
  ) => {
    if (!isActive || isExecuting) return;
    setIsExecuting(true);
    setActionFeedback(null);

    setTimeout(() => {
      const res = executeSalesAgentAction(currentLead.id, currentLead.name, action);
      setIsExecuting(false);
      setActionFeedback(res.message);

      if (action === 'follow_up') {
        setMetrics((m) => ({ ...m, followUpsSent: m.followUpsSent + 1 }));
        TARGET_LEADS[selectedLeadIndex].stage = 'Contacted';
      } else if (action === 'mark_interested') {
        setMetrics((m) => ({ ...m, responses: m.responses + 1 }));
        TARGET_LEADS[selectedLeadIndex].stage = 'Interested';
      } else if (action === 'schedule_meeting') {
        setMetrics((m) => ({
          ...m,
          meetingsBooked: m.meetingsBooked + 1,
          conversionRate: Math.round(((m.meetingsBooked + 1) / m.leadsAssigned) * 100),
        }));
        TARGET_LEADS[selectedLeadIndex].stage = 'Meeting Booked';
      }

      setTimeout(() => {
        setActionFeedback(null);
      }, 5000);
    }, 600);
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
        {/* Header */}
        <div className="px-6 py-4 bg-[#080c14] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Target className="w-5 h-5" />
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
                  <span>Pause Sales Agent</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Activate Sales Agent</span>
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
                <strong>Sales Agent is currently paused.</strong> Automated follow-ups, sequence delivery, objection handling, and pipeline promotions are suspended.
              </span>
            </div>
          )}

          {/* Pipeline Stage Bar */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 uppercase tracking-wider font-semibold">
                Autonomous Sales Pipeline Stages
              </span>
              <span className="text-blue-400">Conversion Rate: {metrics.conversionRate}%</span>
            </div>

            <div className="grid grid-cols-6 gap-1.5 text-center">
              {PIPELINE_STAGES.map((stage, i) => {
                const isCurrent = currentLead.stage === stage;
                const isPast =
                  PIPELINE_STAGES.indexOf(currentLead.stage) >= i;
                return (
                  <div
                    key={stage}
                    className={`py-2 px-1 rounded-lg text-[10px] font-mono transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                        : isPast
                        ? 'bg-blue-950/40 text-blue-300 border border-blue-800/40'
                        : 'bg-slate-900/60 text-slate-500 border border-slate-800'
                    }`}
                  >
                    <div className="truncate">{stage}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5 Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Leads Assigned</span>
              <span className="text-lg font-bold font-mono text-white">{metrics.leadsAssigned}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Follow-ups Sent</span>
              <span className="text-lg font-bold font-mono text-blue-400">{metrics.followUpsSent}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Responses</span>
              <span className="text-lg font-bold font-mono text-indigo-400">{metrics.responses}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Meetings Booked</span>
              <span className="text-lg font-bold font-mono text-emerald-400">{metrics.meetingsBooked}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-0.5">Conversion Rate</span>
              <span className="text-lg font-bold font-mono text-purple-400">{metrics.conversionRate}%</span>
            </div>
          </div>

          {/* Test Sales Agent Simulator */}
          <div className="rounded-xl bg-[#06080e] border border-slate-800 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Test Sales Agent Simulation</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select a live lead to test autonomous outreach, reply generation, and meeting booking.
                </p>
              </div>

              {/* Lead Switcher */}
              <div className="flex items-center gap-1.5">
                {TARGET_LEADS.map((lead, idx) => (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => setSelectedLeadIndex(idx)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                      selectedLeadIndex === idx
                        ? 'bg-blue-600/30 border border-blue-500 text-blue-300 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    Lead #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Target Lead Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-0.5">
                  Target Company
                </span>
                <strong className="text-white text-sm block truncate">{currentLead.name}</strong>
                <span className="text-slate-400 text-[11px]">{currentLead.contact}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-0.5">
                  Lead Score
                </span>
                <span className="text-emerald-400 font-mono text-sm font-bold block">
                  {currentLead.score}% Match
                </span>
                <span className="text-slate-400 text-[11px]">Calculated by Master AI Agent</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-0.5">
                  Current Pipeline Stage
                </span>
                <span className="text-blue-400 font-mono text-sm font-bold block">
                  {currentLead.stage}
                </span>
                <span className="text-slate-400 text-[11px]">Intent: {currentLead.intent}</span>
              </div>
            </div>

            {/* AI Generated Outreach Message */}
            <div className="p-4 rounded-xl bg-[#0a0e1a] border border-blue-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI-Generated Outreach Message</span>
                </span>
                <span className="text-[10px]">Model: LeadPilot-Sales-LLM</span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/70 p-3 rounded-lg border border-slate-800 italic">
                &quot;{currentLead.sampleMessage}&quot;
              </p>
            </div>

            {/* Interactive Control Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleAction('follow_up')}
                disabled={!isActive || isExecuting}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-blue-400" />
                <span>Send Follow-up</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('generate_reply')}
                disabled={!isActive || isExecuting}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                <span>Generate Reply</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('schedule_meeting')}
                disabled={!isActive || isExecuting}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 shadow-md shadow-blue-500/20"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Schedule Meeting</span>
              </button>

              <button
                type="button"
                onClick={() => handleAction('mark_interested')}
                disabled={!isActive || isExecuting}
                className="px-3 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/50 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Mark Interested</span>
              </button>
            </div>

            {/* Live Feedback Toast */}
            {actionFeedback && (
              <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{actionFeedback}</span>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#080c14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="text-[11px]">
            Connected to Leads & Campaigns Pipeline. Gemini sales prompt engine ready.
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
