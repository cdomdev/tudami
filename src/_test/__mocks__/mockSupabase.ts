import { vi } from "vitest";
export function mockSupabase() {
  vi.mock("@/utils/supabase/supabaseClient", () => {
    return {
      supabase: {
        auth: {
          getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
          signInWithOAuth: vi.fn(),
          signOut: vi.fn(),
        },
        from: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
      },
    };
  });
}
