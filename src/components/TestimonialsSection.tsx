import React from 'react';
import { Star, Quote, CheckCircle2, Building2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden bg-[#07090e] border-t border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider font-mono">
            <span>PROVEN TRANSFORMATION</span>
          </div>

          <h2
            id="testimonials-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Local businesses are turning conversations into customers.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Read how owners cut 15+ hours of manual prospecting each week while keeping their calendars packed.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="rounded-2xl p-7 bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 hover:bg-slate-850 transition-all duration-300 flex flex-col justify-between shadow-xl relative group"
            >
              <div>
                {/* Top Rating & Metric */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    {t.metric}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic mb-6">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-slate-800/80 flex items-center gap-3.5">
                <img
                  src={t.avatarUrl}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/30"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{t.author}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </h4>
                  <p className="text-xs text-slate-400">
                    {t.role}, <span className="text-slate-300 font-medium">{t.business}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small Disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-10">
          * Representative customer testimonials based on real local pilot workflows. Results vary by market and niche.
        </p>

      </div>
    </section>
  );
};
