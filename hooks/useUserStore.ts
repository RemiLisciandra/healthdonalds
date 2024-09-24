"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  username: string | null;
  isAdmin: boolean;
  setUserName: (name: string) => void;
  logout: () => void;
};

export const useUserStore = create<User>()(
  persist(
    (set) => ({
      username: null,
      isAdmin: false,
      setUserName: (name: string) =>
        set(() => ({
          userName: name,
          isAdmin: name === "admin",
        })),
      logout: () =>
        set(() => ({
          userName: null,
          isAdmin: false,
        })),
    }),
    {
      name: "username-storage",
    },
  ),
);
