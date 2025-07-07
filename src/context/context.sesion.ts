import { create } from "zustand";

type Session = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  provider?: string;
  phone?: string;
};

type SessionState = {
  user: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isModalOpen: boolean;
  setUser: (user: Session) => void;
  clearUser: () => void;
  setLoading: (value: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useSession = create<SessionState>((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  isModalOpen: false,
  setUser: (user) => set({ user, isLoggedIn: true, isLoading: false }),
  clearUser: () => set({ user: null, isLoggedIn: false, isLoading: false }),
  setLoading: (value) => set({ isLoading: value }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
