import { Link } from "react-router-dom";
import { ArrowRight, Brain, BarChart3 } from "lucide-react";
import FeaturesGrid from "@/components/features/FeaturesGrid";
import CTASection from "@/components/features/CTASection";
import PainSolutionSection from "@/components/features/PainSolutionSection";
import PageMeta from "@/components/PageMeta";

const UNIQUE_FEATURES = [
  {
    label: "01",
    icon: Brain,
    title: "The AI Receptionist That Doesn't Forget",
    description:
      "Long-Term Memory means 1st Impressions recognizes returning customers and carries context from their last call. No re-explaining. No repeated intake forms.",
    badge: "Most Differentiated",
  },
  {
    label: "02",
    icon: BarChart3,
    title: "Know exactly where calls fall apart.",
    description:
      "Analytics breaks down resolution rate, CSAT, drop-off points, and topic clusters. Most competitors log calls. 1st Impressions diagnoses them.",
    badge: "Unique vs Competitors",
  },
];

export default function FeaturesPage() {
  return (
    <main className="pt-20">
      <PageMeta
        title="14 AI Receptionist Features"
        description="Every feature of the 1st Impressions AI receptionist platform — AI answering, analytics, long-term memory, team inbox, and outbound calling. All plans, no feature walls."
        canonical="/features"
      />
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="hero-glow opacity-50" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <p className="numbered-label mb-4">All features</p>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            Every capability,{" "}
            <span className="brand-gradient-text">out of the box.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-8">
            Fourteen features. One price per seat. No add-ons, no upsells, no feature walls.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/pricing" className="btn-primary px-8 py-4">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* All 14 features */}
      <section className="section-padding pt-0">
        <div className="section-container">
          <FeaturesGrid showAll />
        </div>
      </section>

      {/* Highlighted differentiators */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="numbered-label mb-3">Why choose us</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Two features most competitors don't market.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Long-Term Memory and Analytics are the two most differentiated capabilities in AI phone answering. Both included at no extra charge.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {UNIQUE_FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="glass-card p-8 border-brand-500/20">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-xs font-bold text-brand-500/60 tracking-widest">
                      {f.label}
                    </span>
                    <span className="badge-brand text-[10px]">{f.badge}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-xl mb-3 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pain/Solution */}
      <PainSolutionSection />

      {/* Product tiers */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="numbered-label mb-3">Three products, one AI engine.</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Use the interface that fits your workflow.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                name: "Mobile App",
                tagline: "A business phone on mobile.",
                description: "Separate number, AI answering, and full conversation history — on your personal iPhone.",
                platform: "iOS",
              },
              {
                name: "PC Desk",
                tagline: "Customer inbox and team follow-up.",
                description: "The lightweight helpdesk. Assign tickets, track status, and reply to every channel from one tab.",
                platform: "Web",
                highlight: true,
              },
              {
                name: "Agent Builder",
                tagline: "Customize your AI in plain language.",
                description: "Describe your business. Get a trained AI agent. No code, no prompt engineering required.",
                platform: "Web + Mobile",
              },
            ].map((product) => (
              <div
                key={product.name}
                className={`rounded-2xl p-7 border ${
                  product.highlight
                    ? "bg-gradient-card border-brand-500/30"
                    : "bg-white/4 border-white/10"
                }`}
              >
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/8 border border-white/12 text-slate-400 text-xs font-medium mb-4">
                  {product.platform}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {product.name}
                </h3>
                <p className="text-brand-300 font-medium text-sm mb-3">
                  {product.tagline}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
