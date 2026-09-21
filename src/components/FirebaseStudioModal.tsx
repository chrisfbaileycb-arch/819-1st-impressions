import React, { useState, useEffect } from "react";
import { useFirebase } from "@/context/FirebaseContext";
import {
  ExternalLink,
  Database,
  CheckCircle2,
  PhoneCall,
  Bot,
  UserCheck,
  LogOut,
  LogIn,
  X,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  subscribeToRecentCallLogs,
  subscribeToSavedAgents,
  testConnection,
  type StoredCallLog,
  type SavedAgent,
} from "@/lib/firebase";
import { toast } from "sonner";

export default function FirebaseStudioModal() {
  const {
    user,
    isConnected,
    studioUrl,
    projectId,
    databaseId,
    signIn,
    signOut,
    isStudioModalOpen,
    closeStudioModal,
    triggerSimulatedCall,
  } = useFirebase();

  const [activeTab, setActiveTab] = useState<"overview" | "logs" | "agents">("overview");
  const [callLogs, setCallLogs] = useState<StoredCallLog[]>([]);
  const [agents, setAgents] = useState<SavedAgent[]>([]);
  const [testingPing, setTestingPing] = useState(false);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    if (!isStudioModalOpen) return;

    const unsubLogs = subscribeToRecentCallLogs((logs) => {
      setCallLogs(logs);
    });

    const unsubAgents = subscribeToSavedAgents((list) => {
      setAgents(list);
    });

    return () => {
      unsubLogs();
      unsubAgents();
    };
  }, [isStudioModalOpen]);

  if (!isStudioModalOpen) return null;

  const handlePing = async () => {
    setTestingPing(true);
    const ok = await testConnection();
    setTestingPing(false);
    if (ok) {
      toast.success("Firestore Connection Verified!", {
        description: "Cloud database responded in real-time.",
      });
    } else {
      toast.error("Firestore unreachable.");
    }
  };

  const handleSimulate = async () => {
    setSimulating(true);
    await triggerSimulatedCall();
    setSimulating(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0a1124] border border-brand-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-md shadow-brand-500/30">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Firebase Studio & Backend Hub</h3>
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Connected
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono truncate max-w-md">
                Database: {databaseId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={studioUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 border border-brand-500/40 text-xs font-semibold transition-colors"
              title="Open Firebase Console / Studio in a new tab"
            >
              <span>Alt Link (Studio)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={closeStudioModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-white/10 px-6 bg-white/[0.02]">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === "overview"
                ? "border-brand-500 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Connection & Auth
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "logs"
                ? "border-brand-500 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>Live Call Logs</span>
            {callLogs.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-brand-500/30 text-[10px] text-brand-300">
                {callLogs.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("agents")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "agents"
                ? "border-brand-500 text-white"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>Saved Agents</span>
            {agents.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-purple-500/30 text-[10px] text-purple-300">
                {agents.length}
              </span>
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === "overview" && (
            <div className="space-y-5">
              {/* Cloud Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 font-medium mb-1">Firebase Project</div>
                  <div className="text-sm font-mono text-white font-semibold truncate">
                    {projectId}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Firestore Enterprise Engine
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-slate-400 font-medium mb-1">Database Instance</div>
                  <div className="text-sm font-mono text-white font-semibold truncate">
                    {databaseId}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-brand-400">
                    <Database className="w-3.5 h-3.5" /> Collections: leads, agents, callLogs
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/40 to-purple-950/40 border border-brand-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Live Backend Actions</div>
                  <button
                    onClick={handlePing}
                    disabled={testingPing}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingPing ? "animate-spin" : ""}`} />
                    Test Ping
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Trigger and test cloud writes to confirm every database hook is actively persisting to Firebase Studio.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={handleSimulate}
                    disabled={simulating}
                    className="btn-primary text-xs py-2 px-3.5 min-h-[36px]"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    {simulating ? "Recording..." : "Simulate Incoming Call"}
                  </button>
                  <a
                    href={studioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-xs py-2 px-3.5 min-h-[36px] flex items-center gap-1.5"
                  >
                    <span>Open Firebase Studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Authentication Status */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Firebase User Authentication</div>
                  {user ? (
                    <div className="flex items-center gap-2 mt-1">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-white font-medium">
                        {user.displayName || user.email}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">({user.uid.slice(0, 8)}...)</span>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-300 mt-1">
                      Operating as guest session. Sign in with Google to tie agents to your account.
                    </div>
                  )}
                </div>

                <div>
                  {user ? (
                    <button
                      onClick={signOut}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  ) : (
                    <button
                      onClick={signIn}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 border border-brand-500/40 text-xs font-semibold transition-colors"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Sign in with Google
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Real-time calls synced to Firestore collection <code className="text-brand-300">callLogs</code>:
                </p>
                <button
                  onClick={handleSimulate}
                  disabled={simulating}
                  className="text-xs text-brand-400 hover:text-brand-300 font-medium"
                >
                  + Add Test Call
                </button>
              </div>

              {callLogs.length === 0 ? (
                <div className="text-center py-10 rounded-xl bg-white/5 border border-dashed border-white/10">
                  <PhoneCall className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-300 font-medium">No calls logged yet</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Click "Simulate Incoming Call" above to record a conversation transcript into Firestore.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {callLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-white">{log.callerName}</span>
                        <span className="text-slate-400 font-mono">{log.callerNumber}</span>
                      </div>
                      <p className="text-xs text-slate-300 mb-2">{log.summary}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20">
                          {log.status}
                        </span>
                        <span>Sentiment: {log.sentiment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "agents" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Agents saved to Firestore collection <code className="text-brand-300">agents</code>:
              </p>

              {agents.length === 0 ? (
                <div className="text-center py-10 rounded-xl bg-white/5 border border-dashed border-white/10">
                  <Bot className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm text-slate-300 font-medium">No agents saved to cloud yet</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Configure your agent on the Agent Builder page and click "Save to Firebase Studio".
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-white">{agent.businessName}</span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">
                          {agent.personalityId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-2 font-mono bg-black/30 p-2 rounded">
                        {agent.prompt}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Ready for production calls & webhook routing</span>
          </div>
          <a
            href={studioUrl}
            target="_blank"
            rel="noreferrer"
            className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
          >
            <span>Console Link</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
