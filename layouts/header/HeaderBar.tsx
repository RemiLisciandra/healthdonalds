"use client";

import { PropsWithChildren } from "react";

const HeaderBar = ({ children }: PropsWithChildren) => {
  return (
    <header className="flex h-[75px] w-full flex-row items-center justify-between gap-2 border-b border-gray-200 px-5">
      {children}
    </header>
  );
};

export default HeaderBar;
