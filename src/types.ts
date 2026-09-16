export interface ActivityFeedItem {
  id: string;
  icon: 'check' | 'user' | 'mail' | 'calendar' | 'zap';
  title: string;
  business: string;
  category: string;
  timeAgo: string;
  tag: string;
  tagColor: string;
}

export interface MetricCardData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export interface IndustryPromptScenario {
  id: string;
  name: string;
  icon: string;
  query: string;
  aiResponse: string;
  stats: {
    found: number;
    qualified: number;
    contacted: number;
    responses: number;
    appointments: number;
  };
  sampleProspect: {
    name: string;
    location: string;
    matchScore: number;
    reason: string;
    generatedMessage: string;
  };
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  tag: string;
  statHighlight?: string;
}

export interface UseCaseItem {
  id: string;
  category: string;
  headline: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
  idealFor: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  business: string;
  location: string;
  avatarUrl: string;
  metric: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  highlightClass?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  industry?: string;
  location?: string;
  searchRadius?: string;
  targetCustomer?: string;
  targetLeadCount?: string;
  hasCompletedOnboarding: boolean;
  createdAt: string;
  avatarUrl?: string;
}

export interface TestDriveScanData {
  industry: string;
  city: string;
  businessName?: string;
  prospectsFound: number;
  qualifiedLeads: number;
  scannedAt: string;
}

export interface LeadActivity {
  id: string;
  timestamp: string;
  action: string;
  note: string;
}

export interface LeadItem {
  id: string;
  businessName: string;
  contactPerson: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  industry: string;
  matchScore: number;
  opportunity: 'High Budget' | 'Urgent Need' | 'High Intent' | 'Growth Phase';
  status: 'New' | 'Contacted' | 'Responded' | 'Appointment Booked' | 'Qualified' | 'Closed';
  aiAnalysis: string;
  whyGoodLead: string;
  potentialOpportunity: string;
  aiRecommendation: string;
  activityHistory: LeadActivity[];
  campaign?: string;
  createdAt: string;
}

export interface CampaignItem {
  id: string;
  name: string;
  targetMarket: string;
  status: 'Active' | 'Paused' | 'Completed';
  leadsCount: number;
  contactedCount: number;
  responsesCount: number;
  appointmentsCount: number;
  createdAt: string;
}

export interface AppointmentItem {
  id: string;
  businessName: string;
  contactPerson: string;
  attendee?: string;
  type: string;
  meetingType?: string;
  date: string;
  day?: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  channel: 'Google Meet' | 'Phone Call' | 'In-Person';
  leadId?: string;
  notes?: string;
  meetUrl?: string;
  calendarEventId?: string;
}

export interface AiLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'search' | 'prospect' | 'analysis' | 'score' | 'outreach' | 'success';
}

