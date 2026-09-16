import {
  ActivityFeedItem,
  IndustryPromptScenario,
  FeatureItem,
  UseCaseItem,
  TestimonialItem,
  PricingPlan,
  FaqItem,
} from '../types';

export const INITIAL_FEED_ITEMS: ActivityFeedItem[] = [
  {
    id: 'act-1',
    icon: 'calendar',
    title: 'Appointment booked',
    business: 'Dr. Evelyn Reed (Metro Smile Dental)',
    category: 'Dental',
    timeAgo: 'Just now',
    tag: 'Confirmed',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'act-2',
    icon: 'mail',
    title: 'Follow-up sent',
    business: 'Vanguard Realty Group',
    category: 'Real Estate',
    timeAgo: '4m ago',
    tag: 'Sequence #2',
    tagColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    id: 'act-3',
    icon: 'zap',
    title: 'Personalized message generated',
    business: 'Solstice Wellness & Day Spa',
    category: 'Beauty',
    timeAgo: '11m ago',
    tag: 'Ready',
    tagColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  },
  {
    id: 'act-4',
    icon: 'check',
    title: 'Lead qualified',
    business: 'IronPeak Athletic Club',
    category: 'Fitness',
    timeAgo: '18m ago',
    tag: 'Score: 94%',
    tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'act-5',
    icon: 'user',
    title: 'New prospect identified',
    business: 'Highland Custom Builders & Renovations',
    category: 'Home Services',
    timeAgo: '26m ago',
    tag: 'Google Maps',
    tagColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  },
];

export const INDUSTRY_SCENARIOS: IndustryPromptScenario[] = [
  {
    id: 'dentists',
    name: 'Dentists',
    icon: 'Tooth',
    query: 'Find dentists in my city who could benefit from a new website.',
    aiResponse: 'Found 128 dental clinics matching your criteria within 25 miles with low mobile page speed and missing online booking.',
    stats: {
      found: 128,
      qualified: 64,
      contacted: 37,
      responses: 14,
      appointments: 7,
    },
    sampleProspect: {
      name: 'Dr. Julian Foster — Foster Dental Care',
      location: 'Downtown Medical District',
      matchScore: 96,
      reason: 'Outdated 2017 site, no mobile patient intake, 4.8 stars with 220+ reviews.',
      generatedMessage:
        'Hi Dr. Foster, noticed your impressive patient reviews on 4th Ave! With 68% of new dental patients booking after-hours on mobile, we helped nearby clinics add 18+ new patient bookings monthly with instant mobile scheduling. Would you be open to a 5-minute preview?',
    },
  },
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: 'Building2',
    query: 'Identify active realtors in North District with listings older than 45 days.',
    aiResponse: 'Identified 94 independent agents with expired or aging luxury listings needing premium virtual staging and ad acceleration.',
    stats: {
      found: 94,
      qualified: 51,
      contacted: 29,
      responses: 12,
      appointments: 6,
    },
    sampleProspect: {
      name: 'Claire Montgomery — Premier Properties',
      location: 'Oakridge & North Suburbs',
      matchScore: 92,
      reason: '3 active luxury listings >50 days on market, active social accounts, high commission tier.',
      generatedMessage:
        'Hi Claire, saw your gorgeous property on Elm Hollow! We noticed buyers are heavily requesting immersive 3D walkthroughs for homes in that price tier. Our AI virtual showcase brought 4 offers in 14 days for a similar Oakridge property. Open to seeing the brief case study?',
    },
  },
  {
    id: 'home-services',
    name: 'Home Services',
    icon: 'Hammer',
    query: 'Find high-rated plumbers and HVAC contractors looking for commercial maintenance contracts.',
    aiResponse: 'Analyzed 156 local home service businesses and filtered 78 companies with 5+ service vans and expansion goals.',
    stats: {
      found: 156,
      qualified: 78,
      contacted: 44,
      responses: 18,
      appointments: 9,
    },
    sampleProspect: {
      name: 'Apex Mechanical & HVAC Services',
      location: 'Industrial Parkway / Metro Area',
      matchScore: 95,
      reason: '7 dispatch vehicles, hiring technicians, no automated emergency booking flow.',
      generatedMessage:
        'Hey Marcus, noticed Apex is expanding your dispatch team! When commercial AC units break down after 5 PM, most facilities managers call the first contractor with instant SMS dispatch. We set this up for local HVAC firms to capture $14k/mo in missed after-hours jobs. Quick 5-min chat?',
    },
  },
  {
    id: 'fitness',
    name: 'Gyms & Fitness',
    icon: 'Dumbbell',
    query: 'Scan boutique fitness studios with low midday class attendance.',
    aiResponse: 'Found 82 Pilates, CrossFit, and boutique studios with open slots between 10 AM – 3 PM.',
    stats: {
      found: 82,
      qualified: 42,
      contacted: 24,
      responses: 10,
      appointments: 5,
    },
    sampleProspect: {
      name: 'Kinetic Movement & Pilates',
      location: 'Westside Arts District',
      matchScore: 89,
      reason: 'Boutique studio, high average ticket, open class capacity on weekdays.',
      generatedMessage:
        'Hi Sarah, love what you built with Kinetic! We work with boutique studios to fill off-peak weekday classes by running targeted corporate wellness invite sequences. Added 32 monthly members to a nearby studio last month. Would love to share the framework!',
    },
  },
];

export const COMPARISON_POINTS = {
  withoutAi: [
    { title: 'Manual prospecting', desc: 'Hours wasted scrolling through Google Maps, Instagram, and local directories.' },
    { title: 'Endless spreadsheets', desc: 'Messy rows of unverified emails, broken numbers, and disorganized notes.' },
    { title: 'Missed follow-ups', desc: 'Hot prospects forgotten because you were busy running daily operations.' },
    { title: 'Wasted time', desc: 'Spending 15+ hours a week on repetitive outreach that yields zero replies.' },
    { title: 'Unqualified leads', desc: 'Tire-kickers and price-shoppers who waste your valuable consultation time.' },
  ],
  withAi: [
    { title: 'Automated prospecting', desc: 'AI continuously identifies ideal customers matching your exact target criteria 24/7.' },
    { title: 'AI lead qualification', desc: 'Algorithmic scoring prioritizes prospects with high intent and proven buying power.' },
    { title: 'Personalized outreach', desc: 'Dynamic, bespoke messages referencing real business details instead of generic spam.' },
    { title: 'Automated follow-ups', desc: 'Intelligent multi-touch sequences that keep prospects engaged until they respond.' },
    { title: 'More booked appointments', desc: 'Interested prospects automatically convert into confirmed calendar appointments.' },
  ],
};

export const STEPS_DATA = [
  {
    step: '01',
    name: 'Find',
    title: 'AI discovers potential customers',
    description: 'AI discovers potential customers that match your ideal customer profile across Google Maps, local directories, social channels, and web registries.',
    badge: 'Continuous Discovery',
    detail: 'Scans 15+ local data sources daily',
  },
  {
    step: '02',
    name: 'Qualify',
    title: 'AI analyzes & scores prospects',
    description: 'AI analyzes prospects and identifies the leads most likely to become customers by assessing review volume, website tech, social activity, and budget capacity.',
    badge: 'Intent Scoring',
    detail: 'Filters out 80% of low-probability leads',
  },
  {
    step: '03',
    name: 'Engage',
    title: 'AI generates personalized outreach',
    description: 'AI creates personalized outreach and follow-ups based on each prospect. No canned robot templates—bespoke human-grade communication at scale.',
    badge: 'Hyper-Personalized',
    detail: 'Dynamic multi-channel outreach',
  },
  {
    step: '04',
    name: 'Convert',
    title: 'Turn conversations into booked clients',
    description: 'Turn conversations into calls, appointments, and paying customers directly synced to your Google or Outlook calendar without friction.',
    badge: 'Direct Calendar Sync',
    detail: 'Auto-schedules confirmed bookings',
  },
];

export const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'feat-1',
    iconName: 'Search',
    title: 'AI Prospect Finder',
    description: 'Find businesses and potential customers that match your target audience with pinpoint local geo-filtering and firmographics.',
    tag: 'Lead Engine',
    statHighlight: '10x Faster Discovery',
  },
  {
    id: 'feat-2',
    iconName: 'Brain',
    title: 'AI Lead Qualification',
    description: 'Automatically identify which prospects are most valuable using 20+ predictive signals like revenue indicators, tech stack, and intent.',
    tag: 'Intelligence',
    statHighlight: '94% Accuracy Score',
  },
  {
    id: 'feat-3',
    iconName: 'PenTool',
    title: 'Personalized Outreach',
    description: 'Generate personalized messages instead of generic spam. Every prospect receives tailored copy referencing their real business accomplishments.',
    tag: 'Messaging',
    statHighlight: '3.8x Higher Reply Rate',
  },
  {
    id: 'feat-4',
    iconName: 'RefreshCw',
    title: 'Automated Follow-Ups',
    description: 'Never forget to follow up with a potential customer. Smart drip sequences pause automatically the second a prospect replies or books.',
    tag: 'Automation',
    statHighlight: 'Zero Leads Dropped',
  },
  {
    id: 'feat-5',
    iconName: 'LayoutDashboard',
    title: 'Lead Dashboard',
    description: 'Track prospects, conversations, appointments, and conversions in one sleek command center built specifically for busy owners.',
    tag: 'Visibility',
    statHighlight: 'Real-Time Pipeline',
  },
  {
    id: 'feat-6',
    iconName: 'CalendarCheck',
    title: 'Appointment Booking',
    description: 'Turn interested prospects directly into booked calls or appointments with seamless calendar integration and automated reminders.',
    tag: 'Conversions',
    statHighlight: 'Instant Auto-Booking',
  },
  {
    id: 'feat-7',
    iconName: 'Bot',
    title: 'AI Sales Assistant',
    description: 'Let AI handle repetitive sales tasks while you focus on your business. Works nights, weekends, and holidays without fatigue.',
    tag: 'Always-On',
    statHighlight: '24/7 Pipeline Velocity',
  },
  {
    id: 'feat-8',
    iconName: 'BarChart3',
    title: 'Analytics & Attribution',
    description: 'Understand where your leads are coming from and what is converting so you can scale what works with complete clarity.',
    tag: 'Insights',
    statHighlight: 'Actionable ROI Data',
  },
];

export const USE_CASES_DATA: UseCaseItem[] = [
  {
    id: 'dentists',
    category: 'Dentists',
    headline: 'Fill your chairs with high-value cases',
    description: 'Find local patients and fill your appointment calendar with cosmetic, orthodontic, and dental implant consults.',
    metric: '+34',
    metricLabel: 'New Patient Bookings / mo',
    iconName: 'Smile',
    idealFor: ['Cosmetic Dentistry', 'Family Clinics', 'Orthodontists', 'Periodontics'],
  },
  {
    id: 'real-estate',
    category: 'Real Estate',
    headline: 'Capture exclusive buyer & seller listings',
    description: 'Find potential buyers, sellers, and property clients in specific neighborhoods before your competitors even know they are moving.',
    metric: '12+',
    metricLabel: 'Exclusive Seller Inquiries / mo',
    iconName: 'Home',
    idealFor: ['Independent Realtors', 'Boutique Brokerages', 'Property Managers', 'Commercial Brokers'],
  },
  {
    id: 'salons',
    category: 'Salons & Spas',
    headline: 'Pack your appointment book year-round',
    description: 'Reach people looking for beauty, aesthetics, wellness, and salon services in your local neighborhood with zero ad spend.',
    metric: '48+',
    metricLabel: 'Spa & Salon Appointments / mo',
    iconName: 'Sparkles',
    idealFor: ['Hair Salons', 'Med Spas', 'Estheticians', 'Massage Studios'],
  },
  {
    id: 'gyms',
    category: 'Gyms & Fitness',
    headline: 'Fill trial memberships and personal training',
    description: 'Generate memberships, group training trial passes, and private coaching leads from health-conscious local professionals.',
    metric: '65+',
    metricLabel: 'New Member Intakes / mo',
    iconName: 'Activity',
    idealFor: ['CrossFit Boxes', 'Pilates & Yoga Studios', 'MMA Academies', 'Personal Trainers'],
  },
  {
    id: 'home-services',
    category: 'Home Services',
    headline: 'High-ticket residential and commercial bids',
    description: 'Find homeowners who need repairs, renovations, and maintenance, plus commercial property managers seeking trusted contractors.',
    metric: '$42k',
    metricLabel: 'Average Monthly Pipeline Added',
    iconName: 'Wrench',
    idealFor: ['Remodelers & Builders', 'Plumbers & HVAC', 'Roofing Pros', 'Electricians'],
  },
  {
    id: 'restaurants',
    category: 'Restaurants',
    headline: 'Corporate catering and private group events',
    description: 'Generate catering, corporate lunches, holiday parties, and large group booking opportunities with local corporate offices.',
    metric: '8-14',
    metricLabel: 'Private Events & Banquets / mo',
    iconName: 'UtensilsCrossed',
    idealFor: ['Fine Dining', 'Catering Companies', 'Brewpubs', 'Event Venues'],
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    quote:
      'LeadPilot completely changed how we find new clients. We used to spend hours prospecting every week. Now the AI handles most of the repetitive work, and our chairs are booked out 4 weeks in advance.',
    author: 'Dr. Sarah Jenkins',
    role: 'Founder & Lead Dentist',
    business: 'Jenkins Family Dental Care',
    location: 'Denver, CO',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-9a25ab817342?w=150&auto=format&fit=crop&q=80',
    metric: '+31 New Patients / Mo',
    rating: 5,
  },
  {
    id: 'test-2',
    quote:
      'The automated follow-ups alone doubled our seller inquiries. As a busy broker, I don’t have time to manage spreadsheets. LeadPilot speaks with our prospects so naturally that people think I hired an assistant.',
    author: 'Marcus Vance',
    role: 'Managing Broker',
    business: 'Vance & Co. Luxury Properties',
    location: 'Scottsdale, AZ',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    metric: '14 Signed Listings',
    rating: 5,
  },
  {
    id: 'test-3',
    quote:
      'We added over $65,000 in bathroom remodel contracts in just 60 days. The AI qualifies the homeowner’s budget upfront so we only drive out for estimates with serious, ready-to-buy clients.',
    author: 'David Kowalski',
    role: 'Co-Owner',
    business: 'Summit Home Renovations',
    location: 'Columbus, OH',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    metric: '+$65k Closed Revenue',
    rating: 5,
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'For businesses getting started.',
    features: [
      '100 AI leads/month',
      'AI lead qualification',
      'Basic outreach',
      'Lead dashboard',
      'Email support',
      'Google Maps discovery',
      'Export to CSV',
    ],
    ctaText: 'Start Free',
    isPopular: false,
  },
  {
    id: 'growth',
    name: 'GROWTH',
    monthlyPrice: 149,
    annualPrice: 119,
    description: 'For businesses ready to scale.',
    badge: 'MOST POPULAR',
    isPopular: true,
    features: [
      '500 AI leads/month',
      'AI qualification',
      'Personalized outreach',
      'Automated follow-ups',
      'Appointment booking',
      'Analytics',
      'Priority support',
      'Custom tone & agent instructions',
      'Direct calendar two-way sync',
    ],
    ctaText: 'Start Growing',
    highlightClass: 'border-blue-500/50 shadow-blue-500/10',
  },
  {
    id: 'agency',
    name: 'AGENCY',
    monthlyPrice: 399,
    annualPrice: 319,
    description: 'For agencies managing multiple businesses.',
    badge: 'UNLIMITED POWER',
    features: [
      '2,000 AI leads/month',
      'Multiple client accounts',
      'Advanced analytics',
      'Custom AI agents',
      'White-label dashboard',
      'Priority support',
      'Dedicated account strategist',
      'Webhook & CRM API access',
    ],
    ctaText: 'Talk to Sales',
    isPopular: false,
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What exactly does the AI agent do?',
    answer:
      'LeadPilot AI acts as your dedicated digital sales employee. It autonomously searches public local directories, Google Maps, web listings, and social signals for potential customers in your area. It verifies their contact details, assesses their likelihood to buy (lead qualification), drafts tailored personalized outreach, sends friendly follow-ups, and guides them directly to your calendar to book an appointment.',
  },
  {
    id: 'faq-2',
    question: 'Does it work for my type of business?',
    answer:
      'Yes! LeadPilot AI was specifically engineered for local service-based businesses, including dental clinics, salons, gyms, real estate brokerages, home contractors, plumbers, electricians, auto repair, restaurants, accounting, legal firms, and local consultants.',
  },
  {
    id: 'faq-3',
    question: 'Where does the AI find leads?',
    answer:
      'Our AI scans legitimate, publicly accessible local sources including Google Maps & Business Profiles, local Chamber of Commerce registries, social platforms, verified local business databases, permit filings, and web directories. Every prospect is deduplicated and compliance-checked.',
  },
  {
    id: 'faq-4',
    question: 'Can I customize my ideal customer?',
    answer:
      'Absolutely. You can set specific parameters such as geographic radius (e.g., within 15 miles), industry sub-niches, review counts, company size, estimated budget, or specific pain points (e.g., businesses with outdated websites or lacking online booking).',
  },
  {
    id: 'faq-5',
    question: 'Can I approve messages before they’re sent?',
    answer:
      'Yes! You have full control. You can run LeadPilot in "Review First" mode where every personalized message requires your one-click approval, or switch to "Autopilot" mode once you are satisfied with the agent’s style and accuracy.',
  },
  {
    id: 'faq-6',
    question: 'Does it automatically follow up?',
    answer:
      'Yes. Over 70% of conversions occur on the 2nd or 3rd touchpoint. LeadPilot automatically schedules thoughtful, natural follow-ups spaced several days apart. The moment a prospect replies or books, all automated follow-ups halt immediately.',
  },
  {
    id: 'faq-7',
    question: 'Can it book appointments?',
    answer:
      'Yes. LeadPilot integrates directly with Google Calendar, Outlook, Calendly, and Acuity. When a prospect expresses interest, the AI shares your real-time availability and confirms the booking with calendar invitations and SMS/email reminders.',
  },
  {
    id: 'faq-8',
    question: 'How quickly can I get started?',
    answer:
      'Most local business owners are up and running in under 5 minutes. You just enter your business type, target location, and preferred calendar link. The AI agent begins discovering and qualifying prospects right away.',
  },
  {
    id: 'faq-9',
    question: 'Is my data secure?',
    answer:
      'Yes, security and privacy are paramount. We use enterprise-grade 256-bit AES encryption at rest and TLS 1.3 in transit. We never sell your business or lead data, and your prospect lists remain strictly private to your account.',
  },
];

export const WEEKLY_CHART_DATA = [
  { week: 'W1', leads: 42, qualified: 14, appointments: 4, revenue: 1800 },
  { week: 'W2', leads: 68, qualified: 26, appointments: 8, revenue: 3400 },
  { week: 'W3', leads: 95, qualified: 38, appointments: 13, revenue: 5200 },
  { week: 'W4', leads: 130, qualified: 52, appointments: 18, revenue: 7400 },
  { week: 'W5', leads: 168, qualified: 63, appointments: 22, revenue: 8900 },
  { week: 'W6', leads: 202, qualified: 74, appointments: 26, revenue: 10400 },
  { week: 'W7', leads: 228, qualified: 81, appointments: 29, revenue: 11600 },
  { week: 'W8', leads: 247, qualified: 86, appointments: 31, revenue: 12450 },
];
