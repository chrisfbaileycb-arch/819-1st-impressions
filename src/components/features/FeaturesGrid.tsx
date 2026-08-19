import {
  Phone, Inbox, Brain, PhoneOutgoing, BarChart3, Bot,
  BookOpen, Users, Languages, FileText, Plug, Smartphone,
  MessageSquare, PhoneCall,
} from "lucide-react";
import { FEATURES } from "@/constants";
import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";

type IconComponent = React.FC<LucideProps>;

const iconMap: Record<string, IconComponent> = {
  Phone, Inbox, Brain, PhoneOutgoing, BarChart3, Bot,
  BookOpen, Users, Languages, FileText, Plug, Smartphone,
  MessageSquare, PhoneCall,
};

interface FeaturesGridProps {
  limit?: number;
  showAll?: boolean;
}

export default function FeaturesGrid({ limit, showAll = false }: FeaturesGridProps) {
  const features = limit ? FEATURES.slice(0, limit) : FEATURES;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {features.map((feature, index) => {
        const Icon = iconMap[feature.icon] ?? Phone;
        const isHighlighted = feature.highlighted;

        return (
          <div
            key={feature.id}
            className={cn(
              "relative group rounded-2xl p-6 border transition-all duration-300 cursor-pointer",
              isHighlighted
                ? "bg-gradient-card border-brand-500/30 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10"
                : "bg-white/4 border-white/8 hover:bg-white/7 hover:border-white/15 hover:shadow-md hover:shadow-black/20",
              // Make first highlighted card span 2 cols on lg
              index === 0 ? "lg:col-span-2" : ""
            )}
          >
            {feature.badge && (
              <span className="absolute top-4 right-4 badge-brand text-[10px] px-2 py-0.5">
                {feature.badge}
              </span>
            )}

            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                isHighlighted
                  ? "bg-brand-500/20 border border-brand-500/30"
                  : "bg-white/6 border border-white/10"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isHighlighted ? "text-brand-400" : "text-slate-400 group-hover:text-slate-300"
                )}
              />
            </div>

            <h3
              className={cn(
                "font-display font-semibold text-base mb-2",
                isHighlighted ? "text-white" : "text-slate-200"
              )}
            >
              {feature.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
