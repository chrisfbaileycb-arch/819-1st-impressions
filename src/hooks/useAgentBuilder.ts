import { useState, useEffect } from "react";
import type { AgentConfig } from "@/types";

const STORAGE_KEY = "1st_impressions_agent_config";
const STEP_KEY = "1st_impressions_agent_step";

const DEFAULT_CONFIG: AgentConfig = {
  businessName: "",
  industry: "",
  description: "",
  hours: "",
  services: [],
  rules: "",
  personalityId: "corner-office",
};

export function useAgentBuilder() {
  const [step, setStep] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STEP_KEY);
      if (!saved) return 1;
      const n = parseInt(saved, 10);
      return isNaN(n) ? 1 : Math.min(Math.max(n, 1), 3);
    } catch {
      return 1;
    }
  });

  const [config, setConfig] = useState<AgentConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_CONFIG;
      return { ...DEFAULT_CONFIG, ...(JSON.parse(saved) as Partial<AgentConfig>) };
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      console.log("localStorage write failed — config will not persist");
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STEP_KEY, String(step));
    } catch {
      // silent
    }
  }, [step]);

  const updateConfig = (updates: Partial<AgentConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const goToStep = (s: number) => setStep(Math.min(Math.max(s, 1), 3));

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    setStep(1);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_KEY);
    } catch {
      // silent
    }
  };

  return { step, config, updateConfig, nextStep, prevStep, goToStep, resetConfig };
}
