import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Bot,
  Sparkles,
  MapPin,
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  Send,
  CalendarCheck,
  Building,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../services/AuthContext';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndustry?: string;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  initialIndustry = 'Dental Clinics',
}) => {
  const navigate = useNavigate();
  const { recordTestDriveScan } = useAuth();
  const [step, setStep] = useState<'form' | 'scanning' | 'results'>('form');
  const [industry, setIndustry] = useState(initialIndustry);
  const [city, setCity] = useState('Austin, TX');
  const [businessName, setBusinessName] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  if (!isOpen) return null;

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('scanning');
    setScanProgress(15);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep('results');
          recordTestDriveScan({
            industry,
            city,
            businessName: businessName.trim() || undefined,
            prospectsFound: 128,
            qualifiedLeads: 64,
            scannedAt: new Date().toISOString(),
          });
          return 100;
        }
        return prev + 20;
      });
    }, 450);
  };

  const handleCreateAccountAndUnlock = () => {
    recordTestDriveScan({
      industry,
      city,
      businessName: businessName.trim() || undefined,
      prospectsFound: 128,
      qualifiedLeads: 64,
      scannedAt: new Date().toISOString(),
    });
    onClose();
    handleReset();
    navigate('/signup');
  };

  const handleReset = () => {
    setStep('form');
    setScanProgress(0);
  };

  return (
    <div
      id="onboarding-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
    >
      <div
        id="onboarding-modal-container"
        className="relative w-full max-w-xl rounded-2xl bg-[#0b0f1a] border border-blue-500/40 p-6 sm:p-8 shadow-2xl shadow-blue-950/60 overflow-hidden ring-1 ring-white/10"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Test Drive LeadPilot AI Agent
            </h3>
            <p className="text-xs text-slate-400">
              Configure your local market parameters to see AI discovery live
            </p>
          </div>
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form onSubmit={handleStartScan} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                Select Your Business Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="Dental Clinics">Dental Clinics & Orthodontics</option>
                <option value="Real Estate">Real Estate Agents & Brokers</option>
                <option value="Home Services">Home Remodeling, HVAC & Plumbing</option>
                <option value="Salons and Spas">Salons, Med Spas & Aesthetics</option>
                <option value="Gyms & Fitness">Gyms, CrossFit & Personal Training</option>
                <option value="Restaurants">Restaurants & Event Catering</option>
                <option value="Auto Repair">Auto Repair & Detailing</option>
                <option value="Legal & Accounting">Legal & Accounting Advisory</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Target City / Metro
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Austin, TX"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-1.5">
                  Your Business Name
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Studio"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 text-xs text-blue-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                The AI will simulate searching public local registries, Google Maps signals, and business sites in <strong>{city}</strong>.
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Run Autonomous AI Prospector</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: SCANNING SIMULATION */}
        {step === 'scanning' && (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 mx-auto flex items-center justify-center text-blue-400">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold text-white">
                Scanning {city} for {industry}...
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                {scanProgress < 40 && 'Querying local Google Maps profiles & verified registries...'}
                {scanProgress >= 40 && scanProgress < 75 && 'Running intent scoring & filtering low-converting leads...'}
                {scanProgress >= 75 && 'Generating personalized icebreakers for qualified prospects...'}
              </p>
            </div>

            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 3: RESULTS PREVIEW */}
        {step === 'results' && (
          <div className="space-y-5 animate-in fade-in">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Scan Completed
                </span>
                <p className="text-sm font-bold text-white">
                  128 Local Prospects Found in {city}
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                64 Qualified
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Preview of Discovered High-Intent Leads:
              </span>

              {[
                { name: `Premier ${industry} Group`, score: '97% Match', tag: 'High Budget', reason: 'Active expansion, high review volume' },
                { name: `Capital ${industry} Hub`, score: '94% Match', tag: 'Urgent Need', reason: 'Missing modern appointment booking flow' },
                { name: `Metro ${industry} Specialists`, score: '91% Match', tag: 'High Intent', reason: 'Outdated website, strong Yelp engagement' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-white block">{item.name}</span>
                    <span className="text-slate-400 text-[11px]">{item.reason}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">{item.score}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                id="modal-unlock-all-leads-button"
                onClick={handleCreateAccountAndUnlock}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.01] transition-all text-center"
              >
                Create Account & Unlock All Leads
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold"
              >
                New Scan
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
