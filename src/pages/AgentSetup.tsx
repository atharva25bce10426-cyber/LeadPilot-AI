import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';

export const AgentSetup: React.FC = () => {
  const { user, completeOnboarding, testDriveData } = useAuth();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<'loading' | 'ready'>('loading');
  const [activeStep, setActiveStep] = useState<number>(0);

  // Steps animation sequence
  const steps = [
    { title: 'Business profile created', desc: `${user?.industry || 'Local Business'} parameters calibrated` },
    { title: 'Target audience defined', desc: 'Intent scoring models primed' },
    { title: 'Local market configured', desc: `Targeting ${user?.location || testDriveData?.city || 'Austin, TX'} (${user?.searchRadius || '25 miles'})` },
    { title: 'Finding high-intent prospects...', desc: 'Scanning public business listings & web presence' },
    { title: 'Preparing lead scoring', desc: 'Calculating conversion probability' },
  ];

  useEffect(() => {
    // Step progression animation
    const timer1 = setTimeout(() => setActiveStep(1), 600);
    const timer2 = setTimeout(() => setActiveStep(2), 1200);
    const timer3 = setTimeout(() => setActiveStep(3), 1900);
    const timer4 = setTimeout(() => setActiveStep(4), 2700);
    const timer5 = setTimeout(() => {
      setActiveStep(5);
      setPhase('ready');
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleOpenDashboard = () => {
    completeOnboarding({});
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-xl mx-auto w-full">
        
        {/* Top Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-500 p-0.5 shadow-lg shadow-blue-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
              LeadPilot <span className="text-xs text-blue-400 font-mono">AI</span>
            </span>
          </div>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl bg-[#0b0f1a] border border-blue-500/40 p-6 sm:p-10 shadow-2xl shadow-blue-950/60 ring-1 ring-white/10 relative overflow-hidden text-center">
          
          {phase === 'loading' ? (
            <div className="space-y-8 animate-in fade-in">
              
              {/* Spinner & Pulsing Icon */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-2xl bg-blue-600/20 animate-ping opacity-75" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-xl shadow-blue-500/30">
                  <div className="w-full h-full bg-[#090d16] rounded-[14px] flex items-center justify-center">
                    <Loader2 className="w-9 h-9 text-blue-400 animate-spin" />
                  </div>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Your AI agent is getting ready...
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Connecting local search clusters in {user?.location || 'Austin, TX'} for {user?.industry || 'your business'}
                </p>
              </div>

              {/* Progress Checklist */}
              <div className="text-left space-y-3.5 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
                {steps.map((s, idx) => {
                  const isDone = activeStep > idx;
                  const isCurrent = activeStep === idx;

                  return (
                    <div
                      key={s.title}
                      className={`flex items-center gap-3 transition-opacity duration-300 ${
                        isDone || isCurrent ? 'opacity-100' : 'opacity-35'
                      }`}
                    >
                      <div className="shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isCurrent ? (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600">
                            ○
                          </div>
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <span
                          className={`text-sm font-semibold block ${
                            isDone ? 'text-white' : isCurrent ? 'text-blue-300 font-bold' : 'text-slate-400'
                          }`}
                        >
                          {s.title}
                        </span>
                        <span className="text-[11px] text-slate-400 block">{s.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ) : (
            <div className="space-y-7 animate-in fade-in duration-300">
              
              {/* Ready Badge */}
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>INITIAL SCAN COMPLETE</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  Your AI agent is ready.
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  LeadPilot AI has established your local prospecting baseline and queued top matches for automated outreach.
                </p>
              </div>

              {/* 3 Metric Cards Highlighted in Prompt */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                    127
                  </span>
                  <span className="text-xs text-slate-300 font-medium block mt-0.5">
                    potential customers found
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 block">
                    64
                  </span>
                  <span className="text-xs text-blue-200 font-medium block mt-0.5">
                    high-intent leads
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block">
                    18
                  </span>
                  <span className="text-xs text-emerald-200 font-medium block mt-0.5">
                    strong opportunities
                  </span>
                </div>
              </div>

              {/* CTA: Open My Dashboard */}
              <div className="pt-2">
                <button
                  type="button"
                  id="agent-setup-open-dashboard"
                  onClick={handleOpenDashboard}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-[0.99] border border-blue-400/40"
                >
                  <span>Open My Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
