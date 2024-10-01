"use client";

import { NavBar } from "@/app/components/NavBar";
import useSWR from "swr";
import { Loader } from "@/app/components/ui/loader";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { CATEGORIES } from "@/lib/categories";
import { useState } from "react";

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ItemList() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/items", fetcher);

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
    (item: Item) =>
      item.category.toLowerCase() === activeCategory.toLowerCase(),
  );

  return (
    <div className="flex h-full py-5">
      <NavBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="mx-5 grid w-full grid-cols-3 gap-2">
        {filteredItems.map((item: Item) => (
          <div
            key={item.id}
            className="flex h-60 cursor-pointer flex-col rounded border border-gray-200"
          >
            <div className="relative me-2 ms-auto">
              <span className="font-bold text-gray-600">$ {item.price}</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
              />
              <div className="flex flex-col">
                <span className="font-bold text-gray-500">{item.name}</span>
              </div>
              <div>
                <Button>Add</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
