"use client";

import { CATEGORIES } from "@/lib/categories";
import { NavItem } from "@/app/components/NavItem";
import { useState } from "react";

export const NavBar = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

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
