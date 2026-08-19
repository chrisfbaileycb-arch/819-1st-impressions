import { Link } from "react-router-dom";
import { ArrowRight, Stethoscope, Thermometer, Scale, Home, BedDouble, Sparkles } from "lucide-react";
import { INDUSTRIES } from "@/constants";
import type { LucideProps } from "lucide-react";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Stethoscope, Thermometer, Scale, Home, BedDouble, Sparkles,
};

export default function IndustriesSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="numbered-label mb-3">Built for your industry</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            For small teams that need a lighter helpdesk.
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Pre-configured AI scripts and workflows for the industries where phone calls still run the business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry, index) => {
            const Icon = iconMap[industry.icon] ?? Home;
            return (
              <Link
                key={industry.id}
                to="/solutions"
                className={`group relative overflow-hidden rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5 ${
                  index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-[#060B18]/60 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 rounded-xl bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 bg-[#0D1530]">
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">
                    {industry.name}
                  </div>
                  <h3 className="font-display font-bold text-white text-lg leading-snug mb-2">
                    {industry.tagline}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {industry.description}
                  </p>
                  <span className="flex items-center gap-1.5 text-brand-400 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/solutions" className="btn-secondary text-sm px-6 py-3">
            See all 18 industry solutions
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
