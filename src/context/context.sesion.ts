import { create } from "zustand";
import { UserSchema } from "@/schemas/schema.user";

type SessionState = {
  user: UserSchema | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: UserSchema) => void;
  updateUserPreferences: (
    preferences: Partial<
      Pick<
        UserSchema["user_profile_preferences"],
        "profile_public" | "allow_email" | "allow_whatsapp"
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
