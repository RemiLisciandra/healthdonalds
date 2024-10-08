"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "The name must contain at least 2 characters" })
    .max(25, { message: "The name must not exceed 25 characters" }),
});

export default function Login() {
  const setUsername = useUserStore((state) => state.setUserName);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (data: { username: string }) => {
    setUsername(data.username);
    router.push("/");
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 py-5">
      <div className="absolute -left-0 -top-0">
        <Image
          src="/images/categories/burger.png"
          alt="Burger"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute -right-0 -top-0">
        <Image
          src="/images/categories/dessert.png"
          alt="dessert"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute -bottom-7 -right-0">
        <Image
          src="/images/categories/fries.png"
          alt="fries"
          width={50}
          height={50}
        />
      </div>
      <div className="absolute -bottom-7 -left-0">
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
              <div className="w-[300px]">
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
