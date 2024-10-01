"use client";

import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";

type ItemProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  count: number;
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
};

export const Item = ({
  id,
  name,
  price,
  image,
  count,
  incrementCount,
  decrementCount,
}: ItemProps) => {
  return (
    <div className="flex h-60 cursor-pointer flex-col rounded border border-gray-200">
      <div className="relative me-2 ms-auto mt-2">
        <span className="font-bold text-gray-600">$ {price}</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <Image src={image} alt={name} width={100} height={100} />
        <div className="flex flex-col">
          <span className="font-bold text-gray-500">{name}</span>
        </div>
        {count > 0 ? (
          <div className="flex items-center text-gray-600">
            <Minus className="mx-3" onClick={() => decrementCount(id)} />
            <span className="mx-2">{count}</span>
            <Plus className="mx-3" onClick={() => incrementCount(id)} />
          </div>
        ) : (
          <Button onClick={() => incrementCount(id)}>Add</Button>
        )}
      </div>
    </div>
  );
};
