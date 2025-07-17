import { create } from "zustand";

export type Session = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  provider?: string;
  phone?: string;
  bio?: string;
  country?: string;
  city?: string;
  department?: string;
  created_at?: string;
  approval_token: string;
  profile_public?: boolean;
  allow_email?: boolean;
  allow_whatsapp?: boolean;
  reputation?: {
    questions?: number;
    responses?: number;
    score?: string;
    achievement?: {
      achievement_id?: string | null;
    };
  };
};

type SessionState = {
  user: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: Session) => void;
  updateUserPreferences: (
    preferences: Partial<
      Pick<
        Session,
        | "phone"
        | "bio"
        | "profile_public"
        | "allow_email"
        | "allow_whatsapp"
        | "country"
        | "city"
        | "department"
      >
    >
  ) => void;
  clearUser: () => void;
  setLoading: (value: boolean) => void;
};

export const useSession = create<SessionState>((set, get) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,

  setUser: (user) => {
    set({ user, isLoggedIn: true, isLoading: false });
  },

  updateUserPreferences: (preferences) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...preferences };
    set({ user: updatedUser });
  },

  clearUser: () => {
    set({ user: null, isLoggedIn: false, isLoading: false });
  },

  setLoading: (value) => set({ isLoading: value }),
}));
