"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";

type PannerButtonProps = {
  counter: number;
};

const PannerButton = ({ counter }: PannerButtonProps) => {
  return (
    <Button
      variant="outline"
      className="text-md flex items-center gap-2 px-3 py-3"
    >
      {counter}
      <ShoppingBasket size={18} />
    </Button>
  );
};

export default PannerButton;
