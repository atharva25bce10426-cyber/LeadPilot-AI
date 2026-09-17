import {
  SubAgentId,
  SubAgentInfo,
  SubAgentStatus,
  ChatbotConfig,
  ReceptionistConfig,
  SalesAgentMetrics,
  LeadItem,
  AppointmentItem,
  AiLogEntry,
} from '../types';
import {
  addStoredLead,
  addStoredAppointment,
  updateStoredLeadStatus,
  addStoredAiLog,
} from './leadService';

const SUBAGENTS_STORAGE_KEY = 'leadpilot_subagents_config_v1';

const DEFAULT_SUBAGENTS: SubAgentInfo[] = [
  {
    id: 'chatbot',
    name: 'AI Chatbot',
    roleTitle: 'Conversational Website Inbound Agent',
    subtitle: 'Engages website visitors, answers questions, and captures qualified leads 24/7.',
    description: 'Engages website visitors and captures qualified leads.',
    status: 'active',
    metrics: {
      primaryLabel: 'Conversations',
      primaryValue: 148,
      secondaryLabel: 'Qualified Leads',
      secondaryValue: 42,
      tertiaryLabel: 'Response Rate',
      tertiaryValue: '99.4%',
    },
  },
  {
    id: 'receptionist',
    name: 'AI Receptionist',
    roleTitle: 'Autonomous Phone & Scheduling Agent',
    subtitle: 'Handles calls, inquiries, scheduling, and customer handoffs automatically.',
    description: 'Handles inquiries, qualifies callers, and schedules appointments.',
    status: 'active',
    metrics: {
      primaryLabel: 'Calls Handled',
      primaryValue: 67,
      secondaryLabel: 'Appointments',
      secondaryValue: 19,
      tertiaryLabel: 'Qualified Calls',
      tertiaryValue: 51,
    },
  },
  {
    id: 'sales',
    name: 'AI Sales Agent',
    roleTitle: 'Autonomous Outbound & Pipeline Specialist',
    subtitle: 'Follows up with prospects, handles objections, and moves leads toward conversion.',
    description: 'Follows up with prospects and moves leads toward conversion.',
    status: 'active',
    metrics: {
      primaryLabel: 'Leads Managed',
      primaryValue: 12,
      secondaryLabel: 'Follow-ups',
      secondaryValue: 37,
      tertiaryLabel: 'Meetings Booked',
      tertiaryValue: 6,
    },
  },
];

export const DEFAULT_CHATBOT_CONFIG: ChatbotConfig = {
  greeting: "Hi! I'm the LeadPilot AI assistant. How can I help you today?",
  servicesEnabled: [
    'Website Development & Mobile Speed',
    'Local SEO & Google Maps Visibility',
    'Instant Lead Qualification AI',
    'Automated Booking & Speed-to-Lead',
  ],
  pricingRange: '$499 - $1,499/mo (Includes 14-day free pilot)',
  businessHours: '24/7/365 Always Active',
  location: 'Austin, TX',
  leadQualificationFields: [
    'Full Name',
    'Email Address',
    'Phone Number',
    'Service Needed',
    'Budget Range',
    'Timeline',
  ],
};

export const DEFAULT_RECEPTIONIST_CONFIG: ReceptionistConfig = {
  businessHours: 'Monday-Friday, 9:00 AM - 6:00 PM CST',
  autoAnswer: true,
  collectInfo: true,
  qualifyLeads: true,
  offerBooking: true,
  transferUrgent: true,
  forwardingPhone: '+1 (512) 555-0100',
};

export const DEFAULT_SALES_METRICS: SalesAgentMetrics = {
  leadsAssigned: 12,
  followUpsSent: 37,
  responses: 18,
  meetingsBooked: 6,
  conversionRate: 24,
};

type AgentListener = (agents: SubAgentInfo[]) => void;
const listeners = new Set<AgentListener>();

export function getStoredSubAgents(): SubAgentInfo[] {
  try {
    const raw = localStorage.getItem(SUBAGENTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 3) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return DEFAULT_SUBAGENTS;
}

export function saveSubAgents(agents: SubAgentInfo[]): void {
  try {
    localStorage.setItem(SUBAGENTS_STORAGE_KEY, JSON.stringify(agents));
  } catch {
    // ignore
  }
  listeners.forEach((fn) => fn(agents));
}

export function toggleSubAgentStatus(id: SubAgentId): SubAgentStatus {
  const current = getStoredSubAgents();
  let nextStatus: SubAgentStatus = 'active';
  const updated = current.map((a) => {
    if (a.id === id) {
      nextStatus = a.status === 'active' ? 'paused' : 'active';
      return { ...a, status: nextStatus };
    }
    return a;
  });
  saveSubAgents(updated);

  const timeStr = new Date().toTimeString().split(' ')[0];
  const agentName = current.find((a) => a.id === id)?.name || id;
  addStoredAiLog({
    timestamp: timeStr,
    message:
      nextStatus === 'active'
        ? `[COORDINATION] ${agentName} activated and synchronized with Master AI Lead Agent.`
        : `[COORDINATION] ${agentName} paused by operator. Autonomous tasks halted.`,
    type: nextStatus === 'active' ? 'success' : 'analysis',
  });

  return nextStatus;
}

export function setSubAgentStatus(id: SubAgentId, status: SubAgentStatus): void {
  const current = getStoredSubAgents();
  const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
  saveSubAgents(updated);
}

export function isSubAgentActive(id: SubAgentId): boolean {
  const agent = getStoredSubAgents().find((a) => a.id === id);
  return agent?.status === 'active';
}

export function subscribeSubAgents(fn: AgentListener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/**
 * Executes a simulated chatbot lead capture and pushes to the Leads pipeline.
 */
export function registerChatbotQualifiedLead(leadData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  timeline?: string;
}): LeadItem {
  const timeStr = new Date().toTimeString().split(' ')[0];
  const newLead: LeadItem = {
    id: `lead-chat-${Date.now()}`,
    businessName: `${leadData.name} Consulting`,
    contactPerson: leadData.name,
    title: 'Owner / Prospective Client',
    email: leadData.email,
    phone: leadData.phone,
    website: 'https://inbound-lead-visitor.io',
    location: 'Austin, TX',
    industry: 'Professional Services',
    matchScore: 92,
    opportunity: 'Urgent Need',
    status: 'Qualified',
    aiAnalysis: `Visitor engaged AI Chatbot for 3m 42s. Inquired about "${leadData.service}" with timeline "${leadData.timeline || 'Immediate'}". Demonstrated high buying intent.`,
    whyGoodLead: `Direct inbound website visitor who completed full qualification and submitted direct contact credentials.`,
    potentialOpportunity: `Estimated $2,500/mo retainer opportunity for ${leadData.service}.`,
    aiRecommendation: `AI Chatbot recommended immediate follow-up via AI Sales Agent with personalized onboarding deck.`,
    createdAt: 'Just now',
    campaign: 'Website Inbound AI Chatbot',
    activityHistory: [
      {
        id: `act-${Date.now()}`,
        timestamp: 'Just now',
        action: 'Captured by AI Chatbot',
        note: `Website visitor answered 5 qualification questions. Score: 92%. Lead transferred to AI Sales Agent.`,
      },
    ],
  };

  addStoredLead(newLead);

  // Increment metrics
  const agents = getStoredSubAgents();
  const updated = agents.map((a) => {
    if (a.id === 'chatbot') {
      return {
        ...a,
        metrics: {
          ...a.metrics,
          primaryValue: Number(a.metrics.primaryValue) + 1,
          secondaryValue: Number(a.metrics.secondaryValue) + 1,
        },
      };
    }
    return a;
  });
  saveSubAgents(updated);

  addStoredAiLog({
    timestamp: timeStr,
    message: `AI Chatbot captured a new website visitor: ${leadData.name} (${leadData.service}).`,
    type: 'prospect',
  });
  addStoredAiLog({
    timestamp: timeStr,
    message: `AI Chatbot qualified prospect with 92% intent. Transferred to AI Sales Agent.`,
    type: 'score',
  });

  return newLead;
}

/**
 * Executes a simulated receptionist call booking and pushes to Appointments.
 */
export function registerReceptionistCallAppointment(data: {
  callerName: string;
  callerPhone: string;
  businessName: string;
  serviceInterest: string;
  day: string;
  time: string;
}): AppointmentItem {
  const timeStr = new Date().toTimeString().split(' ')[0];
  const newApt: AppointmentItem = {
    id: `apt-phone-${Date.now()}`,
    businessName: data.businessName,
    contactPerson: `${data.callerName} (Founder)`,
    attendee: data.callerName,
    type: 'AI Phone Consultation',
    meetingType: 'AI Phone Consultation',
    date: data.day,
    day: data.day,
    time: data.time,
    status: 'Upcoming',
    channel: 'Google Meet',
    notes: `Inbound phone inquiry answered by AI Receptionist. Caller inquired regarding ${data.serviceInterest}. Calendar slot auto-booked.`,
    meetUrl: `https://meet.google.com/rec-${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}`,
    calendarEventId: `gcal-receptionist-${Date.now()}`,
  };

  addStoredAppointment(newApt);

  // Update metrics
  const agents = getStoredSubAgents();
  const updated = agents.map((a) => {
    if (a.id === 'receptionist') {
      return {
        ...a,
        metrics: {
          ...a.metrics,
          primaryValue: Number(a.metrics.primaryValue) + 1,
          secondaryValue: Number(a.metrics.secondaryValue) + 1,
          tertiaryValue: Number(a.metrics.tertiaryValue) + 1,
        },
      };
    }
    return a;
  });
  saveSubAgents(updated);

  addStoredAiLog({
    timestamp: timeStr,
    message: `AI Receptionist answered inbound call from ${data.callerName} (${data.callerPhone}).`,
    type: 'search',
  });
  addStoredAiLog({
    timestamp: timeStr,
    message: `AI Receptionist detected appointment request for "${data.serviceInterest}".`,
    type: 'analysis',
  });
  addStoredAiLog({
    timestamp: timeStr,
    message: `Appointment scheduled successfully for ${data.day} at ${data.time} (Google Meet link generated).`,
    type: 'success',
  });

  return newApt;
}

/**
 * Executes a simulated sales agent action (Follow-up, Reply, Schedule, Mark Interested)
 */
export function executeSalesAgentAction(
  leadId: string,
  leadName: string,
  action: 'follow_up' | 'generate_reply' | 'schedule_meeting' | 'mark_interested'
): { success: boolean; message: string; newStatus?: LeadItem['status'] } {
  const timeStr = new Date().toTimeString().split(' ')[0];
  const agents = getStoredSubAgents();

  if (action === 'follow_up') {
    updateStoredLeadStatus(leadId, 'Contacted');
    const updated = agents.map((a) => {
      if (a.id === 'sales') {
        return {
          ...a,
          metrics: {
            ...a.metrics,
            secondaryValue: Number(a.metrics.secondaryValue) + 1,
          },
        };
      }
      return a;
    });
    saveSubAgents(updated);

    addStoredAiLog({
      timestamp: timeStr,
      message: `AI Sales Agent generated personalized follow-up email for ${leadName}.`,
      type: 'outreach',
    });
    return {
      success: true,
      message: `Personalized follow-up sequence #2 sent to ${leadName}.`,
      newStatus: 'Contacted',
    };
  }

  if (action === 'generate_reply') {
    addStoredAiLog({
      timestamp: timeStr,
      message: `AI Sales Agent generated instant objection-handling reply for ${leadName}: ROI breakdown and case study attached.`,
      type: 'outreach',
    });
    return {
      success: true,
      message: `AI Sales response drafted & sent with 1-page ROI forecast.`,
    };
  }

  if (action === 'mark_interested') {
    updateStoredLeadStatus(leadId, 'Responded');
    const updated = agents.map((a) => {
      if (a.id === 'sales') {
        return {
          ...a,
          metrics: {
            ...a.metrics,
            tertiaryValue: Number(a.metrics.tertiaryValue) + 1,
          },
        };
      }
      return a;
    });
    saveSubAgents(updated);

    addStoredAiLog({
      timestamp: timeStr,
      message: `Lead ${leadName} marked as "Interested". Buying intent confirmed by AI Sales Agent.`,
      type: 'score',
    });
    return {
      success: true,
      message: `Lead marked as "Interested" with 95% conversion probability.`,
      newStatus: 'Responded',
    };
  }

  if (action === 'schedule_meeting') {
    updateStoredLeadStatus(leadId, 'Appointment Booked');
    // Also create appointment
    const newApt: AppointmentItem = {
      id: `apt-sales-${Date.now()}`,
      businessName: leadName,
      contactPerson: `${leadName} Decision Maker`,
      attendee: leadName,
      type: 'Discovery Strategy Session',
      meetingType: 'Discovery Strategy Session',
      date: 'Tomorrow',
      day: 'Tomorrow',
      time: '2:30 PM',
      status: 'Upcoming',
      channel: 'Google Meet',
      leadId,
      notes: 'Scheduled by autonomous AI Sales Agent after interest confirmation.',
      meetUrl: 'https://meet.google.com/sal-opt-cfg',
      calendarEventId: `gcal-sales-${Date.now()}`,
    };
    addStoredAppointment(newApt);

    addStoredAiLog({
      timestamp: timeStr,
      message: `AI Sales Agent locked in discovery consultation with ${leadName}.`,
      type: 'success',
    });
    addStoredAiLog({
      timestamp: timeStr,
      message: `Master AI Agent updated lead status to "Appointment Booked".`,
      type: 'success',
    });

    return {
      success: true,
      message: `Strategy call scheduled with ${leadName} for Tomorrow at 2:30 PM!`,
      newStatus: 'Appointment Booked',
    };
  }

  return { success: false, message: 'Unknown action' };
}

/**
 * Returns dynamic multi-agent coordination logs for live terminal ticker
 */
export function getSimulatedCoordinationEvents(activeSubAgents: SubAgentId[]): {
  message: string;
  type: AiLogEntry['type'];
}[] {
  const events: { message: string; type: AiLogEntry['type'] }[] = [];

  if (activeSubAgents.includes('chatbot')) {
    events.push(
      {
        message: 'AI Chatbot captured a new website visitor on landing page.',
        type: 'search',
      },
      {
        message: 'AI Chatbot qualified prospect with 91% intent.',
        type: 'score',
      },
      {
        message: 'Lead transferred to AI Sales Agent for customized proposal.',
        type: 'analysis',
      }
    );
  }

  if (activeSubAgents.includes('receptionist')) {
    events.push(
      {
        message: 'AI Receptionist detected inbound call from local clinic owner.',
        type: 'search',
      },
      {
        message: 'AI Receptionist detected appointment request for speed-to-lead audit.',
        type: 'analysis',
      },
      {
        message: 'Appointment scheduled successfully via AI Receptionist.',
        type: 'success',
      }
    );
  }

  if (activeSubAgents.includes('sales')) {
    events.push(
      {
        message: 'AI Sales Agent generated personalized follow-up addressing open house traffic.',
        type: 'outreach',
      },
      {
        message: 'AI Sales Agent identified high buying intent on follow-up sequence #2.',
        type: 'score',
      },
      {
        message: 'Master AI Agent updated lead status and synced CRM pipeline.',
        type: 'success',
      }
    );
  }

  return events;
}
