import { Link } from "react-router-dom";
import { ArrowRight, Check, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import CTASection from "@/components/features/CTASection";

// ─── Data ────────────────────────────────────────────────────────────────────
const COMPARISON_ROWS = [
  { feature: "Available 24/7, including holidays", us: true, them: "Business hours only" },
  { feature: "Never misses a call", us: true, them: "Volume-limited, queues form" },
  { feature: "Pricing model", us: "From $39.95 / flat monthly", them: "Per-minute / per-call" },
  { feature: "Knows your returning customers", us: "Long-term memory", them: false },
  { feature: "Call summaries + team follow-up tasks", us: true, them: false },
  { feature: "Outbound calling campaigns", us: true, them: false },
  { feature: "Live translation (70+ languages)", us: true, them: false },
  { feature: "Personality customization", us: "5 distinct voices", them: "Fixed script" },
  { feature: "Team inbox + ticket tracking", us: true, them: "Add-on / separate tool" },
  { feature: "No per-minute overage surprises", us: true, them: false },
  { feature: "No setup fees", us: true, them: false },
  { feature: "AI diagnoses call trends (analytics)", us: true, them: false },
];

const SWITCHED_QUOTES = [
  {
    quote: "We were paying for after-hours coverage that stopped at 5 PM. Now our AI answers at midnight and the cost is the same whether we're quiet or slammed.",
    role: "HVAC Owner",
    location: "Dallas, TX",
  },
  {
    quote: "The per-minute model meant I dreaded busy weeks. With 1st Impressions, a packed Monday costs the same as a slow Friday.",
    role: "Dental Office Manager",
    location: "Phoenix, AZ",
  },
  {
    quote: "We needed something that just worked — not a staffing platform we had to manage. Set it up in an afternoon. Haven't touched it since.",
    role: "Managing Partner",
    location: "Austin, TX",
  },
];

const CHOOSE_WHEN = [
  {
    label: "Choose Smith.ai when…",
    dimmed: true,
    items: [
      "You need a human voice for complex, nuanced negotiations",
      "Your calls require emotional intelligence a script can't cover",
      "Regulatory requirements mandate a human on every call",
      "You have the budget for enterprise-grade staffing costs",
    ],
  },
  {
    label: "Choose 1st Impressions when…",
    dimmed: false,
    items: [
      "You want 24/7 coverage without 24/7 staffing costs",
      "Predictable, flat-rate billing matters to your business",
      "Your team needs a full inbox, not just a call log",
      "You want AI that gets smarter about your customers over time",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ComparisonPage() {
  return (
    <main className="pt-20">
      {/* ── Hero (D2: concede, then invert) ── */}
      <section className="section-padding relative overflow-hidden">
        <div className="hero-glow opacity-40" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 badge-brand mb-6 text-xs">
            1st Impressions vs Smith.ai
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            Smith.ai sends a human.{" "}
            <span className="brand-gradient-text">We send an AI that never clocks out.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-10">
            Human receptionists are great. They're also limited to business hours, charged by the minute, and unavailable when you need them most. Here's what's different.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/pricing" className="btn-primary px-8 py-4 text-base">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/agent-builder" className="btn-secondary px-8 py-4 text-base">
              Build your agent
            </Link>
          </div>
        </div>
      </section>

      {/* ── The model difference ── */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="numbered-label mb-3">The core difference</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Two fundamentally different models.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Neither is wrong — but only one fits a team that needs predictable costs and always-on coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Smith.ai model */}
            <div className="glass-card p-8 border-white/8 opacity-80">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-5">
                Smith.ai — Human Model
              </div>
              <ul className="space-y-4">
                {[
                  "Human receptionists answer your calls",
                  "Per-minute or per-call billing — costs scale with volume",
                  "Coverage limited to staffed business hours",
                  "Each call logged, but follow-up is manual",
                  "Fixed greeting script, no personality options",
                  "Monthly minute caps — overages cost extra",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/6 border border-white/12 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3 h-3 text-slate-600" />
                    </div>
                    <span className="text-slate-400 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 1st Impressions model */}
            <div className="rounded-2xl p-8 bg-gradient-to-b from-brand-600/12 to-purple-700/6 border-2 border-brand-500/35 shadow-2xl shadow-brand-500/10">
              <div className="flex items-center gap-2 mb-5">
                <div className="text-brand-400 text-xs font-bold uppercase tracking-widest">
                  1st Impressions — AI Model
                </div>
                <Zap className="w-3.5 h-3.5 text-brand-500" />
              </div>
              <ul className="space-y-4">
                {[
                  "AI answers every call — instantly, every time",
                  "From $39.95 / month flat — no volume surprises",
                  "24/7 coverage including nights, weekends, holidays",
                  "Every call summarized + follow-up task created automatically",
                  "5 distinct personalities, fully customizable",
                  "Voice minutes pool — non-expiring top-off packs available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-500/25 border border-brand-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-400" />
                    </div>
                    <span className="text-slate-200 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Price math ── */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <p className="numbered-label mb-3">Price math</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
                Same budget. Very different outcomes.
              </h2>
            </div>

            <div className="glass-card overflow-hidden">
              <div className="grid grid-cols-3 border-b border-white/8">
                <div className="p-5 text-slate-400 text-xs font-bold uppercase tracking-widest" />
                <div className="p-5 border-l border-white/8 text-center text-slate-400 text-sm font-semibold">
                  Smith.ai
                </div>
                <div className="p-5 border-l border-white/8 text-center text-brand-400 text-sm font-semibold">
                  1st Impressions
                </div>
              </div>

              {[
                { label: "Pricing model", smith: "Per minute", us: "Flat monthly plan" },
                { label: "Pro Studio plan", smith: "~$285–700 / mo", us: "$99.95 / mo" },
                { label: "After-hours coverage", smith: "Extra or unavailable", us: "Included" },
                { label: "Overage cost", smith: "Per additional minute", us: "Top-off packs, never expire" },
                { label: "Call summaries + inbox", smith: "Call log only", us: "Included" },
                { label: "Setup fee", smith: "Yes", us: "None" },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={cn("grid grid-cols-3 border-b border-white/5", i % 2 !== 0 ? "bg-white/2" : "")}
                >
                  <div className="p-4 px-5 text-slate-300 text-sm font-medium">{row.label}</div>
                  <div className="p-4 border-l border-white/6 text-center text-slate-500 text-sm">{row.smith}</div>
                  <div className="p-4 border-l border-white/6 text-center text-brand-300 text-sm font-semibold">{row.us}</div>
                </div>
              ))}
            </div>

            <p className="text-center text-slate-600 text-xs mt-4">
              Smith.ai pricing estimated from public plan pages. Verify current rates at smith.ai.
            </p>
          </div>
        </div>
      </section>

      {/* ── Feature comparison ── */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="numbered-label mb-3">Feature by feature</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Every capability, out of the box.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto glass-card overflow-hidden">
            <div className="grid grid-cols-3 border-b border-white/8 bg-white/2">
              <div className="p-4 px-6 text-slate-400 text-xs font-bold uppercase tracking-wider" />
              <div className="p-4 border-l border-white/8 text-center text-slate-400 text-xs font-bold uppercase tracking-wider">
                Smith.ai
              </div>
              <div className="p-4 border-l border-white/8 text-center text-brand-400 text-xs font-bold uppercase tracking-wider">
                1st Impressions
              </div>
            </div>

            {COMPARISON_ROWS.map((row, i) => (
              <div
                key={row.feature}
                className={cn(
                  "grid grid-cols-3 border-b border-white/5 text-sm",
                  i % 2 !== 0 ? "bg-white/2" : ""
                )}
              >
                <div className="p-4 px-6 text-slate-300 leading-snug">{row.feature}</div>

                {/* Smith.ai */}
                <div className="p-4 border-l border-white/6 flex items-center justify-center">
                  {row.them === false ? (
                    <X className="w-4 h-4 text-slate-600" />
                  ) : (
                    <span className="text-slate-500 text-xs text-center leading-snug">
                      {row.them === true ? <Check className="w-4 h-4 text-slate-500 mx-auto" /> : row.them}
                    </span>
                  )}
                </div>

                {/* 1st Impressions */}
                <div className="p-4 border-l border-white/6 flex items-center justify-center">
                  {row.us === true ? (
                    <Check className="w-4 h-4 text-brand-400" />
                  ) : (
                    <span className="text-brand-300 text-xs text-center leading-snug font-medium">
                      {row.us}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why they switched ── */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="numbered-label mb-3">Why they switched</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              From customers who made the switch.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {SWITCHED_QUOTES.map((q) => (
              <div key={q.role} className="glass-card p-7">
                <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <div className="border-t border-white/8 pt-4">
                  <p className="text-white font-semibold text-sm">{q.role}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{q.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choose when ── */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
              The honest comparison.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Both products solve real problems. Here's how to know which one is right for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {CHOOSE_WHEN.map((col) => (
              <div
                key={col.label}
                className={cn(
                  "rounded-2xl p-7 border",
                  col.dimmed
                    ? "bg-white/3 border-white/8 opacity-70"
                    : "bg-gradient-to-b from-brand-600/10 to-brand-900/5 border-brand-500/30"
                )}
              >
                <h3
                  className={cn(
                    "font-display font-bold text-base mb-5",
                    col.dimmed ? "text-slate-400" : "text-white"
                  )}
                >
                  {col.label}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className={cn(
                          "w-4 h-4 flex-shrink-0 mt-0.5",
                          col.dimmed ? "text-slate-600" : "text-brand-400"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm leading-relaxed",
                          col.dimmed ? "text-slate-500" : "text-slate-200"
                        )}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA (mirrors H1) ── */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center glass-card p-10 lg:p-14 border-brand-500/20">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4 leading-snug">
              Smith.ai sends a human. We send an AI that never clocks out.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              No setup fees. No per-minute billing surprises. Your first AI agent is live in under 5 minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/pricing" className="btn-primary px-8 py-4 text-base">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/agent-builder" className="btn-secondary px-8 py-4 text-base">
                Build your agent first
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
