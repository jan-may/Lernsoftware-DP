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

export function countDigits(n: number): number {
  let count = 0;
  while (n != 0) {
    n = Math.floor(n / 10);
    count++;
  }
  return count;
}

export function scale(value: number): number {
  const scaleFactor = 10;
  const size = 20 + countDigits(value) * scaleFactor;
  return size;
}
