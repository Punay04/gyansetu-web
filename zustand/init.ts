import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  username: string;
  email: string;
  id: string;
  setUser: (user: { username: string; email: string; id: string }) => void;
  clearUser: () => void;
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      username: "",
      email: "",
      id: "",
      setUser: (user) => set(user),
      clearUser: () => set({ username: "", email: "", id: "" }),
    }),
    {
      name: "user-storage", // key in localStorage
    }
  )
);
