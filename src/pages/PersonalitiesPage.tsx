import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { ArrowRight, Play, Mic, Volume2, Sparkles, Check } from "lucide-react";
import { PERSONALITIES } from "@/constants";
import { cn } from "@/lib/utils";
import CTASection from "@/components/features/CTASection";

type DialogueType = "greeting" | "handoff" | "followup";

const DIALOGUE_LABELS: Record<DialogueType, string> = {
  greeting: "Answers the call",
  handoff: "Transfers to a human",
  followup: "Follow-up text",
};

const VOICE_SETTINGS: Record<string, { pitch: number; rate: number }> = {
  "italian-charmer": { pitch: 1.2, rate: 0.92 },
  "east-coaster": { pitch: 1.0, rate: 1.15 },
  "southern-belle": { pitch: 1.1, rate: 0.88 },
  "good-ol-boy": { pitch: 0.88, rate: 0.9 },
  "corner-office": { pitch: 1.0, rate: 1.0 },
};

export default function PersonalitiesPage() {
  const [active, setActive] = useState(PERSONALITIES[4].id); // Corner Office default
  const [dialogue, setDialogue] = useState<DialogueType>("greeting");
  const [isPlaying, setIsPlaying] = useState(false);
  const [barHeights, setBarHeights] = useState<number[]>([]);

  const current = PERSONALITIES.find((p) => p.id === active)!;

  // Animate waveform bars while speaking
  useEffect(() => {
    if (!isPlaying) { setBarHeights([]); return; }
    const update = () =>
      setBarHeights(Array.from({ length: 28 }, (_, i) =>
        15 + Math.abs(Math.sin(Date.now() / 300 + i * 0.9)) * 72
      ));
    update();
    const id = setInterval(update, 120);
    return () => clearInterval(id);
  }, [isPlaying]);

  // Stop speech when personality or dialogue type changes
  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, [active, dialogue]);

  // Cleanup on unmount
  useEffect(() => () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);

  const handlePlay = () => {
    const text =
      dialogue === "greeting" ? current.sampleGreeting :
      dialogue === "handoff" ? current.sampleHandoff :
      current.sampleFollowup;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      if (isPlaying) { setIsPlaying(false); return; }
      const utt = new SpeechSynthesisUtterance(text);
      utt.pitch = VOICE_SETTINGS[active]?.pitch ?? 1.0;
      utt.rate = VOICE_SETTINGS[active]?.rate ?? 1.0;
      utt.onend = () => setIsPlaying(false);
      utt.onerror = () => setIsPlaying(false);
      setIsPlaying(true);
      window.speechSynthesis.speak(utt);
    } else {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 3200);
    }
  };

  const dialogueText: Record<DialogueType, string> = {
    greeting: current.sampleGreeting,
    handoff: current.sampleHandoff,
    followup: current.sampleFollowup,
  };

  return (
    <main className="pt-20">
      <PageMeta
        title="AI Receptionist Personalities"
        description="Choose from 5 distinct AI receptionist personalities — The Italian Charmer, East Coaster, Southern Belle, Good Ol' Boy, and The Corner Office. Included in every Pro plan."
        canonical="/personalities"
      />
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="hero-glow opacity-60" />
        <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 badge-brand mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Personality Pack · Included in Pro
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            Your AI receptionist.{" "}
            <span className="brand-gradient-text">Your personality.</span>
          </h1>
          <p className="text-slate-400 text-xl leading-relaxed mb-10">
            Choose how your business sounds. From buttoned-up professional to a friendly Southern welcome — your AI carries the voice and tone that fits your brand.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/pricing" className="btn-primary px-8 py-4 text-base">
              Start free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/features" className="btn-secondary px-8 py-4 text-base">
              See all features
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Personality Picker */}
      <section className="section-padding pt-0">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="numbered-label mb-3">Live demo</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Pick a personality. Hear the difference.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Every personality gets its own greeting, handoff script, and follow-up message — tuned to match the tone your customers expect.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Personality Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              {PERSONALITIES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setActive(p.id); setDialogue("greeting"); setIsPlaying(false); }}
                  className={cn(
                    "relative rounded-2xl p-4 border text-left transition-all duration-200 min-h-[44px]",
                    active === p.id
                      ? `bg-gradient-to-b ${p.color} ${p.borderColor} shadow-lg`
                      : "bg-white/4 border-white/8 hover:bg-white/8 hover:border-white/15"
                  )}
                >
                  <div className="text-2xl mb-2">{p.emoji}</div>
                  <div className={cn("font-semibold text-sm leading-tight", active === p.id ? "text-white" : "text-slate-300")}>
                    {p.name}
                  </div>
                  <div className="text-slate-500 text-xs mt-1 leading-tight">{p.accent}</div>
                  {p.tier === "Standard" && (
                    <span className="absolute top-2.5 right-2.5 text-[9px] px-1.5 py-0.5 rounded-full bg-slate-500/20 text-slate-400 border border-slate-500/20 font-medium">
                      Default
                    </span>
                  )}
                  {p.tier === "Personality Pack" && (
                    <span className="absolute top-2.5 right-2.5 text-[9px] px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/25 font-medium">
                      Pro
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Demo Panel */}
            <div className={cn("rounded-3xl border p-8 lg:p-10 bg-gradient-to-br transition-all duration-300", current.color, current.borderColor)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left — personality info */}
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="text-5xl">{current.emoji}</div>
                    <div>
                      <h3 className="font-display font-bold text-white text-2xl">{current.name}</h3>
                      <p className={cn("text-sm font-medium mt-0.5", current.textColor)}>{current.tagline}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6">{current.description}</p>

                  {/* Tone tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {current.tone.map((t) => (
                      <span
                        key={t}
                        className={cn(
                          "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border",
                          `bg-white/8 border-white/15 text-slate-300`
                        )}
                      >
                        {t}
                      </span>
                    ))}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-white/8 border-white/15 text-slate-300">
                      <Volume2 className="w-3 h-3" /> {current.accent}
                    </span>
                  </div>

                  {/* Dialogue type selector */}
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(DIALOGUE_LABELS) as DialogueType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => { setDialogue(type); setIsPlaying(false); }}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 min-h-[44px]",
                          dialogue === type
                            ? `${current.borderColor} bg-white/15 text-white`
                            : "border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {DIALOGUE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right — sample dialogue */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                        {DIALOGUE_LABELS[dialogue]}
                      </span>
                    </div>
                    <button
                      onClick={handlePlay}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 min-h-[44px]",
                        isPlaying
                          ? "bg-brand-500/30 text-brand-300 border border-brand-500/40"
                          : "bg-white/10 text-slate-400 hover:text-white border border-white/15 hover:bg-white/15"
                      )}
                    >
                      {isPlaying ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                          Tap to stop
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          Preview voice
                        </>
                      )}
                    </button>
                  </div>

                  {/* Waveform visual */}
                  {isPlaying && (
                    <div className="flex items-end gap-0.5 h-8 mb-4">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-1 rounded-full bg-brand-400 transition-all duration-100"
                          style={{ height: `${barHeights[i] ?? 15}%` }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Dialogue bubble */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                      <Mic className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex-1">
                      <p className="text-slate-200 text-sm leading-relaxed italic">
                        "{dialogueText[dialogue]}"
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs mt-4 text-center">
                    Voice synthesis powered by 1st Impressions AI · 70+ languages supported
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All 5 personalities grid */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="numbered-label mb-3">The full lineup</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Five distinct voices. One AI engine.
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Each personality has its own greeting style, handoff phrasing, follow-up tone, and cadence — trained to sound natural, not scripted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {PERSONALITIES.map((p, i) => (
              <div
                key={p.id}
                className={cn(
                  "relative rounded-2xl p-7 border transition-all duration-300 hover:scale-[1.01] cursor-pointer",
                  `bg-gradient-to-br ${p.color} ${p.borderColor}`,
                  // Make corner office (the default) span full width on the last row when odd
                  i === 4 ? "md:col-span-2 lg:col-span-1" : ""
                )}
                onClick={() => { setActive(p.id); setDialogue("greeting"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                {p.tier === "Standard" && (
                  <span className="absolute top-4 right-4 text-[9px] px-2 py-1 rounded-full bg-slate-500/20 text-slate-400 border border-slate-500/20 font-semibold">
                    Included Free
                  </span>
                )}
                {p.tier === "Personality Pack" && (
                  <span className="absolute top-4 right-4 text-[9px] px-2 py-1 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/25 font-semibold">
                    Pro Included
                  </span>
                )}

                <div className="text-4xl mb-4">{p.emoji}</div>
                <h3 className="font-display font-bold text-white text-lg mb-1">{p.name}</h3>
                <p className={cn("text-sm font-medium mb-3", p.textColor)}>{p.tagline}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.description}</p>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">Sample greeting</p>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    "{p.sampleGreeting.length > 100 ? p.sampleGreeting.slice(0, 100) + "…" : p.sampleGreeting}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to customize */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="numbered-label mb-4">Setup in 60 seconds</p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6 leading-snug">
                Personality isn't a setting. It's a voice your customers will recognize.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                In Agent Builder, pick your personality, name your AI, assign a business number, and go live. Every call, text, and follow-up carries the same tone — automatically.
              </p>
              <ul className="space-y-4">
                {[
                  "Choose from 5 distinct personality profiles",
                  "Fine-tune tone, formality, and greeting style",
                  "Apply to calls, SMS follow-ups, and voicemails",
                  "Switch personality any time — no re-training needed",
                  "Supports 70+ languages in every personality",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-400" />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini agent config preview */}
            <div className="bg-white/4 border border-white/10 rounded-3xl p-7 space-y-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold text-sm">Agent Builder</h4>
                <span className="badge-brand text-[10px] px-2 py-0.5">Live Preview</span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">AI Name</label>
                <div className="bg-white/6 border border-white/12 rounded-xl px-4 py-3 text-slate-200 text-sm">
                  Alex
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">Personality</label>
                <div className="grid grid-cols-3 gap-2">
                  {PERSONALITIES.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className={cn(
                        "rounded-xl p-2.5 border text-center cursor-pointer transition-all duration-150",
                        p.id === "corner-office"
                          ? `bg-gradient-to-b ${p.color} ${p.borderColor}`
                          : "bg-white/4 border-white/8 hover:bg-white/8"
                      )}
                    >
                      <div className="text-lg mb-1">{p.emoji}</div>
                      <div className="text-white text-[10px] font-medium leading-tight">{p.name.split(" ").slice(-1)[0]}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {["Warm", "Professional", "Direct"].map((t, i) => (
                    <span
                      key={t}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs border font-medium",
                        i === 1
                          ? "bg-brand-500/20 border-brand-500/30 text-brand-300"
                          : "bg-white/6 border-white/12 text-slate-400"
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full btn-primary text-sm py-3">
                Save & Go Live
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upsell CTA */}
      <section className="section-padding border-t border-white/6">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center glass-card p-10 lg:p-14 border-brand-500/20">
            <div className="text-5xl mb-6">🎭</div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
              Personality Pack — included in every Pro seat.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              All five personalities, full tone customization, and 70+ language support. No add-ons. No extra charge. Included in Pro Studio from $99.95/month.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/pricing" className="btn-primary px-8 py-4 text-base">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/features" className="btn-secondary px-8 py-4 text-base">
                All features
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
