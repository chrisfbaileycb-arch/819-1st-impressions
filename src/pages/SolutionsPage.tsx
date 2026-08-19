import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import {
  ArrowRight, Stethoscope, Thermometer, Scale, Home, BedDouble, Sparkles,
  Coffee, Scissors, Wrench, ShoppingBag, Car, Star,
} from "lucide-react";
import { INDUSTRIES } from "@/constants";
import CTASection from "@/components/features/CTASection";
import type { LucideProps } from "lucide-react";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Stethoscope, Thermometer, Scale, Home, BedDouble, Sparkles,
  Coffee, Scissors, Wrench, ShoppingBag, Car, Star,
};

const LEGACY_INDUSTRIES = [
  {
    id: "restaurant",
    name: "Restaurants",
    tagline: "Never put a diner on hold again.",
    icon: "Coffee",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
  },
  {
    id: "barber",
    name: "Barbershops & Salons",
    tagline: "Never interrupt a client to answer the phone.",
    icon: "Scissors",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop",
  },
  {
    id: "home-services",
    name: "Home Services",
    tagline: "Book jobs while you're on the job.",
    icon: "Wrench",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
  },
  {
    id: "retail",
    name: "Retail Stores",
    tagline: "Turn your followers into customers.",
    icon: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
  },
  {
    id: "automotive",
    name: "Automotive",
    tagline: "More bookings, fewer phone tag games.",
    icon: "Car",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
  },
  {
    id: "freelancer",
    name: "Freelancers",
    tagline: "Turn your followers into customers.",
    icon: "Star",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
];

const PROCESS_TEMPLATE = [
  "Pain scenario — a specific costly moment",
  "How 1st Impressions handles this exact scenario",
  "4-step setup: Number → Rules → Capture → Follow up",
  "3 industry-specific FAQs",
];

export default function SolutionsPage() {
  return (
    <main className="pt-20">
      <PageMeta
        title="Industry Solutions"
        description="Pre-built AI receptionist workflows for dental practices, HVAC companies, law firms, real estate, hotels, med spas, and 12+ more industries."
        canonical="/solutions"
      />
      {/* Hero */}
      <section className="section-padding pb-10 relative overflow-hidden">
        <div className="hero-glow opacity-40" />
        <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
          <p className="numbered-label mb-4">Industry solutions</p>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            Built for how{" "}
            <span className="brand-gradient-text">your industry</span>{" "}
            actually works.
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Pre-configured AI agents and workflows for the industries where phone calls still run the business. Up and running in under an hour.
          </p>
        </div>
      </section>

      {/* New industries (pSEO template) */}
      <section className="section-padding pt-4">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="badge-brand text-xs mb-2 inline-block">Fully configured</span>
              <h2 className="font-display font-bold text-2xl text-white">Top 6 industries</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((industry, index) => {
              const Icon = iconMap[industry.icon] ?? Home;
              return (
                <div
                  key={industry.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 hover:border-white/18 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/50 to-transparent" />
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="p-6 bg-[#0D1530]">
                    <div className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-2">
                      {industry.name}
                    </div>
                    <h3 className="font-display font-bold text-white text-lg leading-snug mb-2">
                      {industry.tagline}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {industry.description}
                    </p>
                    <span className="flex items-center gap-1.5 text-brand-400 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                      See how it works <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* More industries */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="mb-10">
            <p className="numbered-label mb-2">More industries</p>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              18 industries total — and counting.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEGACY_INDUSTRIES.map((industry) => {
              const Icon = iconMap[industry.icon] ?? Home;
              return (
                <div
                  key={industry.id}
                  className="group glass-card-hover p-5 flex items-center gap-4 cursor-pointer"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">
                      {industry.name}
                    </div>
                    <p className="text-white font-semibold text-sm leading-snug">
                      {industry.tagline}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-400 transition-colors duration-200 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Template anatomy — educational block */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container max-w-2xl mx-auto text-center">
          <p className="numbered-label mb-4">How each solution page works</p>
          <h2 className="font-display font-bold text-3xl text-white mb-6">
            Every industry solution follows the same proven structure.
          </h2>
          <div className="glass-card p-8 text-left">
            <div className="space-y-4">
              {PROCESS_TEMPLATE.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-brand-500/60 tracking-widest mt-0.5 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Your industry. Your AI. Your rules."
        sub="Start free, describe your business, and have a trained AI agent answering calls today."
      />
    </main>
  );
}
