import { clsx, type ClassValue } from "clsx";
import { randomUUID } from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generate inticials from name
export function generateInitialFromName(fullName: string) {
  if (!fullName) {
    return "N/A";
  }

  // Check if the fullName is not empty and is a string
  if (typeof fullName === "string" && fullName.trim().length > 0) {
    // Split the fullName into an array of words
    const words = fullName.trim().split(" ");

    // Use map to extract the first letter of each word and convert it to uppercase
    const initials = words
      .filter((word): word is string => typeof word === "string")
      .map((word) => {
        if (typeof word === "string" && word.length > 0) {
          return word[0]!.toUpperCase();
        }
      });

    if (initials.length > 0) {
      return initials.join(""); // Join the initials together
    }
  }
  // Handle invalid input
  return "N/A"; // You can return a default value like 'N/A' for invalid input
}

export function isMacOs() {
  if (typeof window === "undefined") return false;

  return window.navigator.userAgent.includes("Mac");
}

export function getProductCategories() { }

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN").format(price);
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function generateCampaignCodeID() {
  // Generate a UUID and use the first 8 characters as the alias
  const uuid = randomUUID();
  const alias = uuid.substring(0, 8);
  return alias;
}
