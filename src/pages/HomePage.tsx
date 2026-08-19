import { Link } from "react-router-dom";
import { ArrowRight, Play, PhoneCall, BarChart2, Zap, Users, Mic, CheckCircle } from "lucide-react";
import { PERSONALITIES } from "@/constants";
import heroReceptionist from "@/assets/hero-receptionist.png";

const HERO_IMG = heroReceptionist;
const CARD_IMG_RECEPTIONIST = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80";
const CARD_IMG_TEAM = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";

// ─── Glass utility styles (scoped to this page) ───────────────────────────────
const glass =
  "bg-white/[0.16] backdrop-blur-2xl border border-white/40 shadow-[0_20px_40px_rgba(80,60,140,0.12),inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-1px_0_rgba(255,255,255,0.2)]";
const glassStrong =
  "bg-white/[0.24] backdrop-blur-xl border border-white/40";
const liftCard =
  "transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-500/50 hover:shadow-[0_30px_60px_rgba(80,60,140,0.18),inset_0_1px_0_rgba(255,255,255,0.85)]";

// ─── Ink colours as Tailwind-safe inline styles ────────────────────────────────
const ink     = "#1A1A2E";
const inkMid  = "rgba(26,26,46,0.65)";
const inkFaint= "rgba(26,26,46,0.45)";

// ─── Sub-components ────────────────────────────────────────────────────────────

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "linear-gradient(95deg,#FF2D7B 0%,#A855F7 35%,#00B3E5 70%,#007BFF 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${glassStrong} rounded-full pl-2 pr-4 py-1.5 text-xs sm:text-sm font-medium`}
      style={{ color: "rgba(26,26,46,0.75)" }}
    >
      {children}
    </span>
  );
}

// ─── Feature cards data ────────────────────────────────────────────────────────

const FEATURE_CARDS = [
  {
    icon: <PhoneCall className="w-5 h-5" style={{ color: "#FF2D7B" }} />,
    title: "AI Receptionist",
    body: "Answers every call, captures context, and routes or resolves — in your tone, 24/7.",
    tags: ["Live answering", "70+ languages"],
    accent: "rgba(255,45,123,0.3)",
    span: "md:row-span-2",
    image: CARD_IMG_RECEPTIONIST,
  },
  {
    icon: <Zap className="w-5 h-5" style={{ color: "#00E5FF" }} />,
    title: "Auto Follow-Up",
    body: "SMS and email follow-ups triggered automatically after every missed or resolved call.",
    tags: [],
    accent: "rgba(0,229,255,0.35)",
    span: "",
    image: null,
  },
  {
    icon: <BarChart2 className="w-5 h-5" style={{ color: "#A855F7" }} />,
    title: "Call Analytics",
    body: "Conversation summaries, resolution rates, and trend data — per rep, per day, per campaign.",
    tags: [],
    accent: "rgba(168,85,247,0.3)",
    span: "",
    image: null,
  },
  {
    icon: <Users className="w-5 h-5" style={{ color: "#007BFF" }} />,
    title: "Team Inbox",
    body: "Every call, text, and voicemail in a shared inbox. Assign, comment, and close as a team.",
    tags: ["Shared queue", "Task assignment"],
    accent: "rgba(0,123,255,0.3)",
    span: "md:col-span-2",
    image: CARD_IMG_TEAM,
  },
] as const;

// ─── Social proof logos (text stand-ins) ──────────────────────────────────────
const LOGOS = [
  "Dental Group", "HVAC Pro", "LegalEdge", "RealtyHub", "MedSpa360",
  "HotelierAI", "HomeFix", "VetCare+", "InsureLink", "PropDesk",
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "We were missing 40% of our inbound calls. 1st Impressions fixed that in the first week.",
    name: "Dr. Marcus R.",
    role: "Owner · Riverside Dental",
    initials: "MR",
  },
  {
    quote: "The AI answers like a trained receptionist. Our patients can't tell the difference.",
    name: "Sarah M.",
    role: "Office Manager · Bright Smiles",
    initials: "SM",
  },
  {
    quote: "Best investment in our business. The AI answers at 2 AM when clients need us most. Worth every dollar.",
    name: "Jake T.",
    role: "Founder · FastFix HVAC",
    initials: "JT",
  },
];

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg,#F4F1FF 0%,#FFF1F5 40%,#F0F7FF 100%)",
        fontFamily: "'Inter', system-ui, sans-serif",
        color: ink,
      }}
    >
      {/* ── Ambient blob mesh ────────────────────────────────────────────── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full animate-[blob_18s_ease-in-out_infinite]"
          style={{ background: "#FFB6D9", width: "42vw", height: "42vw", top: "-10vw", left: "-5vw", filter: "blur(90px)", opacity: 0.65 }}
        />
        <div
          className="absolute rounded-full animate-[blob_22s_ease-in-out_infinite_reverse]"
          style={{ background: "#B5D8FF", width: "48vw", height: "48vw", top: "18vw", right: "-12vw", filter: "blur(90px)", opacity: 0.65 }}
        />
        <div
          className="absolute rounded-full animate-[blob_26s_ease-in-out_infinite]"
          style={{ background: "#C7F0E0", width: "40vw", height: "40vw", bottom: "-12vw", left: "20vw", filter: "blur(90px)", opacity: 0.65 }}
        />
        <div
          className="absolute rounded-full animate-[blob_18s_ease-in-out_infinite]"
          style={{ background: "#E0CCFF", width: "32vw", height: "32vw", top: "55vw", left: "-8vw", filter: "blur(90px)", opacity: 0.65 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0) 35%, rgba(244,241,255,0.6) 100%)" }}
        />
      </div>

      {/* ────────────────────────────────────────────────────────────────────
          HERO
      ──────────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 px-4 sm:px-6">
        <div
          className="absolute inset-0 -z-[1] overflow-hidden pointer-events-none"
          aria-hidden
        >
          <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 30%, rgba(168,85,247,0.15), transparent 70%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start mb-8 animate-[float_6s_ease-in-out_infinite]">
              <Badge>
                <span className="w-5 h-5 rounded-full" style={{ background: "linear-gradient(135deg,#FF2D7B,#00E5FF)" }} />
                AI Receptionist for Small Teams · From $39.95/mo
              </Badge>
            </div>

            <h1
              className="font-extrabold leading-[0.96] tracking-tight mb-6"
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                color: ink,
              }}
            >
              <span style={{ opacity: 0.8 }}>EVERY CALL.</span>
              <br />
              <GradientText>EVERY CUSTOMER.</GradientText>
            </h1>

            <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed" style={{ color: inkMid }}>
              AI answers your calls, summarizes every conversation, and follows up with your team — automatically. Plans starting at $39.95/month.
            </p>

            {/* 3-beat rhythm */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-5 mb-8 text-sm font-semibold" style={{ color: ink }}>
              <span>Answer.</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#007BFF" }} />
              <span>Summarize.</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#007BFF" }} />
              <span>Follow up.</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <Link
                to="/pricing"
                className="group inline-flex items-center gap-2 text-white font-semibold pl-6 pr-5 py-4 rounded-full text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "#007BFF", boxShadow: "0 12px 40px rgba(0,123,255,0.4)" }}
              >
                Start Answering Calls
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/demo"
                className={`inline-flex items-center gap-2 font-medium px-6 py-4 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5 ${glass}`}
                style={{ color: ink }}
              >
                <span className="w-7 h-7 rounded-full bg-white/60 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 ml-0.5" style={{ color: ink }} fill={ink} />
                </span>
                Book a demo
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs" style={{ color: inkFaint }}>
              {["Plans from $39.95/mo", "No setup fees", "Cancel anytime"].map((t, i, arr) => (
                <span key={t} className="flex items-center gap-2">
                  {t}
                  {i < arr.length - 1 && <span className="w-1 h-1 rounded-full" style={{ background: inkFaint }} />}
                </span>
              ))}
            </div>
          </div>

          {/* Right — dashboard in glass frame */}
          <div className="relative hidden lg:block">
            <div
              className={`${glass} relative rounded-[2rem] p-3 overflow-hidden animate-[float_6s_ease-in-out_infinite]`}
              style={{ ["--glass-bg" as string]: "rgba(255,255,255,0.14)" }}
            >
              {/* Specular top edge */}
              <div
                className="absolute inset-0 rounded-[2rem] pointer-events-none z-10"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%)",
                  mixBlendMode: "screen",
                  opacity: 0.7,
                }}
              />
              {/* ── Hero video (replace /public/hero.mp4 to activate) ── */}
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={HERO_IMG}
                className="w-full rounded-[1.5rem] object-cover"
                style={{ height: 480, objectPosition: "top" }}
              >
                <source src="/hero.mp4" type="video/mp4" />
                {/* Fallback image shown until video loads or if unsupported */}
                <img
                  src={HERO_IMG}
                  alt="1st Impressions AI receptionist — professional at work"
                  className="w-full rounded-[1.5rem] object-cover"
                  style={{ height: 480, objectPosition: "top" }}
                />
              </video>

              {/* Floating chip — calls answered */}
              <div className={`absolute top-6 right-6 ${glassStrong} rounded-2xl px-4 py-3 flex items-center gap-3 z-20`}>
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(135deg,#FF2D7B,#00E5FF)" }}
                >
                  <PhoneCall className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: ink }}>AI Answering</p>
                  <p className="text-[11px]" style={{ color: inkMid }}>47 calls handled today</p>
                </div>
              </div>

              {/* Floating chip — resolution */}
              <div className={`absolute bottom-6 right-6 ${glassStrong} rounded-2xl px-4 py-3 z-20`}>
                <p className="text-[11px]" style={{ color: inkMid }}>Resolution rate</p>
                <p
                  className="font-extrabold text-2xl"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    background: "linear-gradient(95deg,#FF2D7B,#A855F7,#007BFF)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  94%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs" style={{ color: inkFaint }}>
          <span>Scroll</span>
          <span className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${inkFaint}, transparent)` }} />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          LOGO MARQUEE STRIP
      ──────────────────────────────────────────────────────────────────── */}
      <section className="relative py-10 overflow-hidden">
        <div className={`${glass} border-x-0 py-5`}>
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: inkFaint }}>
            Trusted by teams at
          </p>
          <div className="flex overflow-hidden">
            <div className="flex gap-12 shrink-0 animate-[marquee_30s_linear_infinite] items-center">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span
                  key={i}
                  className="font-semibold text-sm shrink-0 px-3"
                  style={{ color: "rgba(26,26,46,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.01em" }}
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          FEATURE GRID
      ──────────────────────────────────────────────────────────────────── */}
      <section id="features" className="relative px-4 sm:px-6 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#007BFF" }}>
                The Platform
              </p>
              <h2
                className="font-extrabold leading-tight text-4xl sm:text-5xl"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: ink }}
              >
                14 features.{" "}
                <GradientText>One plan per business.</GradientText>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed" style={{ color: inkMid }}>
              No feature walls. No per-minute billing. Every plan gets every capability — AI answering, analytics, follow-up, inbox, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Hero tall card */}
            <article
              className={`${glass} ${liftCard} relative rounded-3xl p-0 md:row-span-2 flex flex-col overflow-hidden cursor-pointer`}
            >
              <div className="relative h-56 md:h-72 overflow-hidden">
                <img
                  src={CARD_IMG_RECEPTIONIST}
                  alt="AI Receptionist dashboard"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)" }} />
              </div>
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className={`inline-flex w-11 h-11 rounded-2xl ${glassStrong} items-center justify-center mb-5`}>
                    <PhoneCall className="w-5 h-5" style={{ color: "#FF2D7B" }} />
                  </span>
                  <h3 className="font-bold text-2xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: ink }}>
                    AI Receptionist
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: inkMid }}>
                    Answers every call, captures context, and routes or resolves — in your tone, 24/7. Supports 70+ languages out of the box.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-6 text-xs" style={{ color: "rgba(26,26,46,0.6)" }}>
                  <span className="px-2.5 py-1 rounded-full bg-white/60">24/7 coverage</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/60">70+ languages</span>
                </div>
              </div>
            </article>

            {/* Auto Follow-Up card */}
            <article className={`${glass} ${liftCard} relative rounded-3xl p-6 overflow-hidden cursor-pointer`}>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(0,229,255,0.35)" }} />
              <span className={`inline-flex w-11 h-11 rounded-2xl ${glassStrong} items-center justify-center mb-4`}>
                <Zap className="w-5 h-5" style={{ color: "#00B8D9" }} />
              </span>
              <h3 className="font-bold text-xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: ink }}>
                Auto Follow-Up
              </h3>
              <p className="text-sm" style={{ color: inkMid }}>
                SMS and email sent automatically after every missed or resolved call. Zero manual work.
              </p>
            </article>

            {/* Call Analytics card */}
            <article className={`${glass} ${liftCard} relative rounded-3xl p-6 overflow-hidden cursor-pointer`}>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(168,85,247,0.3)" }} />
              <span className={`inline-flex w-11 h-11 rounded-2xl ${glassStrong} items-center justify-center mb-4`}>
                <BarChart2 className="w-5 h-5" style={{ color: "#A855F7" }} />
              </span>
              <h3 className="font-bold text-xl mb-1" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: ink }}>
                Call Analytics
              </h3>
              <p className="text-sm" style={{ color: inkMid }}>
                Conversation summaries, resolution rates, and trend data — per rep, per day, per campaign.
              </p>
            </article>

            {/* Team Inbox card — wide */}
            <article className={`${glass} ${liftCard} relative rounded-3xl p-7 md:col-span-2 overflow-hidden flex flex-col sm:flex-row sm:items-center gap-6 cursor-pointer`}>
              <div className="absolute -left-10 -top-10 w-52 h-52 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(0,123,255,0.3)" }} />
              <div className="relative flex-1">
                <span className={`inline-flex w-11 h-11 rounded-2xl ${glassStrong} items-center justify-center mb-4`}>
                  <Users className="w-5 h-5" style={{ color: "#007BFF" }} />
                </span>
                <h3 className="font-bold text-2xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: ink }}>
                  Shared Team Inbox
                </h3>
                <p className="text-sm max-w-md" style={{ color: inkMid }}>
                  Every call, text, and voicemail in one place. Assign tickets, leave notes, and close conversations as a team.
                </p>
                <div className="flex gap-2 mt-5">
                  <span className="px-2.5 py-1 rounded-full bg-white/60 text-xs" style={{ color: "rgba(26,26,46,0.6)" }}>Shared queue</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/60 text-xs" style={{ color: "rgba(26,26,46,0.6)" }}>Task assignment</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/60 text-xs" style={{ color: "rgba(26,26,46,0.6)" }}>Internal notes</span>
                </div>
              </div>
            </article>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/features"
              className={`inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm ${glass} transition-all duration-200 hover:-translate-y-0.5`}
              style={{ color: ink }}
            >
              See all 14 features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          PERSONALITY TEASER
      ──────────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge>
                <Mic className="w-3.5 h-3.5" style={{ color: "#FF2D7B" }} />
                Personality Pack · Included in Pro
              </Badge>
              <h2
                className="font-extrabold text-4xl sm:text-5xl leading-tight mt-6 mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: ink }}
              >
                Your AI should sound like{" "}
                <GradientText>your business.</GradientText>
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: inkMid }}>
                Choose from 5 distinct voices — from the warm Southern Belle to the no-nonsense East Coaster. Each personality gets its own greeting, handoff script, and follow-up tone.
              </p>
              <Link
                to="/personalities"
                className="inline-flex items-center gap-2 text-white font-semibold pl-6 pr-5 py-4 rounded-full text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "#007BFF", boxShadow: "0 12px 40px rgba(0,123,255,0.4)" }}
              >
                Explore all personalities
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {PERSONALITIES.map((p) => (
                <Link
                  key={p.id}
                  to="/personalities"
                  className={`${glass} ${liftCard} rounded-2xl p-4 text-center`}
                  style={{ border: "1px solid rgba(255,255,255,0.45)" }}
                >
                  <div className="text-3xl mb-2">{p.emoji}</div>
                  <div className="font-semibold text-xs leading-tight" style={{ color: ink }}>
                    {p.name.replace("The ", "")}
                  </div>
                  <div className="text-[10px] mt-1 leading-tight" style={{ color: inkFaint }}>
                    {p.tagline.split(",")[0]}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          TESTIMONIALS
      ──────────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "#007BFF" }}>
              Social Proof
            </p>
            <h2
              className="font-extrabold text-4xl sm:text-5xl"
              style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: ink }}
            >
              Real results. <GradientText>Real teams.</GradientText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className={`${glass} ${liftCard} rounded-3xl p-7 flex flex-col justify-between`}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="#007BFF"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic flex-1 mb-6" style={{ color: inkMid }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#FF2D7B,#007BFF)" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: ink }}>{t.name}</div>
                    <div className="text-xs" style={{ color: inkFaint }}>{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          PRICING TEASER
      ──────────────────────────────────────────────────────────────────── */}
      <section id="pricing" className="px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto">
          <div className={`${glass} rounded-[2.5rem] p-10 lg:p-14 text-center relative overflow-hidden`}>
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(0,123,255,0.2)" }} />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(255,45,123,0.15)" }} />
            <div className="relative">
              <Badge>
                <Zap className="w-3.5 h-3.5" style={{ color: "#007BFF" }} />
                Simple pricing
              </Badge>
              <h2
                className="font-extrabold mt-6 mb-4 text-4xl sm:text-5xl leading-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: ink }}
              >
                Plans from $39.95.{" "}
                <GradientText>Voice minutes, not seats.</GradientText>
              </h2>
              <p className="max-w-xl mx-auto text-base leading-relaxed mb-10" style={{ color: inkMid }}>
                No feature walls, no per-minute billing. Every plan includes AI answering, analytics, follow-up, team inbox, and all 5 personalities.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                {[
                  "Plans from $39.95/mo",
                  "No setup fees",
                  "Cancel anytime",
                  "Non-expiring top-off packs",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5 text-sm" style={{ color: inkMid }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#007BFF" }} />
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 text-white font-semibold pl-7 pr-6 py-4 rounded-full text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: "#007BFF", boxShadow: "0 12px 40px rgba(0,123,255,0.4)" }}
                >
                  See plans & pricing
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/demo"
                  className={`inline-flex items-center gap-2 font-medium px-7 py-4 rounded-full text-base transition-all duration-200 hover:-translate-y-0.5 ${glass}`}
                  style={{ color: ink }}
                >
                  Book a demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          FINAL CTA
      ──────────────────────────────────────────────────────────────────── */}
      <section id="cta" className="px-4 sm:px-6 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#007BFF 0%,#A855F7 50%,#FF2D7B 100%)",
              boxShadow: "0 40px 80px rgba(0,123,255,0.35)",
            }}
          >
            {/* Inner glass overlay */}
            <div
              className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
              style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)" }}
            />
            <div className="relative">
              <h2
                className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5"
                style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
              >
                Every call answered.
                <br />
                Every customer remembered.
              </h2>
              <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Your AI receptionist is live in under 5 minutes. Plans from $39.95/month.
              </p>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 bg-white font-bold pl-8 pr-6 py-5 rounded-full text-base transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                style={{ color: "#007BFF", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              >
                Start Answering Calls
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
