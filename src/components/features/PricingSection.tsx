import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { PRICING } from "@/constants";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  compact?: boolean;
}

export default function PricingSection({ compact = false }: PricingSectionProps) {
  return (
    <div className={cn("section-container", !compact && "section-padding")}>
      {!compact && (
        <div className="text-center mb-14">
          <p className="numbered-label mb-3">Pricing</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            Free for one person. $19.90 per extra seat.
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No feature walls inside Pro — you buy seats, not tiers. Every Pro seat gets all features.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PRICING.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative rounded-2xl p-7 border flex flex-col",
              tier.highlighted
                ? "bg-gradient-to-b from-brand-500/12 to-purple-600/8 border-brand-500/40 shadow-xl shadow-brand-500/10"
                : "bg-white/4 border-white/10"
            )}
          >
            {tier.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="badge-brand px-4 py-1 text-xs font-bold shadow-lg shadow-brand-500/20">
                  {tier.badge}
                </span>
              </div>
            )}

            <div className="mb-6">
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">
                {tier.name}
              </div>
              <div className="flex items-end gap-1 mb-3">
                {tier.price ? (
                  <>
                    <span className="font-display font-bold text-4xl text-white">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-slate-400 text-sm pb-1">{tier.period}</span>
                    )}
                  </>
                ) : (
                  <span className="font-display font-bold text-3xl text-white">Custom</span>
                )}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{tier.description}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
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

            <Link
              to="/pricing"
              className={cn(
                "w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 min-h-[44px]",
                tier.highlighted
                  ? "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 hover:-translate-y-0.5"
                  : "bg-white/8 hover:bg-white/12 text-slate-200 border border-white/12"
              )}
            >
              {tier.cta}
              {tier.highlighted && <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
        ))}
      </div>

      {!compact && (
        <p className="text-center text-slate-500 text-sm mt-8">
          Trial expiry drops you to free — tickets and history retained forever.{" "}
          <span className="text-brand-400">No data loss, no surprises.</span>
        </p>
      )}
    </div>
  );
}
