import { create } from "zustand";



type Session = {
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
      achievement_id?: string;
    };
  };
};

type SessionState = {
  user: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isModalOpen: boolean;
  setUser: (user: Session) => void;
  updateUserPreferences: (
    preferences: Partial<
      Pick<
        Session,
        "phone" | "bio" | "profile_public" | "allow_email" | "allow_whatsapp" | "country" | "city" | "department"
      >
    >,
  ) => void;
  clearUser: () => void;
  setLoading: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useSession = create<SessionState>((set, get) => ({
  // Estado inicial seguro para SSR
  user: null, 
  isLoggedIn: false,
  isLoading: true,
  isModalOpen: false,
  setUser: (user) => {
    set({ user, isLoggedIn: true, isLoading: false });
    if (typeof window !== "undefined") {
      document.cookie = `session-data=${encodeURIComponent(
        JSON.stringify({ user, isLoggedIn: true })
      )}; path=/; SameSite=Strict; Secure=${location.protocol === "https:"}`;
    }
  },
  updateUserPreferences: (preferences) => {
    const state = get();
    const updatedUser = state.user ? { ...state.user, ...preferences } : null;
    set({ user: updatedUser });
    if (typeof window !== "undefined") {
      document.cookie = `session-data=${encodeURIComponent(
        JSON.stringify({ user: updatedUser, isLoggedIn: state.isLoggedIn })
      )}; path=/; SameSite=Strict; Secure=${location.protocol === "https:"}`;
    }
  },
  clearUser: () => {
    set({ user: null, isLoggedIn: false, isLoading: false });
    if (typeof window !== "undefined") {
      document.cookie = `session-data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  },
  setLoading: (value) => set({ isLoading: value }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));


/**
 * 
// Middleware personalizado para cookies
 * 
const cookieStorage = {
  getItem: (name: string): string | null => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift();
      return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    return null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof document === "undefined") return;
    const expires = new Date();
    // Cookie expira en 7 días
    expires.setDate(expires.getDate() + 7);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure=${
      location.protocol === "https:"
    }`;
  },
  removeItem: (name: string): void => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};
 * 

 * 
 */
