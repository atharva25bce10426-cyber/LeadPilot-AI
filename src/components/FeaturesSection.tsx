import React from 'react';
import {
  Search,
  Brain,
  PenTool,
  RefreshCw,
  LayoutDashboard,
  CalendarCheck,
  Bot,
  BarChart3,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { FEATURES_DATA } from '../data/mockData';

interface FeaturesSectionProps {
  onOpenGetStarted: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onOpenGetStarted }) => {
  const iconMap: Record<string, React.ElementType> = {
    Search,
    Brain,
    PenTool,
    RefreshCw,
    LayoutDashboard,
    CalendarCheck,
    Bot,
    BarChart3,
  };

  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden bg-[#080b13] border-t border-slate-800/80"
    >
      {/* Ambient background blur */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>FULL-STACK LOCAL LEAD SUITE</span>
          </div>

          <h2
            id="features-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Everything you need to turn prospects into customers.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Engineered specifically for local service businesses. Every tool works in harmony to keep your sales calendar full.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES_DATA.map((feat) => {
            const IconComponent = iconMap[feat.iconName] || Bot;
            return (
              <div
                key={feat.id}
                id={`feature-card-${feat.id}`}
                className="group relative rounded-2xl p-6 bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-850 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: Icon & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors shadow-md">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                      {feat.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-blue-200 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Bottom Highlight */}
                {feat.statHighlight && (
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 font-mono">
                      {feat.statHighlight}
                    </span>
                    <button
                      type="button"
                      onClick={onOpenGetStarted}
                      className="text-xs text-slate-400 group-hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
