import { useEffect } from "react";
import { useUserStore } from "./useUserStore";
import { useRouter, usePathname } from "next/navigation";

export const useClientLayout = () => {
  const username = useUserStore((state) => state.username);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (hasHydrated && !username) {
      router.push("/login");
    }

    if (username && pathname === "/login") {
      router.push("/");
    }
  }, [hasHydrated, username, router, pathname]);
};
