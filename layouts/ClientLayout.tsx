"use client";

import HeaderBar from "../layouts/header/HeaderBar";
import Logo from "../layouts/header/Logo";
import PannerButton from "../layouts/header/PannerButton";
import Title from "../layouts/header/Title";
import UserInfo from "../layouts/header/UserInfo";
import { useUserStore } from "../hooks/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const username = useUserStore((state) => state.username);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);

  useEffect(() => {
    if (hasHydrated && !username) {
      router.push("/login");
    }

    if (username && pathname === "/login") router.push("/");
  }, [hasHydrated, username, router, pathname]);

  return (
    <div className="mx-auto flex min-h-screen w-[500px] flex-col items-center border border-gray-200 shadow">
      <HeaderBar>
        <div
          className="flex cursor-pointer flex-row items-center"
          onClick={() => username && router.push("/")}
        >
          <Logo />
          <Title>Healthdonalds</Title>
        </div>
        <div className="flex flex-row items-center">
          {username && <UserInfo username={username} />}
          <PannerButton counter={0} />
        </div>
      </HeaderBar>
      <main>{children}</main>
    </div>
  );
}
