import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  CheckCircle2,
  Send,
  CalendarCheck,
  DollarSign,
  Cpu,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Filter,
  Plus,
  RefreshCw,
  Search,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import { INITIAL_LEADS } from '../services/leadService';

export const Dashboard: React.FC = () => {
  const { user, testDriveData } = useAuth();
  const navigate = useNavigate();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const locationCity = user?.location || testDriveData?.city || 'Austin, TX';

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  const topMetrics = [
    {
      label: 'Leads Found',
      value: '247',
      change: '+34 today',
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      label: 'Qualified Leads',
      value: '86',
      change: '+14 today',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Contacted',
      value: '64',
      change: '+18 sent',
      icon: Send,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      label: 'Appointments',
      value: '31',
      change: '+5 booked',
      icon: CalendarCheck,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      label: 'Estimated Pipeline',
      value: '$12,450',
      change: '+22.4%',
      icon: DollarSign,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
  ];

  const recentLeads = INITIAL_LEADS.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'Responded':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Appointment Booked':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getOpportunityBadge = (opp: string) => {
    switch (opp) {
      case 'High Budget':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Urgent Need':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'High Intent':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Welcome Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            id="dashboard-greeting"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2"
          >
            <span>Good morning 👋</span>
          </h1>
          <p
            id="dashboard-subgreeting"
            className="text-sm text-slate-300 mt-1"
          >
            Here&apos;s what your AI agent has been doing.
          </p>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 hover:border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Pipeline'}</span>
          </button>

          <Link
            to="/campaigns"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Campaign</span>
          </Link>
        </div>
      </div>

      {/* TOP METRIC CARDS (5 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {topMetrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-2xl bg-[#0a0e1a] border border-slate-800/90 p-4.5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  {m.label}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${m.bg}`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
              </div>

              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {m.value}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-semibold block mt-1">
                  {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* LARGE AI AGENT CARD */}
      <div
        id="ai-agent-status-card"
        className="rounded-2xl bg-gradient-to-br from-[#0c1426] via-[#090d18] to-[#120f26] border border-blue-500/40 p-6 sm:p-8 shadow-xl shadow-blue-950/30 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Agent info & text */}
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    AI Lead Agent
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Autonomous Prospector Engine v4.2
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Your AI agent is actively searching for high-intent prospects in <strong>{locationCity}</strong>.
            </p>
          </div>

          {/* Action button */}
          <div className="shrink-0">
            <Link
              to="/agent"
              id="dashboard-view-ai-activity"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] transition-all"
            >
              <span>View AI Activity</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 5 Specific Sub-Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block font-mono">Prospects scanned</span>
            <span className="text-lg sm:text-xl font-extrabold text-white block mt-0.5">1,284</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block font-mono">Qualified</span>
            <span className="text-lg sm:text-xl font-extrabold text-emerald-400 block mt-0.5">247</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block font-mono">Outreach sent</span>
            <span className="text-lg sm:text-xl font-extrabold text-blue-400 block mt-0.5">86</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 block font-mono">Responses</span>
            <span className="text-lg sm:text-xl font-extrabold text-indigo-400 block mt-0.5">31</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-xs text-slate-400 block font-mono">Appointments</span>
            <span className="text-lg sm:text-xl font-extrabold text-purple-400 block mt-0.5">12</span>
          </div>
        </div>

      </div>

      {/* RECENT LEADS SECTION */}
      <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-6 space-y-5">
        
        {/* Table Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Recent Leads
            </h3>
            <p className="text-xs text-slate-400">
              High-intent business matches currently in active AI discovery & qualification.
            </p>
          </div>

          <Link
            to="/leads"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto"
          >
            <span>View all 64 leads</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <th className="pb-3 font-semibold">Business</th>
                <th className="pb-3 font-semibold">Match</th>
                <th className="pb-3 font-semibold">Opportunity</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-sm">
              {recentLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-slate-900/50 transition-colors group"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white">
                        {lead.businessName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block group-hover:text-blue-400 transition-colors">
                          {lead.businessName}
                        </span>
                        <span className="text-xs text-slate-400">
                          {lead.contactPerson} • {lead.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {lead.matchScore}%
                      </span>
                      <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${lead.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 pr-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${getOpportunityBadge(
                        lead.opportunity
                      )}`}
                    >
                      {lead.opportunity}
                    </span>
                  </td>

                  <td className="py-4 pr-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="py-4 text-right">
                    <Link
                      to={`/leads/${lead.id}`}
                      id={`dashboard-view-lead-${lead.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 hover:border-blue-500"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Lead</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Cards for Table */}
        <div className="md:hidden space-y-3">
          {recentLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-white text-sm">{lead.businessName}</h4>
                  <p className="text-xs text-slate-400">{lead.contactPerson} • {lead.location}</p>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-xs">
                  {lead.matchScore}% Match
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${getOpportunityBadge(lead.opportunity)}`}>
                  {lead.opportunity}
                </span>

                <Link
                  to={`/leads/${lead.id}`}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <span>View Lead</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
