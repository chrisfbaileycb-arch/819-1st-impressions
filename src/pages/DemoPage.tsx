import { useState } from "react";
import { submitLead, FIREBASE_STUDIO_URL } from "@/lib/firebase";
import PageMeta from "@/components/PageMeta";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  Shield,
  Phone,
  Sparkles,
  Database,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirebase } from "@/context/FirebaseContext";

// ── Zod schema ──────────────────────────────────────────────────────────────

const demoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  businessName: z.string().min(2, "Business name is required"),
  industry: z.string().min(1, "Please select your industry"),
  teamSize: z.string().min(1, "Please select your team size"),
  phoneSetup: z.string().min(1, "Please select your current setup"),
  problemStatement: z
    .string()
    .min(20, "Tell us a bit more — at least 20 characters"),
});

type DemoFormValues = z.infer<typeof demoSchema>;

// ── Static data ──────────────────────────────────────────────────────────────

const INDUSTRIES_LIST = [
  "Dental Practice",
  "HVAC / Plumbing",
  "Law Firm",
  "Real Estate",
  "Hotel / Hospitality",
  "Med Spa / Wellness",
  "Home Services",
  "Veterinary",
  "Insurance",
  "Accounting / Finance",
  "Retail",
  "Restaurant / Food Service",
  "Property Management",
  "Other",
];

const TEAM_SIZES = [
  { value: "solo", label: "Just me" },
  { value: "2-5", label: "2–5 people" },
  { value: "6-20", label: "6–20 people" },
  { value: "21-50", label: "21–50 people" },
  { value: "50+", label: "50+ people" },
];

const PHONE_SETUPS = [
  { value: "mobile-only", label: "Mobile only — no separate business line" },
  { value: "landline-voip", label: "Traditional landline or VoIP" },
  { value: "existing-software", label: "Using existing call software" },
  { value: "nothing-formal", label: "Nothing formal — just winging it" },
];

const DEMO_BULLETS = [
  "Live AI answering on a real business number — your industry, your scripts",
  "Side-by-side personality picker and tone customization",
  "The inbox, follow-up queue, and analytics dashboard live",
  "Unscripted Q&A tailored to your specific problem",
];

const STATS = [
  { icon: Clock, label: "30-min session", sub: "No fluff" },
  { icon: Users, label: "1,200+ demos", sub: "Booked this year" },
  { icon: Calendar, label: "Next-day slots", sub: "Usually available" },
  { icon: Shield, label: "No commitment", sub: "Ever" },
];

// ── Input style helper ───────────────────────────────────────────────────────

function inputClass(hasError: boolean) {
  return cn(
    "w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 min-h-[44px]",
    hasError
      ? "border-red-500/50 focus:ring-red-500/30"
      : "border-white/12 focus:border-brand-500/50 focus:ring-brand-500/30"
  );
}

// ── Success state ────────────────────────────────────────────────────────────

function SuccessState({
  onReset,
  onOpenStudio,
}: {
  onReset: () => void;
  onOpenStudio: () => void;
}) {
  return (
    <div className="text-center py-10 px-4">
      <div className="w-16 h-16 rounded-full bg-brand-500/15 border border-brand-500/30 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-8 h-8 text-brand-400" />
      </div>
      <h3 className="font-display font-bold text-white text-2xl mb-3">
        You're on the list.
      </h3>
      <p className="text-slate-400 leading-relaxed mb-2 max-w-xs mx-auto">
        We'll match you with a specialist for your industry and send a calendar
        link within one business day.
      </p>
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium mb-6">
        <Database className="w-3.5 h-3.5" />
        <span>Lead securely synced to Firebase Studio Firestore</span>
      </div>
      <p className="text-slate-500 text-sm mb-6">
        Check your inbox — including spam just in case.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenStudio}
          className="btn-secondary text-xs py-2 px-4 flex items-center gap-1.5"
        >
          <Database className="w-3.5 h-3.5 text-brand-400" />
          <span>Open Firebase Studio</span>
          <ExternalLink className="w-3 h-3" />
        </button>
        <button
          onClick={onReset}
          className="text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors duration-200"
        >
          Submit another request →
        </button>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const { openStudioModal } = useFirebase();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
  });

  const selectedTeamSize = watch("teamSize");
  const selectedPhoneSetup = watch("phoneSetup");

  const onSubmit = async (data: DemoFormValues) => {
    try {
      const leadId = await submitLead({
        name: data.name,
        email: data.email,
        businessName: data.businessName,
        industry: data.industry,
        teamSize: data.teamSize,
        phoneSetup: data.phoneSetup,
        problemStatement: data.problemStatement,
        source: "demo-form",
      });

      toast.success("Demo request received!", {
        description: `Lead synced to Firebase Studio Firestore (${leadId.slice(0, 8)}...).`,
        action: {
          label: "View Studio",
          onClick: () => window.open(FIREBASE_STUDIO_URL, "_blank"),
        },
        duration: 6000,
      });
      setSubmitted(true);
      reset();
    } catch (error: unknown) {
      const err = error as Error;
      console.error("Firebase lead insert error:", error);
      toast.error("Something went wrong. Please try again.", {
        description: err.message || "Failed to submit lead to database.",
      });
    }
  };

  return (
    <main className="pt-20">
      <PageMeta
        title="Book a Demo"
        description="Book a 30-minute live demo of the 1st Impressions AI receptionist — tailored to your industry. No pitch. Just the product working on real calls."
        canonical="/demo"
      />
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="section-padding pb-8 relative overflow-hidden">
        <div className="hero-glow opacity-40" />
        <div className="section-container relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 badge-brand mb-6">
            <Phone className="w-3.5 h-3.5" />
            Book a Demo
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            See it answer{" "}
            <span className="brand-gradient-text">your calls.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed">
            30 minutes. Live demo for your business type. No slides, no pitch —
            just the product working.
          </p>
        </div>
      </section>

      {/* ── Two-column layout ─────────────────────────────────────────────── */}
      <section className="section-padding pt-4">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 max-w-5xl mx-auto items-start">
            {/* Left — social proof */}
            <div className="lg:col-span-2 lg:sticky lg:top-28">
              <h2 className="font-display font-bold text-xl text-white mb-6">
                What you'll see in 30 minutes
              </h2>

              <ul className="space-y-4 mb-10">
                {DEMO_BULLETS.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {STATS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="glass-card p-4 text-center">
                      <Icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm">
                        {item.label}
                      </div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        {item.sub}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Testimonial */}
              <div className="glass-card p-5 border-brand-500/15">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-3.5 h-3.5 text-brand-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-4">
                  "The demo alone taught us more about what we were missing than
                  a year of reading reviews. We signed up same day."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-xs font-bold text-brand-400 flex-shrink-0">
                    SM
                  </div>
                  <div>
                    <div className="text-white text-xs font-semibold">
                      Sarah M.
                    </div>
                    <div className="text-slate-500 text-xs">
                      Office Manager · Dental Practice
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <div className="glass-card p-8">
                {submitted ? (
                  <SuccessState
                    onReset={() => setSubmitted(false)}
                    onOpenStudio={openStudioModal}
                  />
                ) : (
                  <>
                    <h2 className="font-display font-semibold text-white text-xl mb-1">
                      Request your demo
                    </h2>
                    <p className="text-slate-400 text-sm mb-8">
                      Fill this out and we'll match you with a specialist for
                      your industry.
                    </p>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                      noValidate
                    >
                      {/* Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-slate-300 mb-1.5"
                          >
                            Your name{" "}
                            <span className="text-brand-400">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            placeholder="Jane Smith"
                            {...register("name")}
                            className={inputClass(!!errors.name)}
                          />
                          {errors.name && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-slate-300 mb-1.5"
                          >
                            Work email{" "}
                            <span className="text-brand-400">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="jane@company.com"
                            {...register("email")}
                            className={inputClass(!!errors.email)}
                          />
                          {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Business name */}
                      <div>
                        <label
                          htmlFor="businessName"
                          className="block text-sm font-medium text-slate-300 mb-1.5"
                        >
                          Business name{" "}
                          <span className="text-brand-400">*</span>
                        </label>
                        <input
                          id="businessName"
                          type="text"
                          placeholder="Sunshine Dental Group"
                          {...register("businessName")}
                          className={inputClass(!!errors.businessName)}
                        />
                        {errors.businessName && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.businessName.message}
                          </p>
                        )}
                      </div>

                      {/* Industry */}
                      <div>
                        <label
                          htmlFor="industry"
                          className="block text-sm font-medium text-slate-300 mb-1.5"
                        >
                          Industry <span className="text-brand-400">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="industry"
                            {...register("industry")}
                            className={cn(
                              inputClass(!!errors.industry),
                              "appearance-none bg-[#0C1428] cursor-pointer"
                            )}
                          >
                            <option value="" className="bg-[#0C1428]">
                              Select your industry…
                            </option>
                            {INDUSTRIES_LIST.map((ind) => (
                              <option
                                key={ind}
                                value={ind}
                                className="bg-[#0C1428]"
                              >
                                {ind}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                            <svg
                              className="w-4 h-4 text-slate-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                        {errors.industry && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.industry.message}
                          </p>
                        )}
                      </div>

                      {/* Team size — pill radios */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                          Team size <span className="text-brand-400">*</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TEAM_SIZES.map((size) => (
                            <label key={size.value} className="cursor-pointer">
                              <input
                                type="radio"
                                value={size.value}
                                {...register("teamSize")}
                                className="sr-only"
                              />
                              <span
                                className={cn(
                                  "inline-flex items-center px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 min-h-[44px]",
                                  selectedTeamSize === size.value
                                    ? "bg-brand-500/20 border-brand-500/50 text-brand-300"
                                    : "border-white/12 text-slate-400 hover:border-white/25 hover:text-slate-300"
                                )}
                              >
                                {size.label}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.teamSize && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.teamSize.message}
                          </p>
                        )}
                      </div>

                      {/* Current phone setup — card radios */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                          Current phone setup{" "}
                          <span className="text-brand-400">*</span>
                        </label>
                        <div className="space-y-2">
                          {PHONE_SETUPS.map((setup) => (
                            <label
                              key={setup.value}
                              className={cn(
                                "flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer min-h-[52px]",
                                selectedPhoneSetup === setup.value
                                  ? "border-brand-500/45 bg-brand-500/8"
                                  : "border-white/8 hover:border-white/18 hover:bg-white/3"
                              )}
                            >
                              <input
                                type="radio"
                                value={setup.value}
                                {...register("phoneSetup")}
                                className="w-4 h-4 flex-shrink-0 accent-blue-500"
                              />
                              <span className="text-slate-300 text-sm">
                                {setup.label}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.phoneSetup && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.phoneSetup.message}
                          </p>
                        )}
                      </div>

                      {/* Problem statement */}
                      <div>
                        <label
                          htmlFor="problemStatement"
                          className="block text-sm font-medium text-slate-300 mb-1.5"
                        >
                          What are you trying to solve?{" "}
                          <span className="text-brand-400">*</span>
                        </label>
                        <textarea
                          id="problemStatement"
                          rows={4}
                          placeholder="We miss a lot of calls when we're with patients. Voicemails pile up and leads go cold before we can follow up..."
                          {...register("problemStatement")}
                          className={cn(
                            inputClass(!!errors.problemStatement),
                            "min-h-[unset] resize-none leading-relaxed"
                          )}
                        />
                        {errors.problemStatement && (
                          <p className="mt-1.5 text-xs text-red-400">
                            {errors.problemStatement.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending…
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Book My Demo{" "}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        )}
                      </button>

                      <p className="text-center text-xs text-slate-500 leading-relaxed">
                        No spam. No sales pressure. We'll only contact you about
                        your demo session.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom strip ─────────────────────────────────────────────────── */}
      <section className="section-padding border-t border-white/6 mt-10">
        <div className="section-container text-center max-w-xl mx-auto">
          <p className="text-slate-400 text-sm leading-relaxed">
            Prefer to skip the demo?{" "}
            <a
              href="/pricing"
              className="text-brand-400 hover:text-brand-300 font-medium transition-colors duration-200"
            >
              Start your free trial directly →
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
