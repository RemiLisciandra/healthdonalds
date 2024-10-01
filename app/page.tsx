"use client";

import { NavBar } from "@/app/components/NavBar";
import useSWR from "swr";
import { Loader } from "@/app/components/ui/loader";
import { CATEGORIES } from "@/lib/categories";
import { useState } from "react";
import { ItemList } from "@/app/components/ItemList";

type ItemType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ItemSelection() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/items", fetcher);
  const [countById, setCountById] = useState<{ [key: string]: number }>({});

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Failed to load items</p>
      </div>
    );

  const filteredItems = data.filter(
    (item: ItemType) =>
      item.category.toLowerCase() === activeCategory.toLowerCase(),
  );

  const incrementCount = (id: string) => {
    setCountById((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrementCount = (id: string) => {
    setCountById((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  return (
    <div className="flex h-full py-5">
      <NavBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ItemList
        items={filteredItems}
        countById={countById}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
      />
    </div>
  );
}
