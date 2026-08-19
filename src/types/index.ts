export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  highlighted?: boolean;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  href: string;
}

export interface Industry {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
}

export interface PricingTier {
  name: string;
  price: string | null;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  industry: string;
}

export interface PainPoint {
  label: string;
  pain: string;
  solution: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface AgentConfig {
  businessName: string;
  industry: string;
  description: string;
  hours: string;
  services: string[];
  rules: string;
  personalityId: string;
}

export interface Personality {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  sampleGreeting: string;
  sampleHandoff: string;
  sampleFollowup: string;
  tone: string[];
  accent: string;
  color: string;
  borderColor: string;
  textColor: string;
  tier: "Standard" | "Personality Pack";
}
