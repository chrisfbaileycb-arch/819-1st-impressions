import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  auth,
  loginWithGoogle,
  logoutUser,
  testConnection,
  FIREBASE_STUDIO_URL,
  FIREBASE_PROJECT_ID,
  FIRESTORE_DATABASE_ID,
  submitLead,
  saveAgentToFirebase,
  recordCallLog,
  subscribeToSavedAgents,
  subscribeToRecentCallLogs,
} from "@/lib/firebase";
import { toast } from "sonner";

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  isConnected: boolean;
  studioUrl: string;
  projectId: string;
  databaseId: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  isStudioModalOpen: boolean;
  openStudioModal: () => void;
  closeStudioModal: () => void;
  triggerSimulatedCall: (callerName?: string, summary?: string) => Promise<string | undefined>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    testConnection().then((connected) => {
      setIsConnected(connected);
    });

    return () => unsub();
  }, []);

  const signIn = async () => {
    try {
      const u = await loginWithGoogle();
      toast.success(`Signed in as ${u.displayName || u.email}!`, {
        description: "Your session is synced with Firebase Studio.",
      });
    } catch (error: unknown) {
      const authErr = error as { code?: string; message?: string };
      if (authErr?.code !== "auth/popup-closed-by-user") {
        toast.error("Sign in failed", {
          description: authErr?.message || "Please check your browser popup settings.",
        });
      }
    }
  };

  const signOut = async () => {
    try {
      await logoutUser();
      toast.info("Signed out successfully.");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error("Failed to sign out: " + (err.message || String(error)));
    }
  };

  const openStudioModal = () => setIsStudioModalOpen(true);
  const closeStudioModal = () => setIsStudioModalOpen(false);

  const triggerSimulatedCall = async (
    callerName = "Dr. Robert Smith",
    summary = "Caller scheduled emergency root canal consultation for Thursday at 2:00 PM."
  ) => {
    try {
      const id = await recordCallLog({
        callerName,
        callerNumber: "+1 (555) 382-9012",
        status: "Completed & Synced",
        summary,
        transcript: `[00:01] AI Receptionist: "Thank you for calling 1st Impressions. How can I assist your practice today?"\n[00:05] Caller: "Hi, I have a dental emergency and need an urgent appointment."\n[00:12] AI Receptionist: "I can absolutely book you for our priority emergency window Thursday at 2:00 PM. Let me take down your details."`,
        sentiment: "Urgent / Positive",
      });
      toast.success("Simulated call recorded in Firestore!", {
        description: `Synced to Firebase Studio collection 'callLogs' (${id.slice(0, 8)}...)`,
        action: {
          label: "View Studio",
          onClick: () => window.open(FIREBASE_STUDIO_URL, "_blank"),
        },
      });
      return id;
    } catch (err: unknown) {
      const error = err as Error;
      toast.error("Call simulation failed: " + (error.message || String(err)));
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        isConnected,
        studioUrl: FIREBASE_STUDIO_URL,
        projectId: FIREBASE_PROJECT_ID,
        databaseId: FIRESTORE_DATABASE_ID,
        signIn,
        signOut,
        isStudioModalOpen,
        openStudioModal,
        closeStudioModal,
        triggerSimulatedCall,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}
