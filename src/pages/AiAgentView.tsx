import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu,
  Play,
  Pause,
  RefreshCw,
  Sliders,
  Terminal,
  Sparkles,
  ShieldCheck,
  MapPin,
  Target,
  Zap,
  Bot,
  MessageSquare,
  PhoneCall,
  ArrowRight,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import {
  INITIAL_AI_LOGS,
  getStoredAiLogs,
  addStoredAiLog,
  subscribeAiLogs,
} from '../services/leadService';
import {
  getStoredSubAgents,
  toggleSubAgentStatus,
  subscribeSubAgents,
  getSimulatedCoordinationEvents,
} from '../services/agentService';
import { AiLogEntry, SubAgentId, SubAgentInfo } from '../types';
import { ChatbotModal } from '../components/agents/ChatbotModal';
import { ReceptionistModal } from '../components/agents/ReceptionistModal';
import { SalesAgentModal } from '../components/agents/SalesAgentModal';

export const AiAgentView: React.FC = () => {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<AiLogEntry[]>(() => getStoredAiLogs());
  const [searchRadius, setSearchRadius] = useState('25 miles');
  const [dailyQuota, setDailyQuota] = useState('50');
  const [subAgents, setSubAgents] = useState<SubAgentInfo[]>(() => getStoredSubAgents());
  const [activeModal, setActiveModal] = useState<SubAgentId | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Sync sub-agents
  useEffect(() => {
    return subscribeSubAgents((updated) => setSubAgents(updated));
  }, []);

  // Sync terminal logs
  useEffect(() => {
    return subscribeAiLogs((updated) => setLogs(updated));
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Periodic simulated agent log & sub-agent coordination when active
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const activeSubAgentIds = subAgents
        .filter((a) => a.status === 'active')
        .map((a) => a.id);

      const coordinationEvents = getSimulatedCoordinationEvents(activeSubAgentIds);

      const standardSamples = [
        {
          message: `Inspecting Google Business profile for new local targets in ${user?.location || 'Austin, TX'}...`,
          type: 'search' as const,
        },
        {
          message: 'Website audit complete: missing mobile conversion CTA and speed index is 5.4s.',
          type: 'analysis' as const,
        },
        {
          message: 'Lead score calculated: 95% Match. Dispatched to qualification queue.',
          type: 'score' as const,
        },
        {
          message: 'Personalized initial email crafted targeting local service gap.',
          type: 'outreach' as const,
        },
      ];

      // Blend standard logs with sub-agent coordination events
      const allCandidates = [...standardSamples, ...coordinationEvents];
      const randomSample = allCandidates[Math.floor(Math.random() * allCandidates.length)];

      addStoredAiLog({
        timestamp: timeStr,
        message: randomSample.message,
        type: randomSample.type,
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isRunning, user, subAgents]);

  const handleRunManualScan = () => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    addStoredAiLog({
      timestamp: timeStr,
      message: `Manual scan triggered for ${user?.location || 'Austin, TX'} within ${searchRadius}.`,
      type: 'search',
    });
    addStoredAiLog({
      timestamp: timeStr,
      message: 'Aggregating 42 newly registered business certificates & web domains...',
      type: 'prospect',
    });
  };

  const handleToggleSubAgent = (id: SubAgentId) => {
    toggleSubAgentStatus(id);
  };

  const getLogColor = (type: AiLogEntry['type']) => {
    switch (type) {
      case 'search':
        return 'text-blue-400';
      case 'prospect':
        return 'text-purple-400';
      case 'analysis':
        return 'text-amber-400';
      case 'score':
        return 'text-emerald-400';
      case 'outreach':
        return 'text-indigo-400';
      case 'success':
        return 'text-emerald-300 font-bold';
      default:
        return 'text-slate-300';
    }
  };

  const chatbotAgent = subAgents.find((a) => a.id === 'chatbot') || subAgents[0];
  const receptionistAgent = subAgents.find((a) => a.id === 'receptionist') || subAgents[1];
  const salesAgent = subAgents.find((a) => a.id === 'sales') || subAgents[2];

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-blue-400" />
            <span>AI Lead Agent Terminal</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time autonomous discovery, qualification, and communication engine.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isRunning
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-500'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Master Agent</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Master Agent</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRunManualScan}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Trigger Instant Scan</span>
          </button>
        </div>
      </div>

      {/* Grid: Agent Configuration & Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live Status & Controls */}
        <div className="space-y-5">
          
          <div className="rounded-2xl bg-[#0a0e1a] border border-blue-500/30 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Agent Engine Status
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                  isRunning
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                  }`}
                />
                {isRunning ? 'AUTONOMOUS RUNNING' : 'PAUSED'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Target Territory:</span>
                <strong className="text-white font-mono">{user?.location || 'Austin, TX'}</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Industry Filter:</span>
                <strong className="text-blue-400 font-mono">{user?.industry || 'Real Estate'}</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Master Controller:</span>
                <strong className="text-slate-300 font-mono">LeadPilot-Pro-Agent-v4</strong>
              </div>
            </div>
          </div>

          {/* Master Agent Coordination: ACTIVE SUB-AGENTS */}
          <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-400" />
                <span>Active Sub-Agents</span>
              </span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                Coordinated Hierarchy
              </span>
            </div>

            <div className="space-y-2">
              {subAgents.map((sa) => {
                const isAct = sa.status === 'active';
                return (
                  <div
                    key={sa.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/90 text-xs transition-all hover:border-slate-700"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isAct ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                        }`}
                      />
                      <span className="text-slate-200 font-semibold">{sa.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isAct
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {isAct ? 'ACTIVE' : 'PAUSED'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleSubAgent(sa.id)}
                        className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 transition-colors"
                      >
                        {isAct ? 'Pause' : 'Activate'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Adjustment Sliders */}
          <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-400" />
              <span>Agent Tuning</span>
            </h3>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Search Radius:</span>
                <span className="font-mono text-white font-bold">{searchRadius}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {['5 mi', '10 mi', '25 mi', '50 mi'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSearchRadius(r.replace(' mi', ' miles'))}
                    className={`py-1.5 text-xs rounded-lg font-mono border transition-all ${
                      searchRadius.startsWith(r.replace(' mi', ''))
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Max Daily Outreach:</span>
                <span className="font-mono text-white font-bold">{dailyQuota} prospects / day</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="10"
                value={dailyQuota}
                onChange={(e) => setDailyQuota(e.target.value)}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Terminal */}
        <div className="lg:col-span-2 rounded-2xl bg-[#06080e] border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
          
          {/* Terminal Window Chrome */}
          <div className="px-4 py-3 bg-[#080c14] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2 font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                leadpilot-agent-stream.log
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Agent Swarm Live</span>
            </div>
          </div>

          {/* Terminal Output */}
          <div className="p-4 flex-1 h-[480px] overflow-y-auto font-mono text-xs space-y-2.5 selection:bg-blue-500/40">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5 leading-relaxed">
                <span className="text-slate-600 select-none shrink-0">[{log.timestamp}]</span>
                <span className={`flex-1 ${getLogColor(log.type)}`}>
                  {log.message}
                </span>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input prompt */}
          <div className="px-4 py-3 bg-[#080c14] border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-slate-500">Autonomous multi-agent loop active. Press &quot;Trigger Instant Scan&quot; to force discovery.</span>
            </div>
            <span className="text-[11px] text-slate-600 hidden sm:inline">PID: 41892</span>
          </div>

        </div>

      </div>

      {/* AI SUB-AGENTS SECTION */}
      <div className="space-y-5 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workforce Expansion</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
              AI SUB-AGENTS
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Specialized AI employees working together to discover, qualify, engage, and convert local prospects.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500">
            Status: <span className="text-emerald-400 font-bold">{subAgents.filter((a) => a.status === 'active').length} of 3 Active</span>
          </div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: AI CHATBOT */}
          <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 hover:border-blue-500/40 p-6 flex flex-col justify-between transition-all duration-200 shadow-xl group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                      chatbotAgent.status === 'active'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        chatbotAgent.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                      }`}
                    />
                    {chatbotAgent.status === 'active' ? 'ACTIVE' : 'PAUSED'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleSubAgent('chatbot')}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-mono"
                    title={chatbotAgent.status === 'active' ? 'Pause Chatbot' : 'Activate Chatbot'}
                  >
                    {chatbotAgent.status === 'active' ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">AI Chatbot</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Engages website visitors and captures qualified leads.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Conversations
                  </span>
                  <span className="text-base font-bold font-mono text-white">
                    {chatbotAgent.metrics.primaryValue}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Qualified Leads
                  </span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {chatbotAgent.metrics.secondaryValue}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Response Rate
                  </span>
                  <span className="text-base font-bold font-mono text-blue-400">
                    {chatbotAgent.metrics.tertiaryValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-6">
              <button
                type="button"
                onClick={() => setActiveModal('chatbot')}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Open Chatbot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('chatbot')}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <span>Test Chatbot</span>
              </button>
            </div>
          </div>

          {/* Card 2: AI RECEPTIONIST */}
          <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-200 shadow-xl group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                      receptionistAgent.status === 'active'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        receptionistAgent.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                      }`}
                    />
                    {receptionistAgent.status === 'active' ? 'ACTIVE' : 'PAUSED'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleSubAgent('receptionist')}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-mono"
                    title={receptionistAgent.status === 'active' ? 'Pause Receptionist' : 'Activate Receptionist'}
                  >
                    {receptionistAgent.status === 'active' ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">AI Receptionist</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Handles inquiries, qualifies callers, and schedules appointments.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Calls Handled
                  </span>
                  <span className="text-base font-bold font-mono text-white">
                    {receptionistAgent.metrics.primaryValue}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Appointments
                  </span>
                  <span className="text-base font-bold font-mono text-purple-400">
                    {receptionistAgent.metrics.secondaryValue}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Qualified Calls
                  </span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {receptionistAgent.metrics.tertiaryValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-6">
              <button
                type="button"
                onClick={() => setActiveModal('receptionist')}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Open Receptionist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('receptionist')}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <span>Test Call</span>
              </button>
            </div>
          </div>

          {/* Card 3: AI SALES AGENT */}
          <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 hover:border-emerald-500/40 p-6 flex flex-col justify-between transition-all duration-200 shadow-xl group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                      salesAgent.status === 'active'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        salesAgent.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                      }`}
                    />
                    {salesAgent.status === 'active' ? 'ACTIVE' : 'PAUSED'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleToggleSubAgent('sales')}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-mono"
                    title={salesAgent.status === 'active' ? 'Pause Sales Agent' : 'Activate Sales Agent'}
                  >
                    {salesAgent.status === 'active' ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">AI Sales Agent</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Follows up with prospects and moves leads toward conversion.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Leads Managed
                  </span>
                  <span className="text-base font-bold font-mono text-white">
                    {salesAgent.metrics.primaryValue}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Follow-ups
                  </span>
                  <span className="text-base font-bold font-mono text-blue-400">
                    {salesAgent.metrics.secondaryValue}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block truncate">
                    Meetings Booked
                  </span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {salesAgent.metrics.tertiaryValue}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-6">
              <button
                type="button"
                onClick={() => setActiveModal('sales')}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Open Sales Agent</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('sales')}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <span>Test Sales Agent</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-Agent Modals */}
      <ChatbotModal
        agent={chatbotAgent}
        isOpen={activeModal === 'chatbot'}
        onClose={() => setActiveModal(null)}
        onToggleStatus={() => handleToggleSubAgent('chatbot')}
      />

      <ReceptionistModal
        agent={receptionistAgent}
        isOpen={activeModal === 'receptionist'}
        onClose={() => setActiveModal(null)}
        onToggleStatus={() => handleToggleSubAgent('receptionist')}
      />

      <SalesAgentModal
        agent={salesAgent}
        isOpen={activeModal === 'sales'}
        onClose={() => setActiveModal(null)}
        onToggleStatus={() => handleToggleSubAgent('sales')}
      />

    </div>
  );
};
