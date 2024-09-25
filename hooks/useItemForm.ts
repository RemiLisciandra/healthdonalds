import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { generateSlugByName } from "@/lib/utils";

type Item = {
  name: string;
  slug: string;
  category: string;
  price: number;
  image: File | null;
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must have at least 2 characters" })
    .max(50),
  category: z.string().min(1, { message: "Category is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be at least 1" })
    .max(1000),
  image: z.any(),
});

export const useItemForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [item, setItem] = useState<Item>({
    name: "",
    slug: "",
    category: "",
    price: 1,
    image: null,
  });
  const [slug, setSlug] = useState<string>("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: item,
  });

  useEffect(() => {
    if (item.name) {
      const generatedSlug = generateSlugByName(item.name);
      setSlug(generatedSlug);
      setItem((prevItem) => ({
        ...prevItem,
        slug: generatedSlug,
      }));
    }
  }, [item.name]);

  const handleChange = <K extends keyof Item>(field: K, value: Item[K]) => {
    setItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  const convertFileToBuffer = (file: File): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        resolve(Buffer.from(arrayBuffer));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const onSubmit = async (data: Item) => {
    setIsSubmitting(true);

    try {
      let imageBuffer: Buffer | null = null;
      if (data.image) {
        imageBuffer = await convertFileToBuffer(data.image);
      }

      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          slug: slug,
          category: data.category,
          price: data.price,
          image: imageBuffer ? imageBuffer.toString("base64") : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add the item");
      }

      toast.success("Item successfully added!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to add the item. Please try again.");
      console.error("Error adding item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, onSubmit, handleChange, item, isSubmitting, slug };
};
