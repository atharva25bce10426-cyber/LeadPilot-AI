import React, { useState } from 'react';
import { Send, Plus, Play, Pause, BarChart2, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { INITIAL_CAMPAIGNS } from '../services/leadService';
import { CampaignItem } from '../types';

export const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(INITIAL_CAMPAIGNS);
  const [showModal, setShowModal] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newMarket, setNewMarket] = useState('Austin, TX');

  const handleToggleStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Paused' : 'Active' } : c
      )
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;

    const newCamp: CampaignItem = {
      id: `camp-${Date.now()}`,
      name: newCampaignName,
      targetMarket: newMarket,
      status: 'Active',
      leadsCount: 35,
      contactedCount: 0,
      responsesCount: 0,
      appointmentsCount: 0,
      createdAt: 'Just now',
    };
    setCampaigns([newCamp, ...campaigns]);
    setNewCampaignName('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Send className="w-6 h-6 text-blue-400" />
            <span>Autonomous Campaigns</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your AI outreach sequences and monitor response rates across different markets.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                    camp.status === 'Active'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {camp.status}
                </span>

                <span className="text-[11px] font-mono text-slate-500">{camp.createdAt}</span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base">{camp.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{camp.targetMarket}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-500 block font-mono">Leads</span>
                  <span className="text-lg font-extrabold text-white">{camp.leadsCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-500 block font-mono">Contacted</span>
                  <span className="text-lg font-extrabold text-blue-400">{camp.contactedCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-500 block font-mono">Responses</span>
                  <span className="text-lg font-extrabold text-indigo-400">{camp.responsesCount}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-500 block font-mono">Booked</span>
                  <span className="text-lg font-extrabold text-purple-400">{camp.appointmentsCount}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleToggleStatus(camp.id)}
                className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                {camp.status === 'Active' ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Activate</span>
                  </>
                )}
              </button>

              <span className="text-xs text-blue-400 hover:underline cursor-pointer">
                Configure Sequence →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0b0f1a] border border-blue-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Create New Outreach Campaign</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                  Campaign Name
                </label>
                <input
                  type="text"
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  placeholder="e.g. Austin Downtown Medical Practitioners"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-bold mb-1.5">
                  Target Market
                </label>
                <input
                  type="text"
                  value={newMarket}
                  onChange={(e) => setNewMarket(e.target.value)}
                  placeholder="e.g. Austin, TX • 25 miles"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
                >
                  Create & Launch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
