"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/categories";
import { ImageInput } from "@/components/admin/item/ImageInput";
import Image from "next/image";
import { generateIdByName } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Item = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: File | null;
};

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  category: z.string(),
  price: z.coerce.number().min(0).max(1000),
  image: z.any(),
});

export default function NewItem() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [item, setItem] = useState<Item>({
    id: "",
    name: "",
    category: "",
    price: 0,
    image: null,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      category: "",
      price: 0,
      image: null,
    },
  });

  useEffect(() => {
    if (item.name) {
      const generatedId = generateIdByName(item.name);
      setItem((prevItem) => ({
        ...prevItem,
        id: generatedId,
      }));
    }
  }, [item.name]);

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/");
  };

  const handleChange = <K extends keyof Item>(field: K, value: Item[K]) => {
    setItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-5">
      <h1 className="text-xl font-bold text-gray-600">Add a new item</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <div className="w-[300px] space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="Enter a name"
                      {...field}
                      value={item.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="id">ID</FormLabel>
                  <FormControl>
                    <Input
                      id="id"
                      placeholder="Generated ID"
                      {...field}
                      value={item.id}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => handleChange("category", value)}
                      value={item.category}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            <span className="flex flex-row items-center">
                              <Image
                                src={category.logo}
                                alt={category.title}
                                width={25}
                                height={25}
                                priority
                              />
                              {category.title}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <FormControl>
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter item price"
                      {...field}
                      value={item.price}
                      onChange={(e) =>
                        handleChange("price", parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="image">Image</FormLabel>
                  <FormControl>
                    <ImageInput
                      id="image"
                      image={item.image}
                      onChange={(file: File) => handleChange("image", file)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader /> : "Submit"}
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
}
