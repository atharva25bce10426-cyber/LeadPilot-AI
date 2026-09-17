import React, { useState } from 'react';
import {
  MessageSquare,
  Bot,
  Play,
  Pause,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sliders,
  ShieldCheck,
  Building,
  DollarSign,
  Clock,
  MapPin,
  HelpCircle,
  X,
  RefreshCw,
  UserCheck,
} from 'lucide-react';
import { SubAgentInfo } from '../../types';
import {
  DEFAULT_CHATBOT_CONFIG,
  registerChatbotQualifiedLead,
} from '../../services/agentService';

interface ChatbotModalProps {
  agent: SubAgentInfo;
  isOpen: boolean;
  onClose: () => void;
  onToggleStatus: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'visitor';
  text: string;
  time: string;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  agent,
  isOpen,
  onClose,
  onToggleStatus,
}) => {
  const [greeting, setGreeting] = useState(DEFAULT_CHATBOT_CONFIG.greeting);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [qualifiedLeadSaved, setQualifiedLeadSaved] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: greeting,
      time: 'Just now',
    },
  ]);

  if (!isOpen) return null;

  const isActive = agent.status === 'active';

  const handleStartSimulation = () => {
    if (!isActive) return;
    setIsSimulating(true);
    setSimStep(1);
    setQualifiedLeadSaved(false);

    // Initial greeting
    setMessages([
      {
        id: 'msg-1',
        sender: 'ai',
        text: greeting,
        time: '10:18 AM',
      },
    ]);

    // Step 1: Visitor interest
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-2',
          sender: 'visitor',
          text: "I'm interested in your services for local business growth.",
          time: '10:18 AM',
        },
      ]);
      setSimStep(2);
    }, 1000);

    // Step 2: AI inquiry
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-3',
          sender: 'ai',
          text: 'Absolutely! Which service are you most interested in implementing?',
          time: '10:18 AM',
        },
      ]);
      setSimStep(3);
    }, 2200);

    // Step 3: Visitor response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-4',
          sender: 'visitor',
          text: 'Website development and speed-to-lead automation.',
          time: '10:19 AM',
        },
      ]);
      setSimStep(4);
    }, 3400);

    // Step 4: AI qualification ask
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-5',
          sender: 'ai',
          text: 'Great choice. When are you looking to get started, and what is your best contact info so we can prepare your custom blueprint?',
          time: '10:19 AM',
        },
      ]);
      setSimStep(5);
    }, 4600);

    // Step 5: Visitor contact details
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-6',
          sender: 'visitor',
          text: 'Ready this week! Alex Rivera | alex.rivera@example.com | (512) 555-0199',
          time: '10:19 AM',
        },
      ]);
      setSimStep(6);
    }, 5800);

    // Step 6: AI qualification confirmation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-7',
          sender: 'ai',
          text: "Thank you Alex! You've been qualified as a priority partner. Our AI Sales Agent has scheduled a consultation prep file for our team.",
          time: '10:20 AM',
        },
      ]);
      setSimStep(7);
      setIsSimulating(false);
    }, 7000);
  };

  const handleSaveToPipeline = () => {
    registerChatbotQualifiedLead({
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      phone: '(512) 555-0199',
      service: 'Website Development & Speed-to-Lead',
      budget: '$1,200/mo',
      timeline: 'This week',
    });
    setQualifiedLeadSaved(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0a0e1a] border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#080c14] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {agent.name}
                </h2>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                    }`}
                  />
                  {isActive ? 'ACTIVE' : 'PAUSED'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{agent.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleStatus}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isActive
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                  : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Chatbot</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Activate Chatbot</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isActive && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
              <span>
                <strong>Chatbot is currently paused.</strong> Live website responses, widget greeting, and visitor qualification are temporarily halted.
              </span>
            </div>
          )}

          {/* Top Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                {agent.metrics.primaryLabel}
              </span>
              <span className="text-xl font-bold font-mono text-white">
                {agent.metrics.primaryValue}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                {agent.metrics.secondaryLabel}
              </span>
              <span className="text-xl font-bold font-mono text-emerald-400">
                {agent.metrics.secondaryValue}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90">
              <span className="text-xs font-medium text-slate-400 block mb-1">
                {agent.metrics.tertiaryLabel}
              </span>
              <span className="text-xl font-bold font-mono text-blue-400">
                {agent.metrics.tertiaryValue}
              </span>
            </div>
          </div>

          {/* Two Columns: Config & Interactive Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Configuration & Knowledge Base */}
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <span>Chatbot Configuration</span>
                  </h3>
                  <span className="text-[10px] text-blue-400 font-mono bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Auto-Synchronized
                  </span>
                </div>

                {/* Greeting Message */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">
                    Greeting Message (Website Widget)
                  </label>
                  <input
                    type="text"
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                    disabled={!isActive}
                    className="w-full bg-[#07090e] border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                  />
                </div>

                {/* Business Knowledge */}
                <div>
                  <label className="text-xs text-slate-400 block mb-2 font-medium">
                    Active Business Knowledge Base
                  </label>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#07090e] border border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-blue-400" />
                        <span>Services</span>
                      </span>
                      <span className="font-mono text-slate-200">4 Offerings Active</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#07090e] border border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Pricing</span>
                      </span>
                      <span className="font-mono text-slate-200">$499 - $1,499/mo</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#07090e] border border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>Operating Hours</span>
                      </span>
                      <span className="font-mono text-slate-200">24/7 Autonomous</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#07090e] border border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Location & Radius</span>
                      </span>
                      <span className="font-mono text-slate-200">Austin, TX (25 mi)</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#07090e] border border-slate-800/80">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Trained FAQs</span>
                      </span>
                      <span className="font-mono text-slate-200">14 Q&As Loaded</span>
                    </div>
                  </div>
                </div>

                {/* Lead Qualification Criteria */}
                <div>
                  <label className="text-xs text-slate-400 block mb-1.5 font-medium">
                    Lead Qualification Fields
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {DEFAULT_CHATBOT_CONFIG.leadQualificationFields.map((field) => (
                      <div
                        key={field}
                        className="px-2.5 py-1.5 rounded-lg bg-[#07090e] border border-slate-800/90 text-[11px] text-slate-300 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Test Chatbot Simulation */}
            <div className="space-y-4 flex flex-col">
              <div className="rounded-xl bg-[#06080e] border border-slate-800 flex-1 flex flex-col overflow-hidden shadow-lg min-h-[380px]">
                
                {/* Simulator Chrome */}
                <div className="px-4 py-2.5 bg-[#080c14] border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-mono text-slate-300 font-semibold">
                      Live Chatbot Simulation Testbed
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartSimulation}
                    disabled={!isActive || isSimulating}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-[11px] font-semibold flex items-center gap-1 transition-all"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                    <span>{isSimulating ? 'Running...' : 'Test Chatbot'}</span>
                  </button>
                </div>

                {/* Messages Box */}
                <div className="p-4 flex-1 overflow-y-auto space-y-3 font-sans text-xs">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${
                        m.sender === 'ai' ? 'items-start' : 'items-end'
                      }`}
                    >
                      <span className="text-[10px] text-slate-500 mb-0.5 font-mono">
                        {m.sender === 'ai' ? 'AI Chatbot Agent' : 'Website Visitor'}
                      </span>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 leading-relaxed ${
                          m.sender === 'ai'
                            ? 'bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {isSimulating && (
                    <div className="flex items-center gap-2 text-[11px] text-blue-400 italic">
                      <Bot className="w-3.5 h-3.5 animate-spin" />
                      <span>AI Chatbot is evaluating intent...</span>
                    </div>
                  )}
                </div>

                {/* Lead Qualified Card (shows when qualification completes) */}
                {simStep >= 6 && (
                  <div className="p-3.5 mx-4 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Lead Qualified</span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                        Score: 92% • High Intent
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1">
                      <div><strong>Contact:</strong> Alex Rivera • (512) 555-0199 • alex.rivera@example.com</div>
                      <div><strong>Service:</strong> Website Development & Speed-to-Lead</div>
                      <div><strong>Recommended Action:</strong> Transfer to AI Sales Agent for consultation scheduling.</div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleSaveToPipeline}
                        disabled={qualifiedLeadSaved}
                        className={`w-full py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          qualifiedLeadSaved
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20'
                        }`}
                      >
                        {qualifiedLeadSaved ? (
                          <>
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Saved to Leads Pipeline & AI Terminal Logged</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Save Lead to Pipeline</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#080c14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Ready for website widget embed & Gemini API integration</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Back to AI Agent
          </button>
        </div>

      </div>
    </div>
  );
};
