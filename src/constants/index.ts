import type { Feature, Tool, Industry, PricingTier, Testimonial, PainPoint, ProcessStep, Personality } from "@/types";

export const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Personalities", href: "/personalities" },
  { label: "Solutions", href: "/solutions" },
  { label: "Agent Builder", href: "/agent-builder" },
  { label: "Pricing", href: "/pricing" },
];

export const FEATURES: Feature[] = [
  {
    id: "ai-receptionist",
    title: "AI Receptionist",
    description: "Answers every missed customer call — 24/7, in your voice, with your rules.",
    icon: "Phone",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "omnichannel-inbox",
    title: "Omnichannel Inbox",
    description: "Voice, SMS, email, chat, WhatsApp, LINE — one shared inbox for your whole team.",
    icon: "Inbox",
  },
  {
    id: "long-term-memory",
    title: "Long-Term Memory",
    description: "Recognizes returning customers and picks up where the last conversation left off.",
    icon: "Brain",
    badge: "Unique",
    highlighted: true,
  },
  {
    id: "outbound-calling",
    title: "Outbound Calling",
    description: "Reach 500 customers today. Schedule callbacks, reminders, and campaigns — no sales team required.",
    icon: "PhoneOutgoing",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Resolution rate, CSAT, drop-off analysis. Know exactly where customer conversations break down.",
    icon: "BarChart3",
    badge: "Unique",
  },
  {
    id: "ai-agent-builder",
    title: "AI Agent Builder",
    description: "Describe your business in plain language. Get a trained AI agent in minutes — no code required.",
    icon: "Bot",
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description: "Upload your docs, sync your website. Your AI always gives accurate, up-to-date answers.",
    icon: "BookOpen",
  },
  {
    id: "contact-management",
    title: "Contact Management",
    description: "A CRM that fills itself in. Every caller's history, notes, and follow-ups — automatically.",
    icon: "Users",
  },
  {
    id: "call-translation",
    title: "Live Translation",
    description: "Speak to any customer in their language. 70+ languages, real-time.",
    icon: "Languages",
  },
  {
    id: "voicemail-transcription",
    title: "Voicemail Transcription",
    description: "Voicemails become readable summaries with action items — no more listening to recordings.",
    icon: "FileText",
  },
  {
    id: "integrations",
    title: "One-Click Integrations",
    description: "Shopify, HubSpot, Zendesk, Google Calendar, WhatsApp and more — connected in seconds.",
    icon: "Plug",
  },
  {
    id: "business-number",
    title: "Business Number App",
    description: "A separate line for customer calls on your personal phone. No new hardware.",
    icon: "Smartphone",
  },
  {
    id: "customer-conversations",
    title: "Customer Conversations",
    description: "Every call, text, and note in one timeline. Assign owners, track status, close loops.",
    icon: "MessageSquare",
  },
  {
    id: "phone-answering",
    title: "AI Phone Answering",
    description: "24/7 phone coverage that sounds human, follows your scripts, and escalates when needed.",
    icon: "PhoneCall",
  },
];

export const PAIN_POINTS: PainPoint[] = [
  {
    label: "01",
    pain: "Your AI confidently gave a customer the wrong price.",
    solution: "Knowledge Base keeps your AI's answers synced to your actual docs — always current, never guessing.",
  },
  {
    label: "02",
    pain: "Updating the bot is a project, not a task.",
    solution: "Agent Builder lets anyone update scripts, rules, and responses in plain language. Changes go live in seconds.",
  },
  {
    label: "03",
    pain: "Thousands of dollars of knowledge locked in documents nobody reads.",
    solution: "Upload PDFs, sync your site. Your AI reads it all so your customers get answers instantly.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Open a second number",
    description: "Get a dedicated business line for your team — on mobile or desktop.",
    icon: "Phone",
  },
  {
    number: "02",
    title: "Set AI answering rules",
    description: "Define when AI answers, how it greets callers, and when to escalate to a human.",
    icon: "Settings",
  },
  {
    number: "03",
    title: "Capture every call",
    description: "AI answers, transcribes, and summarizes every conversation — even at 2 AM.",
    icon: "Mic",
  },
  {
    number: "04",
    title: "Follow up with context",
    description: "Your team sees the full history. One click to reply, assign, or close.",
    icon: "CheckCircle",
  },
];

export const TOOLS: Tool[] = [
  {
    id: "voicemail-generator",
    title: "AI Voicemail Greeting Generator",
    description: "Generate a professional voicemail script, pick a voice, add background music, and export as MP3/WAV.",
    icon: "Mic2",
    category: "Voice",
    href: "/tools/voicemail-greeting-generator",
  },
  {
    id: "call-summarizer",
    title: "AI Call Summarizer",
    description: "Paste a call transcript and get a clean summary with action items in seconds.",
    icon: "FileText",
    category: "Productivity",
    href: "/tools/call-summarizer",
  },
  {
    id: "appointment-setter",
    title: "AI Appointment Setter",
    description: "Build an AI script for scheduling appointments — ready to paste into your agent.",
    icon: "Calendar",
    category: "Scheduling",
    href: "/tools/appointment-setter",
  },
  {
    id: "lead-qualification",
    title: "AI Lead Qualification",
    description: "Generate qualification questions and scoring criteria for your industry.",
    icon: "Target",
    category: "Sales",
    href: "/tools/lead-qualification",
  },
  {
    id: "faq-generator",
    title: "AI FAQ Generator",
    description: "Turn your product page or service description into a complete FAQ section.",
    icon: "HelpCircle",
    category: "Content",
    href: "/tools/faq-generator",
  },
  {
    id: "invoice-generator",
    title: "AI Invoice Generator",
    description: "Create professional invoices with itemized services in seconds.",
    icon: "Receipt",
    category: "Finance",
    href: "/tools/invoice-generator",
  },
  {
    id: "knowledge-chatbot",
    title: "Knowledge Base Chatbot",
    description: "Turn any URL or document into a Q&A chatbot you can embed anywhere.",
    icon: "Bot",
    category: "AI",
    href: "/tools/knowledge-chatbot",
  },
  {
    id: "missed-call-text",
    title: "Missed Call Text Back",
    description: "Auto-generate the perfect SMS to send whenever you miss a customer call.",
    icon: "MessageSquare",
    category: "Voice",
    href: "/tools/missed-call-text-back",
  },
  {
    id: "post-service-followup",
    title: "Post-Service Follow-Up",
    description: "Generate follow-up message sequences for after appointments, deliveries, or jobs.",
    icon: "Send",
    category: "Productivity",
    href: "/tools/post-service-followup",
  },
  {
    id: "multilingual-receptionist",
    title: "AI Multilingual Receptionist",
    description: "Build a greeting script in any of 70+ supported languages instantly.",
    icon: "Languages",
    category: "Voice",
    href: "/tools/multilingual-receptionist",
  },
  {
    id: "translator",
    title: "AI Translator Assistant",
    description: "Translate customer-facing copy, SMS, and scripts into any language.",
    icon: "Globe",
    category: "Language",
    href: "/tools/translator",
  },
  {
    id: "website-summarizer",
    title: "AI Website Summarizer",
    description: "Drop in a URL and get a concise, structured summary ready for your knowledge base.",
    icon: "Link",
    category: "Content",
    href: "/tools/website-summarizer",
  },
  {
    id: "automated-scheduler",
    title: "Automated Scheduler",
    description: "Build a full scheduling flow with calendar rules and confirmation messages.",
    icon: "ClockIcon",
    category: "Scheduling",
    href: "/tools/automated-scheduler",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: "dental",
    name: "Dental Practices",
    tagline: "Never interrupt a patient to answer the phone.",
    description: "AI handles appointment calls, insurance queries, and cancellations while your team focuses on chair-side care.",
    icon: "Stethoscope",
    image: "https://images.unsplash.com/photo-1588776814546-1ffbb403b41b?w=600&h=400&fit=crop",
  },
  {
    id: "hvac",
    name: "HVAC Companies",
    tagline: "Every service call captured — even on the busiest days.",
    description: "Route emergency calls, schedule estimates, and follow up on quotes without lifting a finger.",
    icon: "Thermometer",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop",
  },
  {
    id: "law-firm",
    name: "Law Firms",
    tagline: "Your clients deserve to be heard — even after hours.",
    description: "Screen intake calls, capture case details, and schedule consultations 24/7.",
    icon: "Scale",
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=600&h=400&fit=crop",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    tagline: "Turn your Zillow leads into closed deals.",
    description: "AI qualifies inquiries, books showings, and follows up so no lead goes cold overnight.",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
  },
  {
    id: "hotel",
    name: "Hotels & Hospitality",
    tagline: "Your hotel front desk, always open.",
    description: "Handle reservations, local recommendations, and guest requests at any hour.",
    icon: "BedDouble",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
  },
  {
    id: "medspa",
    name: "Med Spas",
    tagline: "#1 AI receptionist for med spas.",
    description: "Book treatments, answer pricing questions, and send reminder texts automatically.",
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop",
  },
];

export const PRICING: PricingTier[] = [
  {
    name: "Pro Starter",
    price: "$39.95",
    period: "/ month",
    description: "For solo operators, micro-boutiques, and local businesses getting started.",
    features: [
      "50 Voice Minutes / month included",
      "1 AI Personality of your choice",
      "Dedicated Business Phone Number",
      "Call Summaries + SMS Follow-Up",
      "Top-Off Packs available (non-expiring)",
    ],
    cta: "Get Pro Starter",
    highlighted: false,
  },
  {
    name: "Pro Studio",
    price: "$99.95",
    period: "/ month",
    description: "For growing teams that need full AI answering, analytics, and follow-up.",
    features: [
      "200 Voice Minutes / month included",
      "All 5 AI Personalities",
      "24/7 AI Answering & Long-Term Memory",
      "Team Inbox + Ticket Tracking",
      "Top-Off Packs available (non-expiring)",
    ],
    cta: "Get Pro Studio",
    highlighted: true,
    badge: "MOST POPULAR",
  },
  {
    name: "Agency Scale",
    price: "$349.95",
    period: "/ month",
    description: "For agencies managing multiple clients and locations.",
    features: [
      "1,000 Voice Minutes / month included",
      "Multi-Line Routing & Team Shared Inbox",
      "Advanced Analytics & Priority AI Speeds",
      "White-Label Options Available",
      "Top-Off Packs available (non-expiring)",
    ],
    cta: "Scale Your Agency",
    highlighted: false,
  },
];

export const TOP_OFF_PACKS = [
  { minutes: 100, price: "$35.00", rate: "$0.35/min", label: "Starter Pack" },
  { minutes: 250, price: "$75.00", rate: "$0.30/min", label: "Growth Pack" },
  { minutes: 500, price: "$125.00", rate: "$0.25/min", label: "Power Pack" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We stopped missing calls the same week we set it up. The AI follows up better than most of our staff.",
    author: "Sarah M.",
    role: "Office Manager",
    industry: "Dental Practice",
  },
  {
    quote: "The long-term memory feature is what sold us. It remembers which properties clients liked three months ago.",
    author: "Daniel R.",
    role: "Real Estate Agent",
    industry: "Property Management",
  },
  {
    quote: "Our busiest Saturdays used to mean 40 missed calls. Now every single one gets answered and followed up.",
    author: "Carlos T.",
    role: "Owner",
    industry: "HVAC Services",
  },
  {
    quote: "I thought we needed a full receptionist. Turns out we just needed the right AI.",
    author: "Priya L.",
    role: "Operations Lead",
    industry: "Home Services",
  },
];

export const VOICE_RATES = [
  { plan: "Pro Starter",    included: "50 min",    rate: "$0.80/min",  topOff: "$35 / 100 min" },
  { plan: "Pro Studio",    included: "200 min",   rate: "$0.50/min",  topOff: "$35 / 100 min" },
  { plan: "Agency Scale",  included: "1,000 min", rate: "$0.35/min",  topOff: "$75 / 250 min" },
];

// Kept for any legacy references — maps to voice minute rates by region
export const CREDIT_RATES = [
  { usage: "AI Voice Answering", us: "1 min", uk: "1 min", eu: "1 min", apac: "1 min", latam: "1 min" },
  { usage: "Live Translation",   us: "1 min", uk: "1 min", eu: "1 min", apac: "1 min", latam: "1 min" },
  { usage: "Call Transfer",      us: "1 min", uk: "1 min", eu: "1 min", apac: "1 min", latam: "1 min" },
  { usage: "SMS Follow-Up",      us: "Included", uk: "Included", eu: "Included", apac: "Included", latam: "Included" },
  { usage: "Voicemail (AI mode)",us: "1 min", uk: "1 min", eu: "1 min", apac: "1 min", latam: "1 min" },
];

export const PERSONALITIES: Personality[] = [
  {
    id: "italian-charmer",
    name: "The Italian Charmer",
    emoji: "🇮🇹",
    tagline: "Warm, expressive, family-first",
    description:
      "Your customers feel like they just walked into the best restaurant in Little Italy. Disarming warmth, passionate about helping, and never in a rush.",
    sampleGreeting:
      "Buongiorno! Welcome to [Business], you've reached the best place in town! How can I help you today, my friend?",
    sampleHandoff:
      "Of course, of course! Let me get the right person for you — please hold just one moment, I promise it'll be worth it!",
    sampleFollowup:
      "Ciao! Just checking in to make sure everything was to your liking. We care very much about you, our valued customer!",
    tone: ["Warm", "Expressive", "Family-oriented"],
    accent: "Italian-American",
    color: "from-green-500/15 to-red-500/10",
    borderColor: "border-green-500/25",
    textColor: "text-green-400",
    tier: "Personality Pack",
  },
  {
    id: "east-coaster",
    name: "The East Coaster",
    emoji: "🗽",
    tagline: "Fast, direct, gets things done",
    description:
      "No fluff, all action. Customers get answers fast, in plain language. Think New York energy — efficient, confident, zero time wasted.",
    sampleGreeting: "Yeah, hey! Thanks for calling [Business]. What do you need?",
    sampleHandoff:
      "Alright, putting you through right now. Shouldn't be more than a minute.",
    sampleFollowup:
      "Hey, quick follow-up from [Business]. Just making sure everything worked out — call us back if it didn't.",
    tone: ["Direct", "Efficient", "No-nonsense"],
    accent: "New York / Boston",
    color: "from-blue-500/15 to-slate-500/10",
    borderColor: "border-blue-500/25",
    textColor: "text-blue-400",
    tier: "Personality Pack",
  },
  {
    id: "southern-belle",
    name: "The Southern Belle",
    emoji: "🌸",
    tagline: "Sweet, hospitable, never rushes",
    description:
      "Every caller feels like a welcomed guest at a Sunday dinner. Genuine warmth, unhurried care, and the kind of manners that make people call back.",
    sampleGreeting:
      "Well hello there, and thank you so much for calling [Business]! How can I help you today, sugar?",
    sampleHandoff:
      "Oh, bless your heart for your patience! Let me get someone wonderful on the line for you right away, hon.",
    sampleFollowup:
      "Hi there, sweetheart! Just wanted to reach out and make sure you're all taken care of. You have a wonderful day now!",
    tone: ["Warm", "Unhurried", "Hospitable"],
    accent: "Deep South",
    color: "from-pink-500/15 to-rose-500/10",
    borderColor: "border-pink-500/25",
    textColor: "text-pink-400",
    tier: "Personality Pack",
  },
  {
    id: "good-ol-boy",
    name: "The Good Ol' Boy",
    emoji: "🤠",
    tagline: "Folksy, trustworthy, straight shooter",
    description:
      "Down-to-earth, real, and honest. Customers trust this voice immediately — it sounds like a friend who happens to run a great business.",
    sampleGreeting:
      "Well hey there! You've reached [Business] — what can I do ya for today, buddy?",
    sampleHandoff:
      "Hold on just a hot second, I'm gonna grab the right fella for ya. Won't be but a minute!",
    sampleFollowup:
      "Hey there! Just checkin' in from [Business] to make sure everything's right as rain. Y'all give us a holler if you need anything!",
    tone: ["Folksy", "Trustworthy", "Unpretentious"],
    accent: "Rural South / Midwest",
    color: "from-amber-500/15 to-orange-500/10",
    borderColor: "border-amber-500/25",
    textColor: "text-amber-400",
    tier: "Personality Pack",
  },
  {
    id: "corner-office",
    name: "The Corner Office",
    emoji: "💼",
    tagline: "Crisp, professional, executive-grade",
    description:
      "The voice your enterprise clients expect. Clear diction, measured cadence, and impeccable phrasing that builds immediate credibility.",
    sampleGreeting:
      "Thank you for calling [Business]. How may I direct your call today?",
    sampleHandoff:
      "Of course. I'll connect you with the appropriate department now. Please remain on the line.",
    sampleFollowup:
      "Good afternoon. This is a courtesy follow-up from [Business] regarding your recent inquiry. Please don't hesitate to reach us if further assistance is needed.",
    tone: ["Professional", "Measured", "Authoritative"],
    accent: "Mid-Atlantic / Neutral",
    color: "from-slate-400/10 to-indigo-500/10",
    borderColor: "border-slate-400/20",
    textColor: "text-slate-300",
    tier: "Standard",
  },
];
