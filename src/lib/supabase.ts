import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || "";
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : ({
        from: (table: string) => ({
          insert: async (data: unknown) => {
            console.info(`[AI Studio Mock DB] Inserted lead into table "${table}":`, data);
            return { data: [data], error: null };
          },
          select: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
            single: () => Promise.resolve({ data: null, error: null }),
            then: (resolve: (val: { data: unknown[]; error: null }) => void) =>
              resolve({ data: [], error: null }),
          }),
          update: async (data: unknown) => ({ data, error: null }),
          delete: async () => ({ data: null, error: null }),
        }),
        auth: {
          getUser: async () => ({ data: { user: null }, error: null }),
          getSession: async () => ({ data: { session: null }, error: null }),
          onAuthStateChange: () => ({
            data: { subscription: { unsubscribe: () => {} } },
          }),
        },
      } as unknown as ReturnType<typeof createClient>);

