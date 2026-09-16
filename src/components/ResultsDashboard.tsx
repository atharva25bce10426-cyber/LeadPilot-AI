import React, { useState } from 'react';
import {
  TrendingUp,
  Users,
  Target,
  Calendar,
  DollarSign,
  Lightbulb,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { WEEKLY_CHART_DATA } from '../data/mockData';

export const ResultsDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30d' | '60d' | 'all'>('60d');
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  // SVG Chart Dimensions
  const chartHeight = 220;
  const chartWidth = 700;
  const maxLeads = 260;

  // Generate SVG path points
  const points = WEEKLY_CHART_DATA.map((item, index) => {
    const x = (index / (WEEKLY_CHART_DATA.length - 1)) * (chartWidth - 60) + 30;
    const y = chartHeight - (item.leads / maxLeads) * (chartHeight - 40) - 20;
    return { x, y, ...item };
  });

  const pathD = points.reduce(
    (acc, curr, idx) => (idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`),
    ''
  );

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <section
      id="results"
      className="py-24 relative overflow-hidden bg-[#080b12] border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>REAL BUSINESS PERFORMANCE</span>
          </div>

          <h2
            id="results-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Proof that AI drives measurable local revenue.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            See how an active local service business scales its pipeline from Week 1 to Week 8 without hiring an expensive agency.
          </p>
        </div>

        {/* Large Analytics Dashboard Mockup */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0e1424] to-[#080c16] border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Dashboard Header */}
          <div className="px-6 py-5 bg-slate-900/80 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-xl font-bold text-white tracking-tight">Growth Overview</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  Apex Health & Aesthetic Clinic
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Automated multi-channel campaign • Austin Metro Area
              </p>
            </div>

            {/* Timeframe selector tabs */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedTimeframe('30d')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedTimeframe === '30d' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Last 30 Days
              </button>
              <button
                type="button"
                onClick={() => setSelectedTimeframe('60d')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedTimeframe === '60d' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Last 60 Days
              </button>
              <button
                type="button"
                onClick={() => setSelectedTimeframe('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedTimeframe === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Time
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* 4 Primary Metrics Required by Prompt */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* +247 Leads */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Total Leads</span>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  +247 Leads
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>+48% vs previous period</span>
                </div>
              </div>

              {/* +86 Qualified */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Qualified</span>
                  <Target className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 tracking-tight">
                  +86 Qualified
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-indigo-300 font-medium">
                  <span>34.8% Qualification Rate</span>
                </div>
              </div>

              {/* +31 Appointments */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-colors">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">Appointments</span>
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 tracking-tight">
                  +31 Appointments
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-purple-400 font-medium">
                  <span>Calendar Confirmed</span>
                </div>
              </div>

              {/* +18 New Customers */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center justify-between text-emerald-400 mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider">New Customers</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
                  +18 New Customers
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-300 font-medium">
                  <span>$12,450 Direct Added Revenue</span>
                </div>
              </div>

            </div>

            {/* Main Interactive SVG Line & Area Chart */}
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                    Cumulative Leads & Conversion Trajectory (8-Week Sprint)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Continuous AI discovery across verified local Google Maps and web signals
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                    <span className="text-slate-300">Leads Discovered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    <span className="text-slate-300">Appointments</span>
                  </div>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="w-full overflow-x-auto">
                <div className="min-w-[600px]">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-56 overflow-visible"
                  >
                    <defs>
                      <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
                    {[0.2, 0.4, 0.6, 0.8, 1].map((ratio, idx) => (
                      <line
                        key={idx}
                        x1="30"
                        y1={chartHeight * (1 - ratio * 0.8) - 10}
                        x2={chartWidth - 30}
                        y2={chartHeight * (1 - ratio * 0.8) - 10}
                        stroke="#1e293b"
                        strokeDasharray="4 4"
                      />
                    ))}

                    {/* Area fill */}
                    <path d={areaD} fill="url(#leadGradient)" />

                    {/* Primary Line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data Points */}
                    {points.map((pt, i) => (
                      <g key={i} className="cursor-pointer">
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={hoveredWeek === i ? 6 : 4}
                          fill="#0f172a"
                          stroke="#60a5fa"
                          strokeWidth="2.5"
                          onMouseEnter={() => setHoveredWeek(i)}
                          onMouseLeave={() => setHoveredWeek(null)}
                          className="transition-all"
                        />
                        <text
                          x={pt.x}
                          y={chartHeight - 4}
                          textAnchor="middle"
                          fill="#94a3b8"
                          fontSize="11"
                          fontFamily="monospace"
                        >
                          {pt.week}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Interactive Tooltip Callout if hovered */}
              {hoveredWeek !== null && (
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-center justify-between text-xs animate-in fade-in">
                  <span className="font-mono font-bold text-blue-300">
                    Week {hoveredWeek + 1} Snapshot:
                  </span>
                  <div className="flex gap-4 text-slate-200">
                    <span>Leads: <strong className="text-white">{WEEKLY_CHART_DATA[hoveredWeek].leads}</strong></span>
                    <span>Qualified: <strong className="text-indigo-300">{WEEKLY_CHART_DATA[hoveredWeek].qualified}</strong></span>
                    <span>Appointments: <strong className="text-purple-300">{WEEKLY_CHART_DATA[hoveredWeek].appointments}</strong></span>
                    <span>Revenue: <strong className="text-emerald-400">${WEEKLY_CHART_DATA[hoveredWeek].revenue.toLocaleString()}</strong></span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Row: AI Insight Card Required by Prompt */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* The Explicit AI Insight Card */}
              <div
                id="results-ai-insight-card"
                className="md:col-span-8 p-5 rounded-2xl bg-gradient-to-r from-amber-950/20 via-slate-900/80 to-blue-950/20 border border-amber-500/30 shadow-lg relative overflow-hidden"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-amber-300 font-mono tracking-wide">
                        💡 AI Insight
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        High Confidence (96%)
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                      &quot;Your highest-converting prospects are coming from Google Maps searches. Increasing outreach to this segment could improve appointment volume.&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Channel Breakdown */}
              <div className="md:col-span-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Top Converting Channels
                </span>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-blue-400" /> Google Maps
                    </span>
                    <span className="font-bold text-emerald-400">54% Bookings</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-purple-400" /> Local Directories
                    </span>
                    <span className="font-bold text-slate-200">28% Bookings</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-pink-400" /> Instagram & Social
                    </span>
                    <span className="font-bold text-slate-200">18% Bookings</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
