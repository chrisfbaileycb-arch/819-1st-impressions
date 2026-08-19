import { AlertCircle, CheckCircle2 } from "lucide-react";
import { PAIN_POINTS } from "@/constants";

export default function PainSolutionSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Sound familiar? */}
          <div className="mb-20">
            <p className="numbered-label mb-3 text-center">Sound familiar?</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white text-center mb-12">
              The problems every small team runs into.
            </h2>

            <div className="space-y-4">
              {PAIN_POINTS.map((item) => (
                <div
                  key={item.label}
                  className="glass-card p-6 border-l-2 border-l-red-500/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mt-0.5">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-red-400/60 tracking-widest font-semibold">
                        {item.label}
                      </span>
                      <p className="text-slate-200 font-medium text-lg mt-1 leading-snug">
                        "{item.pain}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Built to fix exactly that */}
          <div>
            <div className="text-center mb-12">
              <p className="numbered-label mb-3">Built to fix exactly that.</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Three answers, not three more problems.
              </h2>
            </div>

            <div className="space-y-4">
              {PAIN_POINTS.map((item) => (
                <div
                  key={item.label}
                  className="glass-card p-6 border-l-2 border-l-brand-500/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-400" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-brand-400/60 tracking-widest font-semibold">
                        {item.label}
                      </span>
                      <p className="text-slate-200 text-lg mt-1 leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
