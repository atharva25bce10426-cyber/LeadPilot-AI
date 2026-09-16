import React, { useState } from 'react';
import {
  Bot,
  User,
  Sparkles,
  ArrowDown,
  ArrowRight,
  Send,
  Zap,
  CheckCircle,
  Filter,
  Users,
  Calendar,
  MessageSquare,
  Building,
  RotateCw,
} from 'lucide-react';
import { INDUSTRY_SCENARIOS } from '../data/mockData';

interface AiAgentSectionProps {
  onOpenGetStarted: () => void;
}

export const AiAgentSection: React.FC<AiAgentSectionProps> = ({ onOpenGetStarted }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const scenario = INDUSTRY_SCENARIOS[selectedScenarioIndex];

  const handleSimulateNew = (index: number) => {
    setIsSimulating(true);
    setSelectedScenarioIndex(index);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  return (
    <section
      id="ai-agent-section"
      className="py-24 relative overflow-hidden bg-[#07090e]"
    >
      {/* Background glow and subtle mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AUTONOMOUS AGENT INTERFACE</span>
          </div>

          <h2
            id="ai-agent-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Your AI sales employee that never clocks out.
          </h2>

          <p
            id="ai-agent-subheadline"
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            LeadPilot AI works continuously in the background to find opportunities and keep your pipeline moving.
          </p>
        </div>

        {/* Industry Scenario Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-mono text-slate-400 mr-2">Try an Industry Scenario:</span>
          {INDUSTRY_SCENARIOS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSimulateNew(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border flex items-center gap-1.5 ${
                selectedScenarioIndex === idx
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* The Large AI Agent Interface Showcase */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0e1322] to-[#090d16] border border-blue-500/30 shadow-2xl shadow-blue-950/40 overflow-hidden ring-1 ring-white/10">
          
          {/* Agent Top Control Bar */}
          <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">LeadPilot Agent #408</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ● Always-On Active
                  </span>
                </div>
                <span className="text-xs text-slate-400">Autonomous Prospector & Outreach Orchestrator</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                id="launch-ai-agent-button-top"
                type="button"
                onClick={onOpenGetStarted}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/30 hover:scale-[1.02] transition-all"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Launch AI Agent</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Panel (Col 7): Conversational AI & Live Analysis */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                  <span>Conversational Command Prompt</span>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="flex-1 bg-slate-800/80 border border-slate-700/60 p-3.5 rounded-2xl rounded-tl-none text-slate-200 text-sm font-medium">
                    <p className="text-slate-400 text-[11px] mb-1">Local Business Owner:</p>
                    <p className="text-white font-medium">&quot;{scenario.query}&quot;</p>
                  </div>
                </div>

                {/* AI Agent Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1 bg-blue-950/25 border border-blue-800/40 p-3.5 rounded-2xl rounded-tl-none text-slate-200 text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-blue-400 text-[11px] font-mono font-semibold">LeadPilot AI Response:</p>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">0.42s latency</span>
                    </div>
                    <p className="text-white font-medium">
                      &quot;{scenario.aiResponse}&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Qualified Prospect & Generated Message Preview */}
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Top Qualified Prospect Detail</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    Match: {scenario.sampleProspect.matchScore}%
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">{scenario.sampleProspect.name}</span>
                    <span className="text-slate-400">{scenario.sampleProspect.location}</span>
                  </div>
                  <p className="text-slate-400">
                    <strong className="text-slate-300">Qualification Signal:</strong> {scenario.sampleProspect.reason}
                  </p>
                  
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block mb-1">
                      AI Personalized Cold Touch #1:
                    </span>
                    <p className="text-slate-300 italic bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                      &quot;{scenario.sampleProspect.generatedMessage}&quot;
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Panel (Col 5): The 5-Stage Conversion Funnel Breakdown */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c101d] border border-slate-800/80 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Autonomous Pipeline Funnel
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-blue-400 font-semibold">
                    Real Conversion Path
                  </span>
                </div>

                {/* The Visual Funnel Flow */}
                <div className="space-y-2 relative">
                  
                  {/* Step 1: Prospects Found */}
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between hover:border-blue-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 font-mono font-bold flex items-center justify-center text-xs">
                        01
                      </span>
                      <span className="text-xs font-medium text-slate-200">Prospects Found</span>
                    </div>
                    <span className="text-base font-extrabold text-white font-mono">
                      {scenario.stats.found}
                    </span>
                  </div>

                  <div className="flex justify-center text-slate-600">
                    <ArrowDown className="w-4 h-4 text-blue-400" />
                  </div>

                  {/* Step 2: Qualified */}
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between hover:border-indigo-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 font-mono font-bold flex items-center justify-center text-xs">
                        02
                      </span>
                      <span className="text-xs font-medium text-slate-200">Qualified</span>
                    </div>
                    <span className="text-base font-extrabold text-indigo-400 font-mono">
                      {scenario.stats.qualified}
                    </span>
                  </div>

                  <div className="flex justify-center text-slate-600">
                    <ArrowDown className="w-4 h-4 text-indigo-400" />
                  </div>

                  {/* Step 3: Contacted */}
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between hover:border-purple-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 font-mono font-bold flex items-center justify-center text-xs">
                        03
                      </span>
                      <span className="text-xs font-medium text-slate-200">Contacted</span>
                    </div>
                    <span className="text-base font-extrabold text-purple-400 font-mono">
                      {scenario.stats.contacted}
                    </span>
                  </div>

                  <div className="flex justify-center text-slate-600">
                    <ArrowDown className="w-4 h-4 text-purple-400" />
                  </div>

                  {/* Step 4: Responses */}
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between hover:border-amber-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                        04
                      </span>
                      <span className="text-xs font-medium text-slate-200">Responses</span>
                    </div>
                    <span className="text-base font-extrabold text-amber-400 font-mono">
                      {scenario.stats.responses}
                    </span>
                  </div>

                  <div className="flex justify-center text-slate-600">
                    <ArrowDown className="w-4 h-4 text-emerald-400" />
                  </div>

                  {/* Step 5: Appointments */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between shadow-lg shadow-emerald-950/40">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
                        05
                      </span>
                      <div>
                        <span className="text-xs font-bold text-white block">Appointments Booked</span>
                        <span className="text-[10px] text-emerald-300">Ready for Consultation</span>
                      </div>
                    </div>
                    <span className="text-xl font-extrabold text-emerald-400 font-mono">
                      {scenario.stats.appointments}
                    </span>
                  </div>

                </div>

                {/* Launch AI Agent Button */}
                <div className="pt-2">
                  <button
                    id="launch-ai-agent-button-bottom"
                    type="button"
                    onClick={onOpenGetStarted}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Launch AI Agent for Your Business</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500 mt-2 font-mono">
                    Zero coding required • Connects in 5 minutes
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
