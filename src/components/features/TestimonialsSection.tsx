import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants";

export default function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="numbered-label mb-3">What they're saying.</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            Small teams, real results.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`glass-card-hover p-7 ${i === 0 ? "md:col-span-2" : ""}`}
            >
              <Quote className="w-6 h-6 text-brand-500/40 mb-4" />
              <p className="text-slate-200 text-lg leading-relaxed mb-6 font-medium">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-white text-sm font-bold">
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.author}</div>
                  <div className="text-slate-500 text-xs">
                    {t.role} · {t.industry}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
