import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, HelpCircle, ArrowRight, Zap, X, CheckCircle2, Database, ExternalLink } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import { PRICING, TOP_OFF_PACKS, VOICE_RATES } from "@/constants";
import { submitLead, FIREBASE_STUDIO_URL } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import CTASection from "@/components/features/CTASection";

// ── Lead capture schema ───────────────────────────────────────────────────────

const leadSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  businessName: z.string().min(2, "Business name required"),
});

type LeadFormValues = z.infer<typeof leadSchema>;

// ── Lead modal ────────────────────────────────────────────────────────────────

function LeadModal({
  plan,
  onClose,
}: {
  plan: string;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({ resolver: zodResolver(leadSchema) });

  const onSubmit = async (data: LeadFormValues) => {
    try {
      const leadId = await submitLead({
        name: data.name,
        email: data.email,
        businessName: data.businessName,
        planInterest: plan,
        source: "pricing-cta",
      });

      toast.success("You're on the list!", {
        description: `Synced to Firebase Studio leads collection (${leadId.slice(0, 8)}...).`,
        action: {
          label: "View Studio",
          onClick: () => window.open(FIREBASE_STUDIO_URL, "_blank"),
        },
      });
      setDone(true);
    } catch (error: unknown) {
      console.error("Firebase lead error:", error);
      toast.error("Something went wrong — please try again.");
    }
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-colors duration-200",
      hasError
        ? "border-red-500/50 focus:ring-red-500/30"
        : "border-white/12 focus:border-brand-500/50 focus:ring-brand-500/30"
    );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative glass-card p-8 w-full max-w-md z-10 animate-fade-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/8"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-brand-500/15 border border-brand-500/30 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-brand-400" />
            </div>
            <h3 className="font-display font-bold text-white text-xl mb-2">
              You're on the list!
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We'll be in touch within 24 hours to get you set up.
            </p>
            <button onClick={onClose} className="btn-primary px-8 py-3 text-sm">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <span className="badge-brand text-xs mb-3 inline-block">{plan} plan</span>
              <h3 className="font-display font-bold text-white text-xl mb-1">
                {plan === "Agency Scale" ? "Scale your agency today" : `Get started with ${plan}`}
              </h3>
              <p className="text-slate-400 text-sm">
                No setup fees. Cancel anytime.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div>
                <label htmlFor="modal-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your name <span className="text-brand-400">*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  placeholder="Jane Smith"
                  {...register("name")}
                  className={inputClass(!!errors.name)}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Work email <span className="text-brand-400">*</span>
                </label>
                <input
                  id="modal-email"
                  type="email"
                  placeholder="jane@company.com"
                  {...register("email")}
                  className={inputClass(!!errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="modal-biz" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Business name <span className="text-brand-400">*</span>
                </label>
                <input
                  id="modal-biz"
                  type="text"
                  placeholder="Sunshine Dental Group"
                  {...register("businessName")}
                  className={inputClass(!!errors.businessName)}
                />
                {errors.businessName && (
                  <p className="mt-1 text-xs text-red-400">{errors.businessName.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving…
                  </span>
                ) : (
                  `Get Started with ${plan} →`
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                Billed monthly · No setup fees · Cancel anytime
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ── FAQ data ──────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "How does voice minute billing work?",
    a: "Every call is rounded up to the nearest whole minute at the end of the call. Minutes are deducted from your monthly plan pool first, then from any non-expiring top-off balance you've purchased.",
  },
  {
    q: "What happens when I hit my monthly limit?",
    a: "At 80% usage you'll get an SMS alert. At 100%, if Auto-Top-Off is enabled we charge your default top-off pack ($35 / 100 min) and keep you live. If it's disabled, calls route to AI Voicemail mode until you top off.",
  },
  {
    q: "Do top-off minutes expire?",
    a: "Never. Top-off minutes roll over indefinitely. Use them whenever you need them — busy season or slow month, they're always there.",
  },
  {
    q: "Can I change my plan?",
    a: "Yes. Upgrade or downgrade anytime. Your remaining balance from the old plan is prorated toward your new plan.",
  },
  {
    q: "Is there a feature wall between plans?",
    a: "No. All plans include the full platform — AI answering, live translation, analytics, long-term memory, outbound calling, and team inbox. The difference is voice minutes included each month.",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [activePlan, setActivePlan] = useState<string | null>(null);

  return (
    <main className="pt-20">
      <PageMeta
        title="Pricing — AI Receptionist Plans"
        description="1st Impressions AI receptionist plans from $39.95/month. Pro Starter, Pro Studio, and Agency Scale — all plans include AI answering, analytics, and the full platform."
        canonical="/pricing"
      />
      {/* Lead modal */}
      {activePlan && (
        <LeadModal plan={activePlan} onClose={() => setActivePlan(null)} />
      )}

      {/* Hero */}
      <section className="section-padding pb-0 relative overflow-hidden">
        <div className="hero-glow opacity-40" />
        <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
          <p className="numbered-label mb-4">Pricing</p>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            Simple Plans.{" "}
            <span className="brand-gradient-text">Every Call Answered.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            All plans include the full platform. The only difference is how many voice minutes are in your monthly pool.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative rounded-2xl p-8 border flex flex-col",
                  tier.highlighted
                    ? "bg-gradient-to-b from-brand-500/14 to-purple-600/8 border-brand-500/45 shadow-2xl shadow-brand-500/10"
                    : "bg-white/4 border-white/10"
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge-brand px-4 py-1.5 text-xs font-bold shadow-lg">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-7">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                    {tier.name}
                  </div>
                  <div className="flex items-end gap-1.5 mb-4">
                    {tier.price ? (
                      <>
                        <span className="font-display font-bold text-5xl text-white">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-slate-400 text-sm pb-2">{tier.period}</span>
                        )}
                      </>
                    ) : (
                      <span className="font-display font-bold text-4xl text-white">Custom</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{tier.description}</p>
                </div>

                <ul className="space-y-3.5 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className={cn(
                          "w-4 h-4 flex-shrink-0 mt-0.5",
                          tier.highlighted ? "text-brand-400" : "text-slate-500"
                        )}
                      />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setActivePlan(tier.name)}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[44px]",
                    tier.highlighted
                      ? "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:-translate-y-0.5"
                      : "bg-white/8 hover:bg-white/12 text-slate-200 border border-white/12"
                  )}
                >
                  {tier.cta}
                  {tier.highlighted && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-10 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-brand-500" /> Plans from $39.95/month</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-brand-500" /> No setup fees</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-brand-500" /> Cancel anytime</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-brand-500" /> Top-off minutes never expire</span>
          </div>
        </div>
      </section>

      {/* Voice minute rates + top-off packs */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
              Voice minutes at a glance
            </h2>
            <p className="text-slate-400">
              Every plan deducts from your monthly pool first, then your non-expiring top-off balance.
            </p>
          </div>

          {/* Plan rates */}
          <div className="glass-card overflow-x-auto mb-8">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left text-slate-400 font-semibold px-6 py-4">Plan</th>
                  <th className="text-right text-slate-400 font-semibold px-4 py-4">Included</th>
                  <th className="text-right text-slate-400 font-semibold px-4 py-4">Effective rate</th>
                  <th className="text-right text-slate-400 font-semibold px-6 py-4">Top-Off option</th>
                </tr>
              </thead>
              <tbody>
                {VOICE_RATES.map((row, i) => (
                  <tr key={row.plan} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="text-slate-200 font-medium px-6 py-4">{row.plan}</td>
                    <td className="text-right text-slate-400 px-4 py-4 font-mono text-xs">{row.included}</td>
                    <td className="text-right text-brand-300 px-4 py-4 font-mono text-xs font-semibold">{row.rate}</td>
                    <td className="text-right text-slate-400 px-6 py-4 font-mono text-xs">{row.topOff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top-off packs */}
          <div className="text-center mb-8">
            <h3 className="font-display font-semibold text-white text-xl mb-2">Top-Off Packs</h3>
            <p className="text-slate-400 text-sm">Non-expiring. Add anytime. Auto-top-off available.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {TOP_OFF_PACKS.map((pack) => (
              <div key={pack.minutes} className="glass-card p-6 text-center">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{pack.label}</div>
                <div className="font-display font-bold text-3xl text-white mb-1">{pack.price}</div>
                <div className="text-brand-300 text-sm font-semibold mb-1">{pack.minutes} minutes</div>
                <div className="text-slate-500 text-xs">{pack.rate} · never expires</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-8 h-8 text-brand-500/60 mx-auto mb-4" />
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Questions people ask before switching.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card p-6">
                <h3 className="font-display font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
