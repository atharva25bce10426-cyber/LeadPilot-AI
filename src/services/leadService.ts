import { LeadItem, CampaignItem, AppointmentItem, AiLogEntry } from '../types';

export const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    businessName: 'Premier Real Estate Group',
    contactPerson: 'David Vance',
    title: 'Managing Principal',
    email: 'dvance@premierrealtyaustin.com',
    phone: '(512) 555-0182',
    website: 'https://premierrealtyaustin.com',
    location: 'Austin, TX (Downtown)',
    industry: 'Real Estate',
    matchScore: 97,
    opportunity: 'High Budget',
    status: 'New',
    aiAnalysis:
      'High-producing brokerage with 18 active luxury listings. Website is on WordPress with 6.2s load time on mobile devices and no interactive lead capture forms or automated WhatsApp/SMS booking.',
    whyGoodLead:
      'Strong monthly advertising budget on Meta & Google Ads, but losing 60%+ of mobile ad visitors due to missing instant consultation scheduling.',
    potentialOpportunity: 'Estimated $4,500/mo in recovered seller leads by deploying instant AI property qualification.',
    aiRecommendation:
      'This prospect appears to have a strong opportunity because their website lacks an online appointment booking system and mobile lead response takes >4 hours.',
    createdAt: '12 mins ago',
    campaign: 'Austin Real Estate Outreach',
    activityHistory: [
      {
        id: 'h-1',
        timestamp: '12 mins ago',
        action: 'Prospect Discovered',
        note: 'AI Agent identified via Austin Commercial Registry & Google Maps API with 97% relevance score.',
      },
      {
        id: 'h-2',
        timestamp: '10 mins ago',
        action: 'Tech Stack Analyzed',
        note: 'WordPress 5.8, slow mobile caching, missing CRM calendar webhook.',
      },
      {
        id: 'h-3',
        timestamp: '6 mins ago',
        action: 'Icebreaker Drafted',
        note: 'Customized luxury listings prompt generated with local comps hook.',
      },
    ],
  },
  {
    id: 'lead-2',
    businessName: 'Capital Real Estate Hub',
    contactPerson: 'Elena Rostova',
    title: 'Team Lead & Broker',
    email: 'elena@capitalrehub.io',
    phone: '(512) 555-0924',
    website: 'https://capitalrehub.io',
    location: 'Austin, TX (Domain / North)',
    industry: 'Real Estate',
    matchScore: 94,
    opportunity: 'Urgent Need',
    status: 'Contacted',
    aiAnalysis:
      'Recently expanded from 6 to 14 agents. Currently relying on manual spreadsheet follow-ups. Outbound response delay is causing high lead drop-off on weekend open house inquiries.',
    whyGoodLead:
      'Rapid team growth without an automated qualification agent. Actively hiring lead coordinators on LinkedIn.',
    potentialOpportunity: '$3,800/mo automated speed-to-lead workflow + auto calendar distribution.',
    aiRecommendation:
      'Recommend highlighting speed-to-lead automation: engaging weekend open house visitors within 45 seconds increases qualification by 391%.',
    createdAt: '1 hour ago',
    campaign: 'Austin Real Estate Outreach',
    activityHistory: [
      {
        id: 'h-4',
        timestamp: '1 hour ago',
        action: 'Discovered',
        note: 'Google Business profile with 140 reviews, missing chat automation.',
      },
      {
        id: 'h-5',
        timestamp: '45 mins ago',
        action: 'First Touch Sent',
        note: 'Email sent via AI Agent: "Quick question on your Domain luxury inquiries".',
      },
    ],
  },
  {
    id: 'lead-3',
    businessName: 'Metro Real Estate Specialists',
    contactPerson: 'Marcus Thorne',
    title: 'Founder & Senior Broker',
    email: 'm.thorne@metroaustinspecialists.com',
    phone: '(512) 555-0341',
    website: 'https://metroaustinspecialists.com',
    location: 'Austin, TX (South Congress)',
    industry: 'Real Estate',
    matchScore: 91,
    opportunity: 'High Intent',
    status: 'Responded',
    aiAnalysis:
      'Marcus clicked and responded to sequence #1 asking for an audit of his current buyer intake funnel. Looking for an AI solution to qualify out-of-state relocations.',
    whyGoodLead:
      'Warm prospect who responded within 20 minutes of initial AI outreach. Needs turnkey solution before Q4 buyer surge.',
    potentialOpportunity: '$5,200 initial setup + $1,200/mo ongoing AI qualification concierge.',
    aiRecommendation:
      'Prospect is asking about out-of-state buyer filters. Send the relocation qualification playbook and suggest a 15-minute screen share.',
    createdAt: '3 hours ago',
    campaign: 'Austin Real Estate Outreach',
    activityHistory: [
      {
        id: 'h-6',
        timestamp: '3 hours ago',
        action: 'Lead Contacted',
        note: 'Autonomous email sent referencing Austin relocation trends.',
      },
      {
        id: 'h-7',
        timestamp: '40 mins ago',
        action: 'Prospect Responded',
        note: '"Hey! We get 50+ California relocations a month. Can your agent qualify their timelines automatically?"',
      },
    ],
  },
  {
    id: 'lead-4',
    businessName: 'Austin Smile Dental Arts',
    contactPerson: 'Dr. Sarah Jenkins',
    title: 'Owner & Lead Clinician',
    email: 'sarah@austinsmiles.com',
    phone: '(512) 555-4411',
    website: 'https://austinsmilesdental.com',
    location: 'Austin, TX (Zilker)',
    industry: 'Dental Clinics',
    matchScore: 96,
    opportunity: 'High Budget',
    status: 'Appointment Booked',
    aiAnalysis:
      'Premier cosmetic dentistry practice. High average patient value ($3,500+ for Invisalign & veneers). Front desk is overwhelmed by phone calls during peak clinic hours.',
    whyGoodLead:
      'Huge cosmetic treatment demand. Missing after-hours conversational booking agent on Google Maps.',
    potentialOpportunity: '$6,000/mo recovered in after-hours patient bookings.',
    aiRecommendation:
      'Demonstrate how after-hours AI conversational SMS captured 9 cosmetic consults in first week for comparable Zilker practices.',
    createdAt: '5 hours ago',
    campaign: 'Website Upgrade Campaign',
    activityHistory: [
      {
        id: 'h-8',
        timestamp: '5 hours ago',
        action: 'Qualified Lead',
        note: 'High cosmetic treatment volume verified via patient review sentiment.',
      },
      {
        id: 'h-9',
        timestamp: '2 hours ago',
        action: 'Call Booked',
        note: 'Discovery call scheduled for 10:30 AM via LeadPilot calendar sync.',
      },
    ],
  },
  {
    id: 'lead-5',
    businessName: 'Apex Health & Wellness MedSpa',
    contactPerson: 'Chloe Martinez',
    title: 'Clinic Director',
    email: 'chloe@apexmedspatx.com',
    phone: '(512) 555-8833',
    website: 'https://apexmedspatx.com',
    location: 'Austin, TX (Westlake)',
    industry: 'Salon & Beauty',
    matchScore: 89,
    opportunity: 'Growth Phase',
    status: 'New',
    aiAnalysis:
      'Running aggressive Instagram and TikTok video ads but sending all traffic to a standard Contact Us static form with a 12% abandonment rate.',
    whyGoodLead:
      'High ad spend with low conversion efficiency. Perfect candidate for instant qualification & calendar booking.',
    potentialOpportunity: '$3,200/mo pipeline improvement.',
    aiRecommendation:
      'Offer a 60-second video demo of instant AI DM response to their Instagram ads.',
    createdAt: 'Yesterday',
    campaign: 'Website Upgrade Campaign',
    activityHistory: [
      {
        id: 'h-10',
        timestamp: 'Yesterday',
        action: 'Identified',
        note: 'Ad library scan detected 6 active Meta ad campaigns.',
      },
    ],
  },
  {
    id: 'lead-6',
    businessName: 'Hill Country Custom Remodeling',
    contactPerson: 'Travis Miller',
    title: 'General Contractor',
    email: 'travis@hillcountryremodel.com',
    phone: '(512) 555-7729',
    website: 'https://hillcountryremodel.com',
    location: 'Austin, TX (Lakeway)',
    industry: 'Home Services',
    matchScore: 93,
    opportunity: 'High Budget',
    status: 'Contacted',
    aiAnalysis:
      'Specializes in $80k+ kitchen and bathroom remodels. Estimates are currently scheduled via phone callbacks that often take 2–3 days.',
    whyGoodLead:
      'Huge job sizes. Every missed call from an affluent homeowner is a potential $50k loss.',
    potentialOpportunity: '$8,000+ per month in closed kitchen renovation projects.',
    aiRecommendation:
      'Position the AI agent as a 24/7 project scope estimator that gathers square footage and budget before scheduling an on-site visit.',
    createdAt: 'Yesterday',
    campaign: 'Austin Real Estate Outreach',
    activityHistory: [
      {
        id: 'h-11',
        timestamp: 'Yesterday',
        action: 'AI Outreach Dispatched',
        note: 'Subject: "Speed-to-lead for Lakeway luxury remodels".',
      },
    ],
  },
];

export const INITIAL_CAMPAIGNS: CampaignItem[] = [
  {
    id: 'camp-1',
    name: 'Austin Real Estate Outreach',
    targetMarket: 'Austin, TX • 25 miles',
    status: 'Active',
    leadsCount: 127,
    contactedCount: 64,
    responsesCount: 18,
    appointmentsCount: 7,
    createdAt: '2 days ago',
  },
  {
    id: 'camp-2',
    name: 'Website Upgrade Campaign',
    targetMarket: 'Greater Austin Metro',
    status: 'Active',
    leadsCount: 84,
    contactedCount: 41,
    responsesCount: 9,
    appointmentsCount: 4,
    createdAt: '4 days ago',
  },
  {
    id: 'camp-3',
    name: 'Cosmetic & Aesthetic Clinics Blitz',
    targetMarket: 'Austin & Westlake Area',
    status: 'Paused',
    leadsCount: 52,
    contactedCount: 30,
    responsesCount: 6,
    appointmentsCount: 2,
    createdAt: '1 week ago',
  },
];

export const INITIAL_APPOINTMENTS: AppointmentItem[] = [
  {
    id: 'apt-1',
    businessName: 'Premier Real Estate Group',
    contactPerson: 'David Vance (Managing Principal)',
    attendee: 'David Vance',
    type: 'Discovery Call',
    meetingType: 'Discovery Call',
    date: 'Today',
    day: 'Today',
    time: '10:30 AM',
    status: 'Upcoming',
    channel: 'Google Meet',
    leadId: 'lead-1',
    notes: 'Review mobile lead qualification setup and WordPress speed optimization.',
    meetUrl: 'https://meet.google.com/qam-vdkt-zxy',
    calendarEventId: 'gcal-evt-prg-1030',
  },
  {
    id: 'apt-2',
    businessName: 'Capital Real Estate Hub',
    contactPerson: 'Elena Rostova (Team Lead)',
    attendee: 'Elena Rostova',
    type: 'Website Consultation',
    meetingType: 'Website Consultation',
    date: 'Today',
    day: 'Today',
    time: '2:00 PM',
    status: 'Upcoming',
    channel: 'Google Meet',
    leadId: 'lead-2',
    notes: 'Discuss speed-to-lead automation for weekend open house traffic.',
    meetUrl: 'https://meet.google.com/whu-yvnc-pbr',
    calendarEventId: 'gcal-evt-creh-1400',
  },
  {
    id: 'apt-3',
    businessName: 'Austin Smile Dental Arts',
    contactPerson: 'Dr. Sarah Jenkins',
    attendee: 'Dr. Sarah Jenkins',
    type: 'Strategy & Demo Session',
    meetingType: 'Strategy & Demo Session',
    date: 'Tomorrow',
    day: 'Tomorrow',
    time: '11:15 AM',
    status: 'Upcoming',
    channel: 'Google Meet',
    leadId: 'lead-4',
    notes: 'Demonstrate after-hours patient booking SMS agent.',
    meetUrl: 'https://meet.google.com/rkt-mjws-fnb',
    calendarEventId: 'gcal-evt-asda-1115',
  },
  {
    id: 'apt-4',
    businessName: 'Hill Country Custom Remodeling',
    contactPerson: 'Travis Miller',
    attendee: 'Travis Miller',
    type: 'Phone Consultation',
    meetingType: 'Phone Consultation',
    date: 'Friday',
    day: 'Friday',
    time: '3:30 PM',
    status: 'Upcoming',
    channel: 'Phone Call',
    leadId: 'lead-6',
    notes: 'Automated project scope qualification review.',
    meetUrl: 'https://meet.google.com/zop-bdfg-kpq',
    calendarEventId: 'gcal-evt-hccr-1530',
  },
  {
    id: 'apt-5',
    businessName: 'Lonestar Spine & Ortho',
    contactPerson: 'Dr. Ronald Chen',
    attendee: 'Dr. Ronald Chen',
    type: 'Discovery Call',
    meetingType: 'Discovery Call',
    date: 'Oct 12, 2026',
    day: 'Oct 12, 2026',
    time: '9:00 AM',
    status: 'Completed',
    channel: 'Google Meet',
    notes: 'Closed pilot program contract ($149/mo plan).',
    meetUrl: 'https://meet.google.com/vbc-nxth-yrw',
    calendarEventId: 'gcal-evt-lsso-0900',
  },
];

export const INITIAL_AI_LOGS: AiLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '10:14:02',
    message: 'Searching local market registry for high-intent business profiles in Austin, TX...',
    type: 'search',
  },
  {
    id: 'log-2',
    timestamp: '10:14:08',
    message: 'Found new prospect: "Premier Real Estate Group" (Downtown Austin).',
    type: 'prospect',
  },
  {
    id: 'log-3',
    timestamp: '10:14:14',
    message: 'Analyzing website speed & mobile conversion triggers (WordPress 5.8, 6.2s latency)...',
    type: 'analysis',
  },
  {
    id: 'log-4',
    timestamp: '10:14:18',
    message: 'Lead score calculated: 97% Match (High Budget, missing booking automation).',
    type: 'score',
  },
  {
    id: 'log-5',
    timestamp: '10:14:22',
    message: 'Prospect added to qualified leads queue.',
    type: 'success',
  },
  {
    id: 'log-6',
    timestamp: '10:14:27',
    message: 'Personalized icebreaker generated targeting David Vance (Managing Principal).',
    type: 'outreach',
  },
  {
    id: 'log-7',
    timestamp: '10:15:02',
    message: 'AI Agent dispatched gentle follow-up sequence #2 to Elena Rostova (Capital Real Estate Hub).',
    type: 'outreach',
  },
  {
    id: 'log-8',
    timestamp: '10:15:45',
    message: 'Incoming response detected from Marcus Thorne: "Can your agent qualify timelines automatically?"',
    type: 'success',
  },
  {
    id: 'log-9',
    timestamp: '10:16:12',
    message: 'Scanning Yelp and Google Maps API for new cosmetic clinics within 25 miles...',
    type: 'search',
  },
  {
    id: 'log-10',
    timestamp: '10:16:30',
    message: 'Lead qualification threshold met for 64 total local targets.',
    type: 'score',
  },
];

// In-memory + LocalStorage reactive state for dynamic updates
const LEADS_STORAGE_KEY = 'leadpilot_leads_data_v1';
const APPOINTMENTS_STORAGE_KEY = 'leadpilot_appointments_data_v1';
const LOGS_STORAGE_KEY = 'leadpilot_ai_logs_data_v1';

type Listener<T> = (data: T) => void;
const leadListeners = new Set<Listener<LeadItem[]>>();
const appointmentListeners = new Set<Listener<AppointmentItem[]>>();
const logListeners = new Set<Listener<AiLogEntry[]>>();

export function getStoredLeads(): LeadItem[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_LEADS;
}

export function addStoredLead(newLead: LeadItem): LeadItem[] {
  const current = getStoredLeads();
  const updated = [newLead, ...current.filter((l) => l.id !== newLead.id)];
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  leadListeners.forEach((fn) => fn(updated));
  return updated;
}

export function updateStoredLeadStatus(leadId: string, status: LeadItem['status']): LeadItem[] {
  const current = getStoredLeads();
  const updated = current.map((l) => {
    if (l.id === leadId) {
      return {
        ...l,
        status,
        activityHistory: [
          {
            id: `act-${Date.now()}`,
            timestamp: 'Just now',
            action: `Status updated to ${status}`,
            note: `Updated autonomously by AI Sales Agent pipeline action.`,
          },
          ...l.activityHistory,
        ],
      };
    }
    return l;
  });
  try {
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  leadListeners.forEach((fn) => fn(updated));
  return updated;
}

export function subscribeLeads(fn: Listener<LeadItem[]>): () => void {
  leadListeners.add(fn);
  return () => {
    leadListeners.delete(fn);
  };
}

export function getStoredAppointments(): AppointmentItem[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_APPOINTMENTS;
}

export function addStoredAppointment(newApt: AppointmentItem): AppointmentItem[] {
  const current = getStoredAppointments();
  const updated = [newApt, ...current.filter((a) => a.id !== newApt.id)];
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  appointmentListeners.forEach((fn) => fn(updated));
  return updated;
}

export function subscribeAppointments(fn: Listener<AppointmentItem[]>): () => void {
  appointmentListeners.add(fn);
  return () => {
    appointmentListeners.delete(fn);
  };
}

export function getStoredAiLogs(): AiLogEntry[] {
  try {
    const raw = localStorage.getItem(LOGS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return INITIAL_AI_LOGS;
}

export function addStoredAiLog(entry: Omit<AiLogEntry, 'id'> & { id?: string }): AiLogEntry[] {
  const current = getStoredAiLogs();
  const newEntry: AiLogEntry = {
    id: entry.id || `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: entry.timestamp,
    message: entry.message,
    type: entry.type,
  };
  const updated = [...current.slice(-50), newEntry];
  try {
    localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  logListeners.forEach((fn) => fn(updated));
  return updated;
}

export function subscribeAiLogs(fn: Listener<AiLogEntry[]>): () => void {
  logListeners.add(fn);
  return () => {
    logListeners.delete(fn);
  };
}
