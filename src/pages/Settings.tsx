import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, CheckCircle2, User, Building, Bot, Shield, Bell } from 'lucide-react';
import { useAuth } from '../services/AuthContext';

export const Settings: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [businessName, setBusinessName] = useState(user?.businessName || 'Premier Local Services');
  const [industry, setIndustry] = useState(user?.industry || 'Real Estate');
  const [location, setLocation] = useState(user?.location || 'Austin, TX');
  const [searchRadius, setSearchRadius] = useState(user?.searchRadius || '25 miles');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      businessName,
      industry,
      location,
      searchRadius,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <SettingsIcon className="w-6 h-6 text-blue-400" />
          <span>Workspace Settings</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your business profile, AI targeting parameters, and workspace preferences.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Workspace preferences updated successfully!</span>
        </div>
      )}

      {/* Form Card */}
      <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 p-6 sm:p-8 space-y-6">
        
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Business Profile Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" />
              <span>Business Profile</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1.5">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1.5">
                  Industry / Category
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1.5">
                  Central Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 font-semibold mb-1.5">
                  Search Radius
                </label>
                <select
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="5 miles">5 miles</option>
                  <option value="10 miles">10 miles</option>
                  <option value="25 miles">25 miles</option>
                  <option value="50 miles">50 miles</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Workspace Changes</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
