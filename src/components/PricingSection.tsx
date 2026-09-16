import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden bg-[#080b13] border-t border-slate-800/80"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <span>TRANSPARENT ROI</span>
          </div>

          <h2
            id="pricing-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Simple pricing. More customers.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Choose the plan that matches your monthly growth goals. Upgrade or cancel anytime with one click.
          </p>

          {/* Billing Switch: Monthly vs Annual */}
          <div className="flex items-center justify-center gap-3 pt-3">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Monthly
            </span>
            <button
              type="button"
              id="pricing-billing-toggle"
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 bg-slate-800 rounded-full p-1 border border-slate-700 relative transition-colors focus:outline-none"
              aria-label="Toggle annual or monthly billing"
            >
              <div
                className={`w-5 h-5 bg-blue-500 rounded-full shadow-md transition-transform duration-200 ${
                  isAnnual ? 'translate-x-7 bg-gradient-to-r from-blue-400 to-indigo-400' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              <span>Annual</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-10">
          {PRICING_PLANS.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.isPopular
                    ? 'bg-gradient-to-b from-[#101b33] to-[#0a1020] border-2 border-blue-500 shadow-2xl shadow-blue-500/20 lg:-translate-y-2'
                    : 'bg-slate-900/60 border border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-mono text-[11px] font-bold uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Plan Name & Description */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-extrabold text-white tracking-wide font-mono">
                      {plan.name}
                    </h3>
                    {plan.badge && !plan.isPopular && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                      ${price}
                    </span>
                    <span className="text-slate-400 text-sm font-medium">/month</span>
                    {isAnnual && (
                      <span className="text-[11px] text-slate-500 font-mono ml-1">
                        (billed annually)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pb-8 border-t border-slate-800/80 pt-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                      Included in {plan.name}:
                    </p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.isPopular ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    id={`pricing-cta-${plan.id}`}
                    type="button"
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]'
                        : 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explicit Prompt Requirement: "No credit card required to get started." */}
        <div className="text-center space-y-2">
          <p
            id="pricing-no-credit-card"
            className="text-sm font-semibold text-slate-300 flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>No credit card required to get started.</span>
          </p>
          <p className="text-xs text-slate-400">
            14-day free pilot trial • Keep all qualified leads discovered during your trial
          </p>
        </div>

      </div>
    </section>
  );
};
