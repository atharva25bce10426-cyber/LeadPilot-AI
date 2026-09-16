import React, { useState } from 'react';
import {
  Smile,
  Home,
  Sparkles,
  Activity,
  Wrench,
  UtensilsCrossed,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { USE_CASES_DATA } from '../data/mockData';

interface UseCasesSectionProps {
  onOpenGetStarted: (industryPreset?: string) => void;
}

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onOpenGetStarted }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('dentists');

  const iconMap: Record<string, React.ElementType> = {
    Smile,
    Home,
    Sparkles,
    Activity,
    Wrench,
    UtensilsCrossed,
  };

  return (
    <section
      id="use-cases"
      className="py-24 relative overflow-hidden bg-[#07090e] border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <span>TAILORED FOR LOCAL NICHES</span>
          </div>

          <h2
            id="use-cases-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            One AI agent. Every local business.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Whether you operate a dental clinic, high-end salon, real estate brokerage, or home contracting service, LeadPilot adapts its logic to your local market.
          </p>
        </div>

        {/* 6 Use Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {USE_CASES_DATA.map((item) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;
            const isSelected = selectedCaseId === item.id;

            return (
              <div
                key={item.id}
                id={`use-case-card-${item.id}`}
                onClick={() => setSelectedCaseId(item.id)}
                className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0e1628] border-blue-500/80 shadow-xl shadow-blue-500/15 scale-[1.01]'
                    : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div>
                  {/* Card Header with Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {item.category}
                      </h3>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      {item.metric}
                    </span>
                  </div>

                  {/* Core Description from Prompt */}
                  <p className="text-sm text-slate-200 font-semibold mb-2">
                    {item.headline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Sub-niches Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.idealFor.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Metric & Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {item.metricLabel}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenGetStarted(item.category);
                    }}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <span>Deploy Agent</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Primary Call to Action */}
        <div className="text-center">
          <button
            id="use-cases-cta-button"
            type="button"
            onClick={() => onOpenGetStarted()}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all border border-blue-400/30"
          >
            <span>See How LeadPilot Works for Your Business</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-xs text-slate-400 mt-2.5">
            Custom playbooks ready for over 15+ local service categories
          </p>
        </div>

      </div>
    </section>
  );
};
