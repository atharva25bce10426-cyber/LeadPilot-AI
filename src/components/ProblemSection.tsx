import React from 'react';
import { X, Check, Clock, Database, MessageSquare, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';
import { COMPARISON_POINTS } from '../data/mockData';

interface ProblemSectionProps {
  onOpenGetStarted: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenGetStarted }) => {
  return (
    <section
      id="problem-section"
      className="py-24 relative overflow-hidden bg-[#07090e]"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider border border-slate-700">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>The Traditional Lead Struggle</span>
          </div>

          <h2
            id="problem-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            Running a local business is hard enough.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            You started your business to serve clients and master your craft—not to spend 15+ exhausting hours every week hunting down prospects, sending cold copy-pasted messages, and wrestling with messy spreadsheets.
          </p>
        </div>

        {/* The 6 Frustrations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {[
            'Searching for potential customers',
            'Manually collecting leads',
            'Sending repetitive messages',
            'Following up with prospects',
            'Managing messy spreadsheets',
            'Guessing which leads are worth it',
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-left flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold mb-2">
                ✕
              </div>
              <p className="text-xs text-slate-300 font-medium leading-snug">{item}</p>
            </div>
          ))}
        </div>

        {/* Visual Comparison: WITHOUT AI vs WITH LEADPILOT AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* WITHOUT AI Card */}
          <div
            id="comparison-without-ai"
            className="rounded-2xl bg-gradient-to-b from-[#131015] to-[#0d0a0f] border border-red-500/20 p-6 sm:p-8 shadow-xl shadow-red-950/10 relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-6 border-b border-red-900/30 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-400 font-mono">
                  THE OLD WAY
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">WITHOUT AI</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <X className="w-6 h-6" />
              </div>
            </div>

            <div className="space-y-4">
              {COMPARISON_POINTS.withoutAi.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-red-950/10 border border-red-900/20 hover:border-red-800/30 transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                    ✕
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-200">{point.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-red-900/20 flex items-center justify-between text-xs text-red-300/80">
              <span>Result: Low conversion, wasted weekends</span>
              <span className="font-mono font-bold text-red-400">15+ hrs/week lost</span>
            </div>
          </div>

          {/* WITH LEADPILOT AI Card */}
          <div
            id="comparison-with-ai"
            className="rounded-2xl bg-gradient-to-b from-[#0b1426] to-[#080d1a] border border-blue-500/40 p-6 sm:p-8 shadow-2xl shadow-blue-900/20 relative overflow-hidden ring-1 ring-blue-500/30"
          >
            {/* Subtle glow highlight */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-blue-900/40 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  THE LEADPILOT ADVANTAGE
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">WITH LEADPILOT AI</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Check className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="space-y-4">
              {COMPARISON_POINTS.withAi.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-blue-950/20 border border-blue-800/30 hover:border-blue-700/50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-100">{point.title}</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-blue-900/30 flex items-center justify-between">
              <span className="text-xs text-blue-200/90 font-medium">
                Result: Reliable client bookings on autopilot
              </span>
              <button
                type="button"
                onClick={onOpenGetStarted}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Switch to AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
