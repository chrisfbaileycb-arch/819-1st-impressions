import { useState } from "react";
import PageMeta from "@/components/PageMeta";
import {
  Mic2, FileText, Calendar, Target, HelpCircle, Receipt, Bot,
  MessageSquare, Send, Languages, Globe, Link as LinkIcon, Clock,
  ArrowRight, Zap,
} from "lucide-react";
import { TOOLS } from "@/constants";
import { Link } from "react-router-dom";
import CTASection from "@/components/features/CTASection";
import type { LucideProps } from "lucide-react";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Mic2, FileText, Calendar, Target, HelpCircle, Receipt, Bot,
  MessageSquare, Send, Languages, Globe, Link: LinkIcon, ClockIcon: Clock,
};

const CATEGORIES = ["All", "Voice", "Productivity", "Scheduling", "Sales", "Content", "Finance", "AI", "Language"];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? TOOLS
    : TOOLS.filter((t) => t.category === activeCategory);

  return (
    <main className="pt-20">
      <PageMeta
        title="13 Free AI Tools for Small Business"
        description="Free AI tools for your business: voicemail generator, call summarizer, appointment setter, FAQ builder, lead qualifier, and more. No account required."
        canonical="/tools"
      />
      {/* Hero */}
      <section className="section-padding pb-10 relative overflow-hidden">
        <div className="hero-glow opacity-40" />
        <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 badge-brand mb-6">
            <Zap className="w-3.5 h-3.5" />
            Free — no account required
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            13 free AI tools{" "}
            <span className="brand-gradient-text">for your business.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            Working utilities you can use right now. Each one is a real tool — and each one shows you what's possible when you connect 1st Impressions to your business.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-16 z-30 bg-[#060B18]/80 backdrop-blur-md border-b border-white/8 py-4">
        <div className="section-container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-h-[36px] ${
                  activeCategory === cat
                    ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/6"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="section-padding pt-10">
        <div className="section-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tool, index) => {
              const Icon = iconMap[tool.icon] ?? Bot;
              const isFeatured = index === 0 && activeCategory === "All";

              return (
                <div
                  key={tool.id}
                  className={`group relative rounded-2xl p-7 border transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5 flex flex-col ${
                    isFeatured
                      ? "sm:col-span-2 lg:col-span-1 bg-gradient-card border-brand-500/30 hover:border-brand-500/50"
                      : "bg-white/4 border-white/8 hover:bg-white/7 hover:border-white/18"
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute top-4 right-4 badge-brand text-[10px] px-2 py-0.5">
                      Flagship
                    </span>
                  )}

                  {/* Category badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/6 border border-white/10 text-slate-400 text-xs font-medium">
                      {tool.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                      isFeatured
                        ? "bg-brand-500/20 border border-brand-500/30"
                        : "bg-white/6 border border-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isFeatured ? "text-brand-400" : "text-slate-400 group-hover:text-slate-300"}`}
                    />
                  </div>

                  <h3 className="font-display font-semibold text-white text-lg mb-2 leading-snug">
                    {tool.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">
                    {tool.description}
                  </p>

                  <button className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-200 group-hover:gap-2.5 ${
                    isFeatured ? "text-brand-400" : "text-slate-400 group-hover:text-white"
                  }`}>
                    Try it free <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              No tools in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* Funnel nudge */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container max-w-2xl mx-auto text-center">
          <h2 className="font-display font-bold text-3xl text-white mb-4">
            Want these tools built into your business phone?
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Everything you just tried works automatically in 1st Impressions — triggered by real customer calls, synced with your team's inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/pricing" className="btn-primary px-8 py-4">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/features" className="btn-secondary px-8 py-4">
              See how it connects
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
