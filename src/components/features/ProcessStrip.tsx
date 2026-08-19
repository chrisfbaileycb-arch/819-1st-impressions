import { Phone, Settings, Mic, CheckCircle } from "lucide-react";
import { PROCESS_STEPS } from "@/constants";
import type { LucideProps } from "lucide-react";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Phone,
  Settings,
  Mic,
  CheckCircle,
};

export default function ProcessStrip() {
  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="numbered-label mb-3">How it works</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Up and running in four steps.
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No IT department required. Most teams are live in under an hour.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = iconMap[step.icon] ?? Phone;
            return (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-1rem)] w-8 h-px bg-gradient-to-r from-brand-500/40 to-brand-500/10 z-10" />
                )}

                <div className="glass-card-hover p-6">
                  {/* Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs font-bold text-brand-500/60 tracking-widest">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-500/12 border border-brand-500/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
