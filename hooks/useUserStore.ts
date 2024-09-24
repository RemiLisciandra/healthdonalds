"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  username: string | null;
  isAdmin: boolean;
  setUserName: (name: string) => void;
  logout: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useUserStore = create<User>()(
  persist(
    (set) => ({
      username: null,
      isAdmin: false,
      hasHydrated: false,
      setUserName: (name: string) =>
        set(() => ({
          username: name,
          isAdmin: name === "admin",
        })),
      logout: () =>
        set(() => ({
          username: null,
          isAdmin: false,
        })),
      setHasHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: "username-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
