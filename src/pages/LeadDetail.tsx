import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bot,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Sparkles,
  Send,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { INITIAL_LEADS } from '../services/leadService';
import { LeadItem } from '../types';

export const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find lead by id or fallback to first lead
  const initialLead = INITIAL_LEADS.find((l) => l.id === id) || INITIAL_LEADS[0];
  const [lead, setLead] = useState<LeadItem>(initialLead);
  const [outreachSent, setOutreachSent] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);

  const handleStatusChange = (newStatus: LeadItem['status']) => {
    setLead((prev) => ({
      ...prev,
      status: newStatus,
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          timestamp: 'Just now',
          action: `Status changed to ${newStatus}`,
          note: `Manual update by operator.`,
        },
        ...prev.activityHistory,
      ],
    }));
  };

  const handleGenerateDraft = () => {
    setIsGeneratingDraft(true);
    setTimeout(() => {
      setGeneratedDraft(
        `Hi ${lead.contactPerson.split(' ')[0]},\n\nI noticed ${lead.businessName} has strong active visibility in ${lead.location}, but your mobile website takes over 5s to load without an automated calendar booking link.\n\nOur local AI assistant books verified client consultations within 45 seconds on Google Maps and SMS. Can I share a 60-second video of how this works for ${lead.industry} in Austin?\n\nBest,\nLeadPilot AI Concierge`
      );
      setIsGeneratingDraft(false);
    }, 600);
  };

  const handleSendOutreach = () => {
    setOutreachSent(true);
    handleStatusChange('Contacted');
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
      
      {/* Back button */}
      <div>
        <Link
          to="/leads"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Leads</span>
        </Link>
      </div>

      {/* Main Lead Header Card */}
      <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {lead.businessName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                {lead.matchScore}% Match
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Contact: <strong className="text-slate-200">{lead.contactPerson}</strong> ({lead.title})
            </p>
          </div>

          {/* Status selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400 uppercase">Status:</span>
            <select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value as LeadItem['status'])}
              className="bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Responded">Responded</option>
              <option value="Appointment Booked">Appointment Booked</option>
              <option value="Qualified">Qualified</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-slate-200 truncate">{lead.email}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-200 truncate">{lead.phone}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-purple-400 shrink-0" />
            <a
              href={lead.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-blue-400 truncate flex items-center gap-1"
            >
              <span>{lead.website.replace('https://', '')}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-200 truncate">{lead.location}</span>
          </div>
        </div>

      </div>

      {/* 2-Column: AI Analysis & Action / Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: AI Opportunity & Analysis */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Opportunity Card */}
          <div className="rounded-2xl bg-[#0a0e1a] border border-blue-500/30 p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles className="w-4 h-4" />
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider">
                AI Opportunity Analysis
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1.5">
              <span className="text-xs font-mono text-blue-400 uppercase font-bold">
                Why this is a strong lead:
              </span>
              <p className="text-sm text-white leading-relaxed">
                {lead.whyGoodLead}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Estimated Value
                </span>
                <span className="text-base font-extrabold text-emerald-400">
                  {lead.potentialOpportunity}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Target Tag
                </span>
                <span className="text-base font-extrabold text-blue-400">
                  {lead.opportunity}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-mono text-slate-400 uppercase font-semibold">
                AI Recommendation:
              </span>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80">
                {lead.aiRecommendation}
              </p>
            </div>
          </div>

          {/* AI Outreach Generator */}
          <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Personalized AI Outreach
                </h2>
              </div>

              <button
                type="button"
                onClick={handleGenerateDraft}
                disabled={isGeneratingDraft}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingDraft ? 'Generating...' : 'Generate New Draft'}</span>
              </button>
            </div>

            {outreachSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <p className="font-bold text-white">Outreach Dispatched via LeadPilot Agent</p>
                  <p className="text-emerald-300">Awaiting prospect response or calendar booking.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea
                  rows={6}
                  value={
                    generatedDraft ||
                    `Hi ${lead.contactPerson.split(' ')[0]},\n\nI noticed ${lead.businessName} has top reviews in ${lead.location}, but your mobile site currently lacks instant 45-second inquiry booking.\n\nOur AI lead assistant captures qualified clients directly into your calendar. Could I send you a 1-minute demo video?\n\nBest,\nLeadPilot Team`
                  }
                  onChange={(e) => setGeneratedDraft(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleSendOutreach}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Outreach via AI Agent</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Activity History Timeline */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-6 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
                Activity Timeline
              </h3>
            </div>

            <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800 pl-6">
              {lead.activityHistory.map((act) => (
                <div key={act.id} className="relative text-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute -left-[27px] top-1 ring-4 ring-[#0a0e1a]" />
                  <span className="font-bold text-white block">{act.action}</span>
                  <p className="text-slate-400 text-[11px] mt-0.5">{act.note}</p>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">
                    {act.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
