import { create } from "zustand";
import { UserSchema } from "@/schemas/schema.user";

type SessionState = {
  user: UserSchema | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUser: (user: UserSchema) => void;
  updateUserPreferences: (preferences: Partial<Pick<UserSchema["user_profile_preferences"], "profile_public" | "allow_email" | "allow_whatsapp">>) => void;
  updateUserData: (data: Partial<Pick<UserSchema, "phone" | "bio" | "department" | "city">>) => void;
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

  updateUserPreferences: (preferences: Partial<UserSchema["user_profile_preferences"]>) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      user_profile_preferences: {
        ...currentUser.user_profile_preferences,
        ...preferences,
      },
    };

    set({ user: updatedUser });
  }
  ,


  updateUserData: (data) => {
    const currentUser = get().user;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...data };
    set({ user: updatedUser });
  },

  clearUser: () => {
    set({ user: null, isLoggedIn: false, isLoading: false });
  },

  setLoading: (value) => set({ isLoading: value }),
}));
