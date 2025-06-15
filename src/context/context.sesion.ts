import { create } from "zustand";

type Session = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string
  provider?: string
};

type SessionState = {
  user: Session | null;
  setUser: (user: Session) => void;
  clearUser: () => void;
};

export const useSession = create<SessionState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
