import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  TrendingUp,
  Stethoscope,
  Building,
  Dumbbell,
  Wrench,
  Scissors,
  Briefcase,
} from 'lucide-react';

export const SocialProof: React.FC = () => {
  const categories = [
    { name: 'Dental', brand: 'Aura Dental Care', icon: Stethoscope, sub: 'Cosmetic & Family' },
    { name: 'Real Estate', brand: 'Vanguard Realty', icon: Building, sub: 'Luxury & Residential' },
    { name: 'Fitness', brand: 'Pulse Athletic Club', icon: Dumbbell, sub: 'Gyms & Studios' },
    { name: 'Home Services', brand: 'Evergreen Renovations', icon: Wrench, sub: 'Remodeling & HVAC' },
    { name: 'Beauty', brand: 'Luxe Studio & Spa', icon: Scissors, sub: 'Med Spa & Salons' },
    { name: 'Professional', brand: 'Beacon Advisory', icon: Briefcase, sub: 'Legal & Accounting' },
  ];

  return (
    <section
      id="social-proof-section"
      className="py-14 border-y border-slate-800/80 bg-[#080b12] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Trust Statement */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
            TRUSTED BY 500+ LOCAL BUSINESSES
          </p>
          <h2
            id="social-proof-headline"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            Built for businesses that want more customers.
          </h2>
          <p className="text-sm text-slate-400">
            From single-chair dental practices to high-volume commercial remodelers, LeadPilot fuels local growth without manual grind.
          </p>
        </div>

        {/* Clean text-based placeholder logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="group p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 hover:bg-slate-850 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-2"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-colors">
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors tracking-tight">
                    {cat.brand}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">{cat.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Trust Badges */}
        <div className="mt-10 pt-8 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-400 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>4.9 / 5.0 Average Owner Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>$4.2M+ In Pipeline Created</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>100% CAN-SPAM & Anti-Spam Compliant</span>
          </div>
        </div>

      </div>
    </section>
  );
};
