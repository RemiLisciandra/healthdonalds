"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/categories";
import { ImageInput } from "@/components/admin/item/ImageInput";
import Image from "next/image";
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
import { useItemForm } from "@/hooks/useItemForm";
import { useRouter } from "next/navigation";

export default function NewItem() {
  const { form, onSubmit, handleChange, item, isSubmitting } = useItemForm();

  const router = useRouter();

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
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange("name", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="slug">Slug</FormLabel>
                  <FormControl>
                    <Input
                      id="slug"
                      placeholder="Generated slug"
                      {...field}
                      value={item.slug}
                      readOnly
                      onChange={(e) => handleChange("slug", e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleChange("category", value);
                      }}
                      value={field.value}
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
                      onChange={(e) => {
                        field.onChange(e);
                        handleChange("price", parseFloat(e.target.value));
                      }}
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
