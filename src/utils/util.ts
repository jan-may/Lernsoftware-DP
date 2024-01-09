import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
