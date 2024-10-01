"use client";

import Image from "next/image";
import { Button } from "@/app/components/ui/button";

type NavItemProps = {
  id: string;
  title: string;
  logo: string;
  activeCategory: string;
  setActiveCategory: (id: string) => void;
};

export const NavItem: React.FC<NavItemProps> = ({
  id,
  title,
  logo,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <Button
      variant="link"
      onClick={() => setActiveCategory(id)}
      className={`my-2 ms-5 flex h-20 flex-col items-center justify-center rounded border border-gray-200 hover:no-underline ${
        activeCategory === id ? "border-gray-300 bg-gray-100" : "bg-white"
      }`}
    >
      <Image src={logo} alt={title} width={70} height={70} priority />
      <span className="mt-2 text-sm font-medium text-gray-700">{title}</span>
    </Button>
  );
};
