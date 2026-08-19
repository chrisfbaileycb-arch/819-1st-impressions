import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const PROOF_POINTS = [
  "Plans from $39.95/month",
  "No setup fees",
  "Cancel anytime",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Glow */}
      <div className="hero-glow animate-glow-pulse" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,126,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(79,126,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section-container relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/12 border border-brand-500/25 text-brand-300 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          AI Receptionist for Small Teams
        </div>

        {/* H1 */}
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] tracking-tight mb-6 animate-fade-up">
          Every customer{" "}
          <br className="hidden sm:block" />
          <span className="brand-gradient-text">conversation</span>
          <br className="hidden sm:block" />
          in one place.
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
          AI answers your calls, summarizes every conversation, and follows up with your team — automatically. Starting at $39.95/month.
        </p>

        {/* 3-beat rhythm */}
        <div className="flex items-center justify-center gap-3 mb-10 text-slate-300 text-sm font-medium animate-fade-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
          <span>Answer.</span>
          <span className="w-1 h-1 rounded-full bg-brand-500" />
          <span>Summarize.</span>
          <span className="w-1 h-1 rounded-full bg-brand-500" />
          <span>Follow up.</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <Link to="/pricing" className="btn-primary text-base px-8 py-4 shadow-xl shadow-brand-500/20">
            Start Answering Calls
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/features" className="btn-secondary text-base px-8 py-4 gap-2">
            <Play className="w-4 h-4 text-brand-400" />
            See all 14 features
          </Link>
        </div>

        {/* Proof points */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500 animate-fade-up" style={{ animationDelay: "0.25s", opacity: 0 }}>
          {PROOF_POINTS.map((point) => (
            <span key={point} className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-brand-500" />
              {point}
            </span>
          ))}
        </div>

        {/* Dashboard preview */}
        <div className="relative mt-16 max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: "0.35s", opacity: 0 }}>
          {/* Glow behind image */}
          <div className="absolute -inset-4 bg-brand-500/10 rounded-3xl blur-2xl" />
          <div className="relative rounded-2xl overflow-hidden border border-white/12 shadow-2xl shadow-black/60">
            <img
              src={heroDashboard}
              alt="1st Impressions AI receptionist dashboard showing call management and conversation inbox"
              className="w-full h-auto object-cover"
              loading="eager"
            />
            {/* Overlay gradient bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060B18] to-transparent" />
          </div>

          {/* Floating stat cards */}
          <div className="absolute -left-4 top-1/3 glass-card px-4 py-3 hidden lg:block shadow-xl">
            <div className="text-xs text-slate-400 mb-1">Calls answered today</div>
            <div className="text-2xl font-display font-bold text-white">47</div>
            <div className="text-xs text-green-400 mt-0.5">↑ 12 vs yesterday</div>
          </div>
          <div className="absolute -right-4 top-1/2 glass-card px-4 py-3 hidden lg:block shadow-xl">
            <div className="text-xs text-slate-400 mb-1">Resolution rate</div>
            <div className="text-2xl font-display font-bold text-white">94%</div>
            <div className="text-xs text-brand-400 mt-0.5">AI handled</div>
          </div>
        </div>
      </div>
    </section>
  );
}
