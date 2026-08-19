import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import {
  ArrowRight, ArrowLeft, Check, Copy, Download,
  RotateCcw, Sparkles, Building, FileText, Clock,
  Settings, ChevronDown, ChevronUp,
} from "lucide-react";
import { PERSONALITIES } from "@/constants";
import { useAgentBuilder } from "@/hooks/useAgentBuilder";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Personality, AgentConfig } from "@/types";

// ─── Prompt generator ─────────────────────────────────────────────────────────
function generatePrompt(config: AgentConfig, personality: Personality): string {
  const biz = config.businessName.trim() || "[Your Business]";
  const industryLine = config.industry ? `, a ${config.industry.toLowerCase()} business` : "";
  const serviceList = config.services.length ? config.services.join(", ") : "our core services";
  const hoursNote = config.hours
    ? `Business hours are: ${config.hours}.`
    : "Confirm hours with a team member if a caller asks.";
  const greeting = personality.sampleGreeting.replace(/\[Business\]/g, biz);
  const handoff = personality.sampleHandoff.replace(/\[Business\]/g, biz);
  const followup = personality.sampleFollowup.replace(/\[Business\]/g, biz);
  const customRules = config.rules
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean)
    .map((r, i) => `${i + 4}. ${r}`)
    .join("\n");

  return `# Role
You are an AI receptionist for ${biz}${industryLine}.
${config.description ? `\nAbout the business:\n${config.description}\n` : ""}
Communication style: ${personality.tone.join(", ")} — embody "${personality.name}" (${personality.tagline}).

# Tasks

## Task 1: Greet every caller
1. Open every call with: "${greeting}"
2. Listen carefully to the caller's reason for contacting.
3. Classify as: appointment request, product/service question, complaint, or general inquiry.

## Task 2: Answer questions accurately
1. Draw answers from the knowledge base only — never guess or improvise facts.
2. Key services to highlight: ${serviceList}.
3. ${hoursNote}
4. If unsure about an answer, say: "Let me connect you with someone who can confirm that for you."

## Task 3: Transfer when needed
1. Hand off callers requiring complex help with: "${handoff}"
2. Always collect the caller's name and a callback number before transferring.
3. Log a brief summary of the call before disconnecting.

## Task 4: Close every conversation
1. End every resolved call with: "${followup}"
2. If follow-up action is needed, create a task in the inbox.
3. Send a summary SMS or email if the caller opted in.

# Rules
1. Always match communication style: ${personality.tone.join(", ")}.
2. Never place a caller on hold without explaining why and giving an estimated wait time.
3. Never fabricate pricing information — defer to the knowledge base or offer a callback.
${customRules}`.trim();
}

// ─── Constants ────────────────────────────────────────────────────────────────
const INDUSTRY_OPTIONS = [
  "Dental Practice", "HVAC Company", "Law Firm", "Real Estate",
  "Hotel / Hospitality", "Med Spa", "Restaurant", "Barbershop / Salon",
  "Home Services", "Retail Store", "Automotive", "Medical Office",
  "Property Management", "Freelancer / Consultant", "Other",
];

const STEPS = [
  { number: 1, label: "Your Business", icon: Building },
  { number: 2, label: "Personality", icon: Sparkles },
  { number: 3, label: "Your Prompt", icon: FileText },
] as const;

// ─── Input component ──────────────────────────────────────────────────────────
const inputClass =
  "w-full bg-white/5 border border-white/12 hover:border-white/22 focus:border-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 transition-colors duration-200";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AgentBuilderPage() {
  const { step, config, updateConfig, nextStep, prevStep, goToStep, resetConfig } =
    useAgentBuilder();

  const [showRules, setShowRules] = useState(!!config.rules);
  const [servicesInput, setServicesInput] = useState(config.services.join(", "));
  const [copied, setCopied] = useState(false);

  const selectedPersonality =
    PERSONALITIES.find((p) => p.id === config.personalityId) ?? PERSONALITIES[4];
  const generatedPrompt = generatePrompt(config, selectedPersonality);
  const canProceedStep1 = config.businessName.trim().length > 0;

  const handleServicesBlur = () => {
    const services = servicesInput.split(",").map((s) => s.trim()).filter(Boolean);
    updateConfig({ services });
  };

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast.success("Prompt copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Copy failed — please select and copy the text manually.");
    }
  }, [generatedPrompt]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([generatedPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(config.businessName || "my-agent").toLowerCase().replace(/\s+/g, "-")}-agent-prompt.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Prompt downloaded!");
  }, [generatedPrompt, config.businessName]);

  return (
    <main className="pt-20 min-h-screen">
      <PageMeta
        title="AI Agent Builder"
        description="Build your custom AI receptionist in 3 steps. Describe your business, pick a personality, and get a ready-to-deploy AI agent prompt. Free to try — no account required."
        canonical="/agent-builder"
      />
      {/* ── Header + Step indicator ── */}
      <section className="section-padding pb-10 relative overflow-hidden">
        <div className="hero-glow opacity-30" />
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="numbered-label mb-4">Agent Builder</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight mb-4">
              Build your AI agent{" "}
              <span className="brand-gradient-text">in 3 steps.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Describe your business, pick a personality, and walk away with a
              ready-to-deploy AI receptionist prompt. Progress is saved automatically.
            </p>
          </div>

          {/* Step indicator */}
          <div className="max-w-sm mx-auto relative">
            {/* Track */}
            <div className="absolute top-5 left-8 right-8 h-px bg-white/10" />
            {/* Progress fill */}
            <div
              className="absolute top-5 left-8 right-8 h-px bg-gradient-to-r from-brand-500 to-brand-400 origin-left transition-transform duration-500"
              style={{ transform: `scaleX(${step === 1 ? 0 : step === 2 ? 0.5 : 1})` }}
            />
            {/* Circles + labels */}
            <div className="relative flex items-start justify-between">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const isCompleted = step > s.number;
                const isActive = step === s.number;
                const isClickable =
                  s.number < step ||
                  (s.number === 2 && canProceedStep1) ||
                  (s.number === 3 && canProceedStep1 && !!config.personalityId);

                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => isClickable && goToStep(s.number)}
                    disabled={!isClickable}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                        isCompleted
                          ? "bg-brand-500 border-brand-500 shadow-lg shadow-brand-500/30"
                          : isActive
                          ? "bg-brand-500/15 border-brand-500 shadow-md shadow-brand-500/20"
                          : "bg-white/4 border-white/15"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Icon
                          className={cn(
                            "w-4 h-4",
                            isActive ? "text-brand-400" : "text-slate-600"
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold tracking-wide",
                        isActive
                          ? "text-brand-400"
                          : isCompleted
                          ? "text-slate-300"
                          : "text-slate-600"
                      )}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Step content ── */}
      <section className="section-padding pt-2 pb-24">
        <div className="section-container">

          {/* ═══ Step 1: Business Details ═══ */}
          {step === 1 && (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
              <div className="glass-card p-8">
                <h2 className="font-display font-bold text-2xl text-white mb-7">
                  Tell us about your business.
                </h2>

                <div className="space-y-6">
                  {/* Business name */}
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-slate-300 mb-2">
                      Business name <span className="text-brand-500">*</span>
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      value={config.businessName}
                      onChange={(e) => updateConfig({ businessName: e.target.value })}
                      placeholder="e.g. Greenwood Dental Group"
                      className={cn(inputClass, "text-base")}
                    />
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      Industry
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INDUSTRY_OPTIONS.map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() =>
                            updateConfig({ industry: config.industry === ind ? "" : ind })
                          }
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200",
                            config.industry === ind
                              ? "bg-brand-500/20 border-brand-500/50 text-brand-300"
                              : "bg-white/4 border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200"
                          )}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-slate-300 mb-2">
                      Describe your business{" "}
                      <span className="text-slate-600 font-normal">(recommended)</span>
                    </label>
                    <textarea
                      id="description"
                      value={config.description}
                      onChange={(e) => updateConfig({ description: e.target.value })}
                      placeholder="What do you do, who are your customers, and what kinds of calls do you get most often? e.g. 'We're a family dental practice in Austin. Most calls are for scheduling and insurance questions.'"
                      rows={4}
                      className={cn(inputClass, "text-sm leading-relaxed resize-none")}
                    />
                  </div>

                  {/* Hours */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <label htmlFor="hours" className="text-sm font-semibold text-slate-300">
                        Business hours
                      </label>
                    </div>
                    <input
                      id="hours"
                      type="text"
                      value={config.hours}
                      onChange={(e) => updateConfig({ hours: e.target.value })}
                      placeholder="e.g. Mon–Fri 8AM–6PM, Sat 9AM–2PM, closed Sunday"
                      className={cn(inputClass, "text-sm")}
                    />
                  </div>

                  {/* Services */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Settings className="w-3.5 h-3.5 text-slate-500" />
                      <label htmlFor="services" className="text-sm font-semibold text-slate-300">
                        Key services{" "}
                        <span className="text-slate-600 font-normal">(comma-separated)</span>
                      </label>
                    </div>
                    <input
                      id="services"
                      type="text"
                      value={servicesInput}
                      onChange={(e) => setServicesInput(e.target.value)}
                      onBlur={handleServicesBlur}
                      placeholder="e.g. Cleanings, Fillings, Teeth Whitening, Emergency Care"
                      className={cn(inputClass, "text-sm")}
                    />
                    {config.services.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {config.services.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Custom rules — collapsible */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowRules(!showRules)}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors duration-200 py-1"
                    >
                      {showRules ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      Custom rules for your AI
                      <span className="text-xs font-normal text-slate-600">(optional)</span>
                    </button>

                    {showRules && (
                      <div className="mt-3">
                        <textarea
                          id="rules"
                          value={config.rules}
                          onChange={(e) => updateConfig({ rules: e.target.value })}
                          placeholder={"One rule per line, e.g.:\nNever quote prices over the phone — direct callers to the website\nAlways ask for the patient's date of birth when scheduling\nNever mention competitor names"}
                          rows={4}
                          className={cn(inputClass, "text-sm leading-relaxed resize-none font-mono")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={resetConfig}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200 px-3 py-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedStep1}
                  className={cn(
                    "btn-primary px-8 py-3 text-sm",
                    !canProceedStep1 && "opacity-40 cursor-not-allowed"
                  )}
                >
                  Choose Personality
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {!canProceedStep1 && (
                <p className="text-center text-slate-600 text-xs -mt-2">
                  Enter your business name to continue.
                </p>
              )}
            </div>
          )}

          {/* ═══ Step 2: Personality Picker ═══ */}
          {step === 2 && (
            <div className="max-w-5xl mx-auto animate-fade-up">
              <div className="text-center mb-10">
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                  Pick your AI's personality.
                </h2>
                <p className="text-slate-400 text-base">
                  This shapes how your agent speaks to every caller. Changeable at any time.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
                {PERSONALITIES.map((p) => {
                  const isSelected = config.personalityId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => updateConfig({ personalityId: p.id })}
                      className={cn(
                        "relative text-left rounded-2xl p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 w-full",
                        `bg-gradient-to-b ${p.color}`,
                        isSelected
                          ? `${p.borderColor} shadow-2xl`
                          : "border-white/8 hover:border-white/22"
                      )}
                    >
                      {/* Selected check */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/40">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}

                      {/* Tier badge */}
                      <div className="mb-4">
                        <span
                          className={cn(
                            "text-xs font-bold px-2 py-0.5 rounded-full border",
                            p.tier === "Standard"
                              ? "text-slate-400 border-slate-600/60 bg-slate-800/50"
                              : "text-brand-300 border-brand-500/30 bg-brand-500/10"
                          )}
                        >
                          {p.tier}
                        </span>
                      </div>

                      <div className="text-3xl mb-3">{p.emoji}</div>
                      <h3 className="font-display font-bold text-white text-sm mb-1 leading-snug">
                        {p.name}
                      </h3>
                      <p className={cn("text-xs font-medium mb-3", p.textColor)}>
                        {p.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {p.tone.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-slate-400 border border-white/6"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Sample greeting preview */}
                      <div className="bg-black/25 rounded-xl p-3">
                        <p className="text-slate-400 text-xs leading-relaxed italic line-clamp-3">
                          &ldquo;{p.sampleGreeting.replace("[Business]", config.businessName || "your business")}&rdquo;
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary text-sm px-6 py-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary text-sm px-8 py-3"
                >
                  Preview Prompt
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ═══ Step 3: Prompt Preview ═══ */}
          {step === 3 && (
            <div className="max-w-5xl mx-auto animate-fade-up">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/12 border border-green-500/25 text-green-300 text-sm font-medium mb-4">
                  <Check className="w-3.5 h-3.5" />
                  Prompt ready
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
                  Your AI agent prompt is ready.
                </h2>
                <p className="text-slate-400">
                  Copy this into Agent Builder, or download it as a .txt file.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── Sidebar ── */}
                <div className="space-y-4">

                  {/* Summary card */}
                  <div className="glass-card p-5">
                    <h3 className="font-semibold text-white text-sm mb-4">Agent summary</h3>
                    <dl className="space-y-3.5">
                      <div>
                        <dt className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Business</dt>
                        <dd className="text-slate-200 text-sm font-medium">{config.businessName || "—"}</dd>
                      </div>
                      {config.industry && (
                        <div>
                          <dt className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Industry</dt>
                          <dd className="text-slate-200 text-sm">{config.industry}</dd>
                        </div>
                      )}
                      {config.hours && (
                        <div>
                          <dt className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Hours</dt>
                          <dd className="text-slate-300 text-sm">{config.hours}</dd>
                        </div>
                      )}
                      {config.services.length > 0 && (
                        <div>
                          <dt className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Services</dt>
                          <dd className="flex flex-wrap gap-1.5">
                            {config.services.map((s) => (
                              <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300">
                                {s}
                              </span>
                            ))}
                          </dd>
                        </div>
                      )}
                    </dl>
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="mt-5 text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    >
                      ← Edit business details
                    </button>
                  </div>

                  {/* Personality card */}
                  <div
                    className={cn(
                      "rounded-2xl p-5 border-2 bg-gradient-to-b",
                      selectedPersonality.color,
                      selectedPersonality.borderColor
                    )}
                  >
                    <div className="text-2xl mb-2">{selectedPersonality.emoji}</div>
                    <h3 className="font-display font-bold text-white text-base mb-1">
                      {selectedPersonality.name}
                    </h3>
                    <p className={cn("text-xs font-medium mb-3", selectedPersonality.textColor)}>
                      {selectedPersonality.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {selectedPersonality.tone.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-slate-400 border border-white/6">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    >
                      ← Change personality
                    </button>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200 min-h-[44px]",
                        copied
                          ? "bg-green-500/15 border-green-500/40 text-green-400"
                          : "bg-brand-500 hover:bg-brand-600 text-white border-transparent shadow-lg shadow-brand-500/20 hover:-translate-y-0.5"
                      )}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied!" : "Copy Prompt"}
                    </button>

                    <button
                      type="button"
                      onClick={handleDownload}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-white/6 border border-white/12 hover:bg-white/10 text-slate-200 transition-all duration-200 min-h-[44px]"
                    >
                      <Download className="w-4 h-4" />
                      Download .txt
                    </button>
                  </div>
                </div>

                {/* ── Prompt viewer ── */}
                <div className="lg:col-span-2">
                  <div className="glass-card overflow-hidden flex flex-col">
                    {/* Editor chrome */}
                    <div className="px-5 py-3 border-b border-white/8 flex items-center justify-between bg-black/20 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        <span className="text-slate-600 text-xs ml-3 font-mono">
                          agent-prompt.txt
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors duration-200"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    {/* Prompt text */}
                    <div className="p-5 lg:p-6 overflow-auto max-h-[580px]">
                      {/* Section headings highlighted */}
                      <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap break-words">
                        {generatedPrompt.split("\n").map((line, i) => {
                          const isH1 = line.startsWith("# ");
                          const isH2 = line.startsWith("## ");
                          return (
                            <span
                              key={i}
                              className={cn(
                                "block",
                                isH1 ? "text-brand-400 font-bold" :
                                isH2 ? "text-slate-300 font-semibold" :
                                "text-slate-400"
                              )}
                            >
                              {line || "\u00A0"}
                            </span>
                          );
                        })}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary text-sm px-6 py-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={resetConfig}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200 px-4 py-3"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Start Over
                  </button>
                  <Link to="/pricing" className="btn-primary text-sm px-8 py-3">
                    Deploy Your Agent
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}
