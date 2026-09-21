import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: The app will break without this line */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const FIREBASE_PROJECT_ID = firebaseConfig.projectId;
export const FIRESTORE_DATABASE_ID = firebaseConfig.firestoreDatabaseId;
export const FIREBASE_STUDIO_URL = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore/databases/${firebaseConfig.firestoreDatabaseId}/data`;

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection on boot as requested by skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    return true;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("the client is offline")
    ) {
      console.warn("Firestore client is offline. Check network / configuration.");
      return false;
    }
    // Document might just not exist in tests, but server reached
    return true;
  }
}

// Run boot check
testConnection().catch((err) => {
  console.info("Firestore initial ping:", err);
});

// Auth Helpers
export async function loginWithGoogle(): Promise<User> {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  } catch (err) {
    console.error("Google sign in error:", err);
    throw err;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// ─── Firestore Operations ──────────────────────────────────────────────────

export interface LeadPayload {
  name: string;
  email: string;
  businessName?: string;
  industry?: string;
  teamSize?: string;
  phoneSetup?: string;
  problemStatement?: string;
  planInterest?: string;
  source: string;
}

export async function submitLead(payload: LeadPayload): Promise<string> {
  const path = "leads";
  try {
    const docRef = await addDoc(collection(db, path), {
      name: payload.name.trim().slice(0, 100),
      email: payload.email.trim().slice(0, 100),
      businessName: (payload.businessName || "").trim().slice(0, 100),
      industry: (payload.industry || "").trim().slice(0, 100),
      teamSize: (payload.teamSize || "").trim().slice(0, 50),
      phoneSetup: (payload.phoneSetup || "").trim().slice(0, 100),
      problemStatement: (payload.problemStatement || "").trim().slice(0, 1000),
      planInterest: (payload.planInterest || "").trim().slice(0, 50),
      source: (payload.source || "web").trim().slice(0, 100),
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export interface AgentDocPayload {
  id?: string;
  userId?: string;
  businessName: string;
  industry?: string;
  description?: string;
  hours?: string;
  rules?: string;
  personalityId: string;
  prompt: string;
}

export async function saveAgentToFirebase(
  payload: AgentDocPayload
): Promise<string> {
  const docId = payload.id || `agent_${Date.now()}`;
  const path = `agents/${docId}`;
  try {
    const currentUid = auth.currentUser?.uid || "anonymous";
    const dataToSave = {
      userId: currentUid,
      businessName: payload.businessName.trim().slice(0, 100),
      industry: (payload.industry || "").trim().slice(0, 100),
      description: (payload.description || "").trim().slice(0, 1000),
      hours: (payload.hours || "").trim().slice(0, 200),
      rules: (payload.rules || "").trim().slice(0, 2000),
      personalityId: (payload.personalityId || "corner-office").slice(0, 50),
      prompt: payload.prompt.slice(0, 8000),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(db, "agents", docId), dataToSave, { merge: true });
    return docId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export interface CallLogPayload {
  callerName?: string;
  callerNumber?: string;
  status: string;
  summary: string;
  transcript?: string;
  sentiment?: string;
}

export async function recordCallLog(payload: CallLogPayload): Promise<string> {
  const path = "callLogs";
  try {
    const docRef = await addDoc(collection(db, path), {
      callerName: (payload.callerName || "Caller").trim().slice(0, 100),
      callerNumber: (payload.callerNumber || "+1 (555) 019-2834").slice(0, 50),
      status: payload.status.slice(0, 50),
      summary: payload.summary.slice(0, 2000),
      transcript: (payload.transcript || "").slice(0, 10000),
      sentiment: (payload.sentiment || "Positive").slice(0, 50),
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export interface SavedAgent {
  id: string;
  userId?: string;
  businessName: string;
  industry?: string;
  description?: string;
  hours?: string;
  rules?: string;
  personalityId: string;
  prompt: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface StoredCallLog {
  id: string;
  callerName?: string;
  callerNumber?: string;
  status: string;
  summary: string;
  transcript?: string;
  sentiment?: string;
  createdAt?: unknown;
}

// Real-time snapshot listeners with mandatory error handling
export function subscribeToRecentCallLogs(
  callback: (logs: StoredCallLog[]) => void
): Unsubscribe {
  const path = "callLogs";
  const q = query(collection(db, path), orderBy("createdAt", "desc"), limit(20));
  return onSnapshot(
    q,
    (snapshot) => {
      const logs = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<StoredCallLog, "id">),
      }));
      callback(logs);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export function subscribeToSavedAgents(
  callback: (agents: SavedAgent[]) => void
): Unsubscribe {
  const path = "agents";
  const q = query(collection(db, path), orderBy("createdAt", "desc"), limit(20));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<SavedAgent, "id">),
      }));
      callback(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}
