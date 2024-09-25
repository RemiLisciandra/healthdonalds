import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateIdByName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}
