import { useState } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { ArrowRight, Copy, Check, Smartphone, Bot, Building, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import CTASection from "@/components/features/CTASection";

// ─── Data ────────────────────────────────────────────────────────────────────
const PLAYBOOKS = [
  {
    id: "missed-call",
    emoji: "📞",
    gradientFrom: "from-blue-600/10",
    gradientTo: "to-blue-900/5",
    border: "border-blue-500/25",
    accent: "text-blue-400",
    badgeBg: "bg-blue-500/15 border-blue-500/30 text-blue-300",
    badge: "Always On",
    title: "Missed Call Follow-Up",
    trigger: "A caller hangs up without speaking, or a call arrives with no one available to answer.",
    sms: "Hey [Name] — sorry we missed your call! This is [AI Name] from [Business]. What can we help you with? Reply here anytime or call us back at [number].",
    aiInstruction: `When a call disconnects unanswered or drops to voicemail:
1. Wait 90 seconds, then send the missed-call SMS template.
2. Use the caller's first name from Contacts if available.
3. Log a "missed call — followed up" note in the inbox with timestamp.
4. If the caller responds to the SMS, treat it as a warm inbound conversation — carry full context.
5. No reply after 4 hours → mark as closed unless they call back.`,
  },
  {
    id: "after-hours",
    emoji: "🌙",
    gradientFrom: "from-indigo-600/10",
    gradientTo: "to-indigo-900/5",
    border: "border-indigo-500/25",
    accent: "text-indigo-400",
    badgeBg: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
    badge: "After Hours",
    title: "After-Hours AI Coverage",
    trigger: "A call or message arrives outside the business hours set in your agent's schedule.",
    sms: "Hi [Name]! Our office is closed right now, but I can help. This is [AI Name] from [Business]. What do you need? I'll make sure the right person sees this first thing tomorrow.",
    aiInstruction: `When a call arrives outside your online schedule:
1. Greet with the after-hours voice script — never say "we're closed," say "our team is offline right now."
2. Answer questions from the knowledge base. Most inquiries resolve without a human.
3. If the caller needs a callback: collect name, phone number, and best callback window.
4. Create a "after-hours callback request" task — visible to the team when they come online.
5. For urgent issues (use judgment — injuries, active incidents): offer the emergency transfer number.`,
  },
  {
    id: "appointment-reminder",
    emoji: "📅",
    gradientFrom: "from-emerald-600/10",
    gradientTo: "to-emerald-900/5",
    border: "border-emerald-500/25",
    accent: "text-emerald-400",
    badgeBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    badge: "Proactive",
    title: "Appointment Reminder",
    trigger: "24 hours before a scheduled appointment in your calendar.",
    sms: "Hi [Name] — reminder: you have an appointment at [Business] tomorrow at [Time]. Reply Y to confirm or N to reschedule. We'll hold your spot until 8PM today.",
    aiInstruction: `24 hours before a booked appointment:
1. Send the reminder SMS automatically via the Outbound queue.
2. Reply Y → mark appointment as "confirmed" in the calendar and log the confirmation.
3. Reply N → open a rescheduling flow: "No problem! Here are 3 available slots: [A], [B], [C]. Which works?"
4. No reply after 2 hours → send one follow-up: "Just checking — did you get our reminder?"
5. No reply to follow-up → flag the slot as "unconfirmed" for the team to review.`,
  },
  {
    id: "warm-lead",
    emoji: "🔥",
    gradientFrom: "from-orange-600/10",
    gradientTo: "to-orange-900/5",
    border: "border-orange-500/25",
    accent: "text-orange-400",
    badgeBg: "bg-orange-500/15 border-orange-500/30 text-orange-300",
    badge: "Sales",
    title: "Warm Lead Callback",
    trigger: "A new lead arrives via web form, chat widget, or missed call from an unknown number.",
    sms: "Hi [Name] — saw your interest in [Service] at [Business]. I'm [AI Name]. I can answer questions right now or book you a time with our team. What works for you?",
    aiInstruction: `When a new lead is received:
1. Call or text within 5 minutes — response rates drop 10x after that window.
2. Qualify with exactly three questions (in order):
   — "What service are you looking for?"
   — "What's your timeline?"
   — "Do you have a budget in mind?"
3. Hot lead (clear need + timeline): book a consultation directly.
4. Warm lead (interest, no timeline): send follow-up resources and schedule a check-in call in 3 days.
5. Cold lead: log and add to the nurture sequence.
6. Always log lead score (hot / warm / cold) in the contact record.`,
  },
];

const CHECKLIST_ITEMS = [
  {
    category: "Workspace",
    icon: Building,
    color: "text-brand-400",
    bg: "bg-brand-500/10 border-brand-500/20",
    items: [
      "Account created and email verified",
      "Team members invited and roles assigned",
      "Business phone number purchased and assigned",
    ],
  },
  {
    category: "AI Setup",
    icon: Bot,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    items: [
      "Agent created with personality selected",
      "Knowledge base uploaded (FAQ, services, pricing, hours)",
      "Handoff schedule and transfer number configured",
    ],
  },
  {
    category: "Mobile App",
    icon: Smartphone,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    items: [
      "1st Impressions app downloaded on your phone",
      "Push notifications enabled for new conversations",
      "Test call placed, reviewed, and agent response approved",
    ],
  },
  {
    category: "Customer Follow-Up",
    icon: Users,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    items: [
      "Missed-call playbook activated and tested",
      "After-hours AI coverage confirmed for off-schedule times",
      "First real follow-up SMS sent and response reviewed",
    ],
  },
];

// ─── Copy Button ──────────────────────────────────────────────────────────────
function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed — please select and copy manually.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 px-2 py-1 rounded-lg min-h-[32px]",
        copied
          ? "text-green-400 bg-green-500/10"
          : "text-slate-500 hover:text-slate-300 hover:bg-white/6"
      )}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// ─── Code block ───────────────────────────────────────────────────────────────
function CodeBlock({ label, content }: { label: string; content: string }) {
  return (
    <div className="bg-black/30 rounded-xl overflow-hidden border border-white/8">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/8">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        <CopyButton text={content} />
      </div>
      <pre className="px-4 py-4 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-words">
        {content}
      </pre>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PlaybooksPage() {
  return (
    <main className="pt-20">
      <PageMeta
        title="AI Call Playbooks"
        description="4 proven AI call playbooks for small businesses: missed call follow-up, after-hours coverage, appointment reminders, and warm lead callbacks. Copy-paste scripts included."
        canonical="/playbooks"
      />
      {/* ── Hero ── */}
      <section className="section-padding pb-14 relative overflow-hidden">
        <div className="hero-glow opacity-30" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <p className="numbered-label mb-4">Playbooks</p>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            Four playbooks.{" "}
            <span className="brand-gradient-text">Zero guesswork.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-8">
            Copy-paste SMS scripts and AI instructions for the four situations every small business phone handles every day. Built for your first week and every week after.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/agent-builder" className="btn-primary px-8 py-4">
              Build your agent free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className="btn-secondary px-8 py-4">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4 Playbooks ── */}
      <section className="section-padding pt-4 border-t border-white/6">
        <div className="section-container">
          <div className="space-y-8 max-w-4xl mx-auto">
            {PLAYBOOKS.map((pb, i) => (
              <div
                key={pb.id}
                className={cn(
                  "rounded-3xl border p-8 lg:p-10 bg-gradient-to-br",
                  pb.gradientFrom, pb.gradientTo, pb.border
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{pb.emoji}</div>
                    <div>
                      <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full border", pb.badgeBg)}>
                        {pb.badge}
                      </span>
                      <h2 className="font-display font-bold text-white text-xl mt-2">
                        {pb.title}
                      </h2>
                    </div>
                  </div>
                  <span className={cn("font-mono text-sm font-bold", pb.accent)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Trigger */}
                <div className="mb-6 p-4 rounded-xl bg-white/4 border border-white/8">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Trigger</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{pb.trigger}</p>
                </div>

                {/* Code blocks */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <CodeBlock label="SMS Script" content={pb.sms} />
                  <CodeBlock label="AI Instruction" content={pb.aiInstruction} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── First-Day Launch Checklist ── */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="numbered-label mb-3">First-Day Checklist</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Ready in under an hour.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Four readiness zones. Check every box before your first customer call and your AI has everything it needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {CHECKLIST_ITEMS.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.category} className="glass-card p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border", section.bg)}>
                      <Icon className={cn("w-4 h-4", section.color)} />
                    </div>
                    <h3 className="font-display font-bold text-white text-base">
                      {section.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded border-2 border-white/15 bg-white/4 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        </div>
                        <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/agent-builder" className="btn-primary px-8 py-4 text-base">
              Start building your agent <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
