import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Compass,
  Target,
  Check,
  Building2,
  Stethoscope,
  Scissors,
  Dumbbell,
  UtensilsCrossed,
  Hammer,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';

export const Onboarding: React.FC = () => {
  const { user, updateUser, testDriveData } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states with defaults pre-filled from testDriveData or user
  const [industry, setIndustry] = useState<string>(() => {
    return testDriveData?.industry || user?.industry || 'Real Estate';
  });
  const [location, setLocation] = useState<string>(() => {
    return testDriveData?.city || user?.location || 'Austin, TX';
  });
  const [searchRadius, setSearchRadius] = useState<string>(() => {
    return user?.searchRadius || '25 miles';
  });
  const [targetCustomer, setTargetCustomer] = useState<string>(() => {
    return user?.targetCustomer || 'Homeowners & high-intent clients looking for top local services';
  });
  const [targetLeadCount, setTargetLeadCount] = useState<string>(() => {
    return user?.targetLeadCount || '100';
  });

  const businessTypes = [
    { name: 'Dental Clinic', icon: Stethoscope, desc: 'Patients seeking cosmetic & general care' },
    { name: 'Real Estate', icon: Building2, desc: 'Buyers, sellers & luxury listings' },
    { name: 'Salon & Beauty', icon: Scissors, desc: 'High-ticket medspas, salons & styling' },
    { name: 'Gym & Fitness', icon: Dumbbell, desc: 'Memberships & personal training' },
    { name: 'Restaurant', icon: UtensilsCrossed, desc: 'Private dining, catering & tables' },
    { name: 'Home Services', icon: Hammer, desc: 'Remodeling, HVAC, roofing & plumbing' },
    { name: 'Professional Services', icon: Briefcase, desc: 'Legal, accounting & consulting' },
    { name: 'Other', icon: HelpCircle, desc: 'Specialized local enterprise' },
  ];

  const radiusOptions = ['5 miles', '10 miles', '25 miles', '50 miles'];
  const leadCountOptions = ['25', '50', '100', '250+'];

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Save configuration
      updateUser({
        industry,
        location,
        searchRadius,
        targetCustomer,
        targetLeadCount,
      });
      // Navigate to /agent/setup as required
      navigate('/agent/setup');
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full">
        
        {/* Brand Logo & Progress Pill */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              LeadPilot <span className="text-xs text-blue-400 font-mono">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-blue-400">
            <span>STEP {step} OF 3</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-1.5 mb-10 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Main Card Container */}
        <div className="rounded-3xl bg-[#0b0f1a] border border-blue-500/30 p-6 sm:p-10 shadow-2xl shadow-blue-950/50 ring-1 ring-white/10 relative">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AGENT INITIALIZATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Let&apos;s set up your AI lead agent.
                </h2>
                <p className="text-sm text-slate-300">
                  Tell us a little about your business so your AI agent can find the right customers.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                  What type of business do you run?
                </label>

                {/* 2-Column Selectable Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {businessTypes.map((item) => {
                    const isSelected = industry.toLowerCase().includes(item.name.toLowerCase()) ||
                      (item.name === 'Dental Clinic' && industry.toLowerCase().includes('dental')) ||
                      (item.name === 'Salon & Beauty' && (industry.toLowerCase().includes('salon') || industry.toLowerCase().includes('spa')));

                    const Icon = item.icon;

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setIndustry(item.name)}
                        className={`p-4 rounded-xl border text-left flex items-start justify-between gap-3 transition-all duration-150 ${
                          isSelected
                            ? 'bg-blue-600/15 border-blue-500 shadow-md shadow-blue-500/20'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block">
                              {item.name}
                            </span>
                            <span className="text-xs text-slate-400 line-clamp-1">
                              {item.desc}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  id="onboarding-step1-continue"
                  onClick={handleNext}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>GEO-TARGETING</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Where do you want to find customers?
                </h2>
                <p className="text-sm text-slate-300">
                  Specify your central service territory so the AI scans local registries and Google Maps signals.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    City / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Austin, TX"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    How far should we search?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {radiusOptions.map((rad) => {
                      const isSelected = searchRadius === rad;
                      return (
                        <button
                          key={rad}
                          type="button"
                          onClick={() => setSearchRadius(rad)}
                          className={`py-3 px-4 rounded-xl border text-center font-bold text-sm transition-all ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/15'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          {rad}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-sm font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  id="onboarding-step2-continue"
                  onClick={handleNext}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-200">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-mono font-semibold">
                  <Target className="w-3.5 h-3.5" />
                  <span>INTENT & CAPACITY</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Who is your ideal customer?
                </h2>
                <p className="text-sm text-slate-300">
                  Describe what makes a prospect high value for your practice or business.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Ideal Customer Description
                  </label>
                  <textarea
                    rows={3}
                    value={targetCustomer}
                    onChange={(e) => setTargetCustomer(e.target.value)}
                    placeholder="e.g. Homeowners looking for kitchen renovations or luxury buyers needing representation"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors leading-relaxed"
                  />
                  <p className="mt-1 text-[11px] text-slate-400 font-mono">
                    The AI uses this natural language criteria to calculate conversion match percentages.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    How many leads would you like your AI agent to find?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {leadCountOptions.map((cnt) => {
                      const isSelected = targetLeadCount === cnt;
                      return (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => setTargetLeadCount(cnt)}
                          className={`py-3 px-4 rounded-xl border text-center font-bold text-sm transition-all ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/15'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          }`}
                        >
                          {cnt} leads
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-sm font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  id="onboarding-launch-agent-button"
                  onClick={handleNext}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch My AI Agent</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Reassurance footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          LeadPilot AI dynamically updates your search filters anytime from your dashboard.
        </p>

      </div>
    </div>
  );
};
