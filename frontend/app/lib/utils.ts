import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToShop() {
  document.getElementById("shop")?.scrollIntoView({ block:"start" , behavior: "smooth" });
}
