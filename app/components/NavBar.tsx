"use client";

import { CATEGORIES } from "@/lib/categories";
import { NavItem } from "@/app/components/NavItem";

type NavBarProps = {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
};

export const NavBar = ({ activeCategory, setActiveCategory }: NavBarProps) => {
  return (
    <>
      <div className="flex w-[100px] flex-col">
        {CATEGORIES.map((category) => (
          <NavItem
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            key={category.id}
            {...category}
          />
        ))}
      </div>
    </>
  );
};
