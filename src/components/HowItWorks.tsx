import React, { useState } from 'react';
import {
  Compass,
  Filter,
  Send,
  CalendarCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Star,
  Mail,
  UserCheck,
} from 'lucide-react';
import { STEPS_DATA } from '../data/mockData';

export const HowItWorks: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepVisuals = [
    {
      // 01 Find
      icon: Compass,
      renderPreview: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400 font-mono">Target: Dental Clinics in Austin, TX</span>
            <span className="text-blue-400 font-semibold">128 Identified</span>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Dr. Evelyn Reed (Metro Smile)', rating: '4.9 ★ (184 reviews)', distance: '3.2 miles away' },
              { name: 'Hill Country Orthodontics', rating: '4.7 ★ (92 reviews)', distance: '5.8 miles away' },
              { name: 'Boutique Aesthetic Dentistry', rating: '4.8 ★ (140 reviews)', distance: '4.1 miles away' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-medium text-slate-200">{p.name}</span>
                </div>
                <span className="text-[11px] text-slate-400">{p.distance}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>AI geo-locates high-density commercial hubs matching your ICP</span>
          </p>
        </div>
      ),
    },
    {
      // 02 Qualify
      icon: Filter,
      renderPreview: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400 font-mono">Lead Qualification Matrix</span>
            <span className="text-emerald-400 font-semibold">Quality Score: 94/100</span>
          </div>
          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Revenue & Patient Capacity</span>
                <span className="text-emerald-400 font-bold">High (3 Chairs Open)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[88%]" />
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Online Intake Need Indicator</span>
                <span className="text-blue-400 font-bold">Urgent (Outdated PDF)</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full w-[94%]" />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-emerald-400 font-medium">
            ✓ Filtered out 64 low-ticket tire kickers automatically
          </p>
        </div>
      ),
    },
    {
      // 03 Engage
      icon: Send,
      renderPreview: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400 font-mono">Generated Personalized Email</span>
            <span className="text-purple-400 font-semibold font-mono">Ready to Send</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
            <p className="font-semibold text-white">Subject: Dr. Reed — Quick idea on filling your Friday chair openings</p>
            <p className="text-slate-300 text-[11px]">
              &quot;Hi Dr. Reed, congratulations on your recent 5-star patient review on Congress Ave! I noticed patients can only book by phone during 9-5 hours...&quot;
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Drip Sequence: 3 follow-ups scheduled</span>
            <span className="text-purple-400 font-semibold">Zero Robot Cliches</span>
          </div>
        </div>
      ),
    },
    {
      // 04 Convert
      icon: CalendarCheck,
      renderPreview: () => (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-slate-400 font-mono">Google Calendar Sync</span>
            <span className="text-emerald-400 font-semibold">New Meeting Added</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Strategy Demo with Dr. Reed</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[10px]">
                Confirmed
              </span>
            </div>
            <p className="text-slate-300 text-[11px]">
              🗓️ Thursday, 2:00 PM – 2:30 PM (CST)
            </p>
            <p className="text-slate-400 text-[11px]">
              Guest: dr.reed@metrosmile.com • SMS reminder scheduled
            </p>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lead automatically turned into a warm calendar appointment</span>
          </p>
        </div>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden bg-[#080b13] border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <span>AUTOMATED 4-STEP FUNNEL</span>
          </div>

          <h2
            id="how-it-works-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            From zero to new customers—automatically.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            LeadPilot transforms cold outreach into a reliable client acquisition engine in four seamless phases.
          </p>
        </div>

        {/* 4 Connected Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-25 -z-0" />

          {STEPS_DATA.map((stepItem, idx) => {
            const isCurrent = activeStepIndex === idx;
            const StepIcon = stepVisuals[idx].icon;

            return (
              <div
                key={stepItem.step}
                id={`how-it-works-step-${stepItem.step}`}
                onClick={() => setActiveStepIndex(idx)}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
                  isCurrent
                    ? 'bg-[#0f172a] border-2 border-blue-500/80 shadow-xl shadow-blue-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg transition-colors ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-slate-700'
                      }`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>

                    <span
                      className={`text-sm font-mono font-bold px-2.5 py-1 rounded-md border ${
                        isCurrent
                          ? 'text-blue-400 bg-blue-500/10 border-blue-500/30'
                          : 'text-slate-500 bg-slate-800/60 border-slate-700/50'
                      }`}
                    >
                      STEP {stepItem.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {stepItem.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {stepItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">{stepItem.detail}</span>
                  <span className="text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    {isCurrent ? 'Viewing' : 'Inspect'} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Step Live Simulation Box */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0b101d]/90 to-slate-900/90 border border-slate-800/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-mono font-bold flex items-center justify-center text-sm">
                {STEPS_DATA[activeStepIndex].step}
              </span>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {STEPS_DATA[activeStepIndex].title}
                </h4>
                <p className="text-xs text-slate-400">
                  {STEPS_DATA[activeStepIndex].badge} • Active Pipeline Engine
                </p>
              </div>
            </div>

            {/* Quick Step Switcher Tabs */}
            <div className="flex items-center gap-2">
              {STEPS_DATA.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    activeStepIndex === idx
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.step} {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Render Step Preview Widget */}
          <div className="pt-2">
            {stepVisuals[activeStepIndex].renderPreview()}
          </div>
        </div>

      </div>
    </section>
  );
};
