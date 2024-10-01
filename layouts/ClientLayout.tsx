"use client";

import HeaderBar from "../layouts/header/HeaderBar";
import Logo from "../layouts/header/Logo";
import PannerButton from "../layouts/header/PannerButton";
import Title from "../layouts/header/Title";
import UserInfo from "../layouts/header/UserInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "../hooks/useUserStore";
import { useRouter } from "next/navigation";
import { useClientLayout } from "@/hooks/useClientLayout";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const username = useUserStore((state) => state.username);
  const router = useRouter();
  useClientLayout();

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center border border-gray-200 shadow">
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
        <main className="h-full w-full">{children}</main>
      </div>
      <ToastContainer />
    </>
  );
}
