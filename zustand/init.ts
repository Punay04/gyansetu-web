import { create } from "zustand";

interface UserState {
  username: string;
  email: string;
  id: string;
  setUser: (user: { username: string; email: string; id: string }) => void;
  clearUser: () => void;
}

export const useStore = create<UserState>((set) => ({
  username: "",
  email: "",
  id: "",
  setUser: (user) => set(user),
  clearUser: () => set({ username: "", email: "", id: "" }),
}));