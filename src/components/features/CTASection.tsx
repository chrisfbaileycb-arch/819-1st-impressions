import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  headline?: string;
  sub?: string;
}

export default function CTASection({
  headline = "Every customer conversation in one place.",
  sub = "Answer, summarize, and follow up — automatically. Plans from $39.95/month. No setup fees.",
}: CTASectionProps) {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-500/6 via-purple-600/4 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
          {headline}
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">{sub}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/pricing"
            className="btn-primary text-base px-8 py-4 shadow-xl shadow-brand-500/20"
          >
            Start Answering Calls
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/features" className="btn-secondary text-base px-8 py-4">
            See all 14 features
          </Link>
        </div>

        {/* Inline pricing note */}
        <p className="text-slate-500 text-sm mt-6">
          From $39.95/mo · No setup fees · Cancel anytime
        </p>
      </div>
    </section>
  );
}
