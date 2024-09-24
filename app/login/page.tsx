"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "The name must contain at least 2 characters" })
    .max(25, { message: "The name must not exceed 25 characters" }),
});

export default function Login() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: { username: string }) => {
    console.log("Formulaire soumis avec : ", data);
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 py-5">
      <div className="absolute -left-12 -top-0">
        <Image
          src="/images/categories/burger.png"
          alt="Burger"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute -right-10 -top-0">
        <Image
          src="/images/categories/dessert.png"
          alt="dessert"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute -bottom-7 -right-10">
        <Image
          src="/images/categories/fries.png"
          alt="fries"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute -bottom-7 -left-10">
        <Image
          src="/images/categories/nuggets.png"
          alt="nuggets"
          width={50}
          height={50}
        />
      </div>
      <h1 className="text-xl font-bold text-gray-600">
        Welcome to Healthdonalds !
      </h1>
      <div className="mt-3">
        <p className="text-lg text-gray-600">
          Login first to access our application
        </p>
        <div className="mt-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-row gap-2"
            >
              <div className="w-[200px]">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
