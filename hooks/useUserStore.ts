"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

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

      setUserName: (name: string) => {
        set(() => ({
          username: name,
          isAdmin: name === "admin",
        }));

        Cookies.set(
          "username-storage",
          JSON.stringify({
            username: name,
            isAdmin: name === "admin",
          }),
          {
            expires: 7,
            path: "/",
            sameSite: "lax",
          },
        );
      },

      logout: () => {
        set(() => ({
          username: null,
          isAdmin: false,
        }));

        Cookies.remove("username-storage");
      },

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
