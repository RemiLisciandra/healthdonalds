"use client";

import { Item } from "@/app/components/Item";

type ItemType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type ItemListProps = {
  items: ItemType[];
  countById: { [key: string]: number };
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
};

export const ItemList = ({
  items,
  countById,
  incrementCount,
  decrementCount,
}: ItemListProps) => {
  return (
    <div className="mx-5 grid w-full grid-cols-3 gap-2 py-2">
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          image={item.image}
          count={countById[item.id] || 0}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
        />
      ))}
    </div>
  );
};
