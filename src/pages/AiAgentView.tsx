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
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';
import { INITIAL_AI_LOGS } from '../services/leadService';
import { AiLogEntry } from '../types';

export const AiAgentView: React.FC = () => {
  const { user } = useAuth();
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<AiLogEntry[]>(INITIAL_AI_LOGS);
  const [searchRadius, setSearchRadius] = useState('25 miles');
  const [dailyQuota, setDailyQuota] = useState('50');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Periodic simulated agent log when active
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const samples = [
        {
          message: `Inspecting Google Business profile for new local clinic in ${user?.location || 'Austin, TX'}...`,
          type: 'search' as const,
        },
        {
          message: 'Website audit complete: missing mobile conversion CTA and speed index is 5.4s.',
          type: 'analysis' as const,
        },
        {
          message: 'Lead score calculated: 95% Match. Adding to outreach queue.',
          type: 'score' as const,
        },
        {
          message: 'Personalized initial email crafted targeting local service gap.',
          type: 'outreach' as const,
        },
      ];
      const randomSample = samples[Math.floor(Math.random() * samples.length)];

      setLogs((prev) => [
        ...prev.slice(-30),
        {
          id: `log-${Date.now()}`,
          timestamp: timeStr,
          message: randomSample.message,
          type: randomSample.type,
        },
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isRunning, user]);

  const handleRunManualScan = () => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        message: `Manual scan triggered for ${user?.location || 'Austin, TX'} within ${searchRadius}.`,
        type: 'search',
      },
      {
        id: `log-${Date.now() + 1}`,
        timestamp: timeStr,
        message: 'Aggregating 42 newly registered business certificates & web domains...',
        type: 'prospect',
      },
    ]);
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

  return (
    <div className="space-y-6 animate-in fade-in">
      
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
                <span>Pause Agent</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Agent</span>
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
          
          <div className="rounded-2xl bg-[#0a0e1a] border border-blue-500/30 p-5 space-y-4">
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
                <span className="text-slate-400">Model:</span>
                <strong className="text-slate-300 font-mono">LeadPilot-Pro-Agent-v4</strong>
              </div>
            </div>
          </div>

          {/* Quick Adjustment Sliders */}
          <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-5 space-y-4">
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
                    className={`py-1.5 text-xs rounded-lg font-mono border ${
                      searchRadius.startsWith(r.replace(' mi', ''))
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
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

            <span className="text-[10px] font-mono text-slate-500">
              Live stdout
            </span>
          </div>

          {/* Terminal Output */}
          <div className="p-4 flex-1 h-[460px] overflow-y-auto font-mono text-xs space-y-2.5 selection:bg-blue-500/40">
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
          <div className="px-4 py-3 bg-[#080c14] border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-emerald-400 font-bold">$</span>
            <span className="text-slate-500">AI agent is scanning autonomously. Press &quot;Trigger Instant Scan&quot; to force crawl.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
