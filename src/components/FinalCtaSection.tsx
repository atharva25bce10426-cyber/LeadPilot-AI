import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenGetStarted: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenGetStarted }) => {
  return (
    <section
      id="final-cta"
      className="py-24 relative overflow-hidden bg-[#07090e] border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Visually Striking Hero Box */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0e172e] via-[#090d18] to-[#120f26] border border-blue-500/40 p-8 sm:p-14 lg:p-18 text-center shadow-2xl shadow-blue-950/50 overflow-hidden ring-1 ring-white/10">
          
          {/* Internal Glow Effects */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-purple-600/25 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>START GENERATING LOCAL LEADS TODAY</span>
            </div>

            {/* Headline Required by Prompt */}
            <h2
              id="final-cta-headline"
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              Stop chasing customers.{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Let AI find them.
              </span>
            </h2>

            {/* Subheadline Required by Prompt */}
            <p
              id="final-cta-subheadline"
              className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
            >
              Give your business an always-on AI lead generation agent and start turning prospects into customers.
            </p>

            {/* CTA Button Required by Prompt */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="final-cta-button"
                type="button"
                onClick={onOpenGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-2xl shadow-blue-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 border border-blue-400/40"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Secondary Text Required by Prompt */}
            <p
              id="final-cta-secondary-text"
              className="text-xs sm:text-sm text-slate-400 font-medium"
            >
              Set up your AI agent in minutes.
            </p>

            {/* Reassurance Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                14-Day Free Pilot Trial
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Instant 5-Minute Onboarding
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
