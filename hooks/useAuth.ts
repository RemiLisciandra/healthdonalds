"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      router.push("/login");
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  return { username, setUsername };
}
