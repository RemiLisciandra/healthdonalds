"use client";

import HeaderBar from "../layouts/header/HeaderBar";
import Logo from "../layouts/header/Logo";
import PannerButton from "../layouts/header/PannerButton";
import Title from "../layouts/header/Title";
import UserInfo from "../layouts/header/UserInfo";
import { useAuth } from "../hooks/useAuth";

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { username } = useAuth();

  return (
    <div className="mx-auto flex min-h-screen w-[500px] flex-col items-center border border-gray-200 shadow">
      <HeaderBar>
        <div className="flex flex-row items-center">
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
