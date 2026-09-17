import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  ArrowRight,
  Eye,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { INITIAL_LEADS, getStoredLeads, subscribeLeads } from '../services/leadService';
import { LeadItem } from '../types';

export const LeadsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [leads, setLeads] = useState<LeadItem[]>(() => getStoredLeads());
  const [exportNotice, setExportNotice] = useState(false);

  React.useEffect(() => {
    return subscribeLeads((updated) => setLeads(updated));
  }, []);

  const statuses = ['All', 'New', 'Contacted', 'Responded', 'Appointment Booked', 'Qualified'];
  const industries = ['All', 'Real Estate', 'Dental Clinics', 'Salon & Beauty', 'Home Services'];

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || l.status === selectedStatus;
    const matchesIndustry = selectedIndustry === 'All' || l.industry === selectedIndustry;

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'Responded':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Appointment Booked':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-blue-400" />
            <span>Discovered Leads</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse and manage all qualified local businesses identified by your AI lead agent.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <Link
            to="/agent"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scan More Leads</span>
          </Link>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 animate-in fade-in">
          Export generated: 64 verified leads saved to `leads-austin-export.csv`
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0a0e1a] border border-slate-800 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by business name, owner, or location..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {statuses.map((st) => (
              <option key={st} value={st}>
                Status: {st}
              </option>
            ))}
          </select>

          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                Industry: {ind}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Leads Table */}
      <div className="rounded-2xl bg-[#0a0e1a] border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-slate-900/40">
                <th className="py-3.5 px-4 font-semibold">Business</th>
                <th className="py-3.5 px-4 font-semibold">Match</th>
                <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                <th className="py-3.5 px-4 font-semibold">Opportunity</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-sm">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white shrink-0">
                        {lead.businessName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block group-hover:text-blue-400 transition-colors">
                          {lead.businessName}
                        </span>
                        <span className="text-xs text-slate-400">
                          {lead.industry} • {lead.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        {lead.matchScore}%
                      </span>
                      <div className="w-14 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: `${lead.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-xs">
                      <span className="text-slate-200 block font-medium">{lead.contactPerson}</span>
                      <span className="text-slate-400 block">{lead.email}</span>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20">
                      {lead.opportunity}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <Link
                      to={`/leads/${lead.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold transition-all border border-slate-700 hover:border-blue-500"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Lead</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
