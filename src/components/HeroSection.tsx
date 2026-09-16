import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Users,
  Target,
  Calendar,
  DollarSign,
  Search,
  Mail,
  Zap,
  Clock,
  Radio,
} from 'lucide-react';
import { INITIAL_FEED_ITEMS } from '../data/mockData';
import { ActivityFeedItem } from '../types';

interface HeroSectionProps {
  onOpenGetStarted: () => void;
  onScrollToHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenGetStarted,
  onScrollToHowItWorks,
}) => {
  const [feedItems, setFeedItems] = useState<ActivityFeedItem[]>(INITIAL_FEED_ITEMS);
  const [leadsCount, setLeadsCount] = useState(247);
  const [isScanning, setIsScanning] = useState(true);

  // Simulate subtle real-time lead agent activity ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setLeadsCount((prev) => {
        // subtle periodic tick
        if (Math.random() > 0.6) {
          return prev + 1;
        }
        return prev;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      {/* Background Decorative Gradients & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none opacity-30 select-none overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute -top-20 right-1/4 w-[450px] h-[450px] bg-purple-600/25 rounded-full blur-[140px]" />
      </div>

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider shadow-sm shadow-blue-500/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>🤖 AI-POWERED LEAD GENERATION</span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]"
            >
              Your AI Agent for{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Getting More Local Customers.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              id="hero-subheadline"
              className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-xl"
            >
              LeadPilot AI finds, qualifies, and engages potential customers for your business—so you can spend less time chasing leads and more time closing clients.
            </p>

            {/* Primary and Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-primary-cta"
                type="button"
                onClick={onOpenGetStarted}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-semibold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-blue-400/40"
              >
                <span>Get More Leads</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-secondary-cta"
                type="button"
                onClick={onScrollToHowItWorks}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 hover:text-white font-medium text-base border border-slate-700/60 hover:border-slate-600 transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-slate-300 text-slate-300" />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Small Trust Statement */}
            <div
              id="hero-trust-statement"
              className="pt-1 flex items-center gap-2 text-xs sm:text-sm text-slate-400 font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No complicated setup • Built for local businesses • Start generating leads automatically</span>
            </div>

            {/* Micro Stats Row */}
            <div className="pt-4 border-t border-slate-800/60 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-white tracking-tight">500+</p>
                <p className="text-xs text-slate-400 font-medium">Active Local Businesses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400 tracking-tight">3.8x</p>
                <p className="text-xs text-slate-400 font-medium">Avg Lead Response</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400 tracking-tight">24/7</p>
                <p className="text-xs text-slate-400 font-medium">Autonomous Prospecting</p>
              </div>
            </div>

          </div>

          {/* Right Column: High-End Live AI Dashboard Mockup */}
          <div className="lg:col-span-6 relative">
            
            {/* Soft backdrop glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-purple-600/30 rounded-2xl blur-xl opacity-75 -z-10" />

            <div
              id="hero-dashboard-mockup"
              className="relative rounded-2xl bg-[#0b0f19]/95 border border-slate-800/90 shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl"
            >
              {/* Window Header Bar */}
              <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono pl-2">LeadPilot Agent v2.4 • live_stream</span>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-300">Status: Active</span>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 sm:p-6 space-y-6">
                
                {/* Agent Header & Real-Time Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">AI Lead Agent</h3>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Autonomous Mode
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <Radio className="w-3 h-3 text-blue-400 animate-spin" />
                      <span>Scanning Google Maps & local directories within 25 miles</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-mono text-slate-400">Target:</span>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      Dental & Healthcare
                    </span>
                  </div>
                </div>

                {/* Metric Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  {/* Leads Found */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center justify-between text-slate-400 mb-1.5">
                      <span className="text-xs font-medium">Leads Found</span>
                      <Users className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {leadsCount}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium">+14 today</span>
                  </div>

                  {/* Qualified Leads */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 transition-all">
                    <div className="flex items-center justify-between text-slate-400 mb-1.5">
                      <span className="text-xs font-medium">Qualified Leads</span>
                      <Target className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      86
                    </div>
                    <span className="text-[10px] text-emerald-400 font-medium">34.8% rate</span>
                  </div>

                  {/* Appointments */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition-all">
                    <div className="flex items-center justify-between text-slate-400 mb-1.5">
                      <span className="text-xs font-medium">Appointments</span>
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      31
                    </div>
                    <span className="text-[10px] text-purple-300 font-medium">Confirmed</span>
                  </div>

                  {/* Estimated Revenue */}
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center justify-between text-slate-400 mb-1.5">
                      <span className="text-xs font-medium">Est. Revenue</span>
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 tracking-tight">
                      $12,450
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">Pipeline ROI</span>
                  </div>

                </div>

                {/* Live Activity Feed */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Live AI Activity Feed
                      </span>
                      <span className="flex h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">Syncing in real-time</span>
                  </div>

                  <div className="space-y-2.5">
                    {feedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 hover:bg-slate-800/50 hover:border-slate-700/60 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                            {item.icon === 'calendar' && <Calendar className="w-3.5 h-3.5 text-purple-400" />}
                            {item.icon === 'mail' && <Mail className="w-3.5 h-3.5 text-blue-400" />}
                            {item.icon === 'zap' && <Zap className="w-3.5 h-3.5 text-amber-400" />}
                            {item.icon === 'check' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            {item.icon === 'user' && <Search className="w-3.5 h-3.5 text-sky-400" />}
                          </div>

                          <div className="truncate">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-white truncate">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-slate-400 hidden sm:inline truncate">
                                • {item.business}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400 flex sm:hidden truncate">
                              {item.business}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${item.tagColor}`}
                          >
                            {item.tag}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                            {item.timeAgo}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Active Agent Status Bar */}
                <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-800/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs text-blue-200 font-medium">
                      Agent queued next outreach in 3m 40s (Apex Aesthetic Clinic)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onOpenGetStarted}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-2 flex items-center gap-1"
                  >
                    Configure Agent →
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
