"use client";

import { CATEGORIES } from "@/lib/categories";
import Image from "next/image";
import { Button } from "./components/ui/button";

export default function ItemList() {
  return (
    <div className="flex h-full flex-col py-5">
      <div className="flex w-[100px] flex-col gap-3">
        {CATEGORIES.map((category) => (
          <Button variant="link" key={category.id} className="ms-5">
            <div className="flex justify-center rounded border border-gray-200">
              <Image
                src={category.logo}
                alt={category.title}
                width={60}
                height={60}
                priority
              />
            </div>
          </Button>
        ))}
      </div>
      <div></div>
    </div>
  );
}
