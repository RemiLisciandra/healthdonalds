import { PropsWithChildren } from "react";

const HeaderBar = ({ children }: PropsWithChildren) => {
  return (
    <header className="flex h-5 items-center justify-between border border-gray-200 px-4">
      {children}
    </header>
  );
};

export default HeaderBar;
