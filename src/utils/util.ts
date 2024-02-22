import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Problem } from "../feautures/settings/settingsSlice";
import { fibCsCode } from "../trees/fibonacci";

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

export function base64Encode(str: string) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function base64Decode(str: string) {
  return decodeURIComponent(escape(atob(str)));
}

export function getInitEditorCode(problem: Problem) {
  switch (problem) {
    case "fibonacci":
      return fibCsCode;
    // other cases
    // ...
    default:
      return "";
  }
}

export function refactorPath(path: string) {
  // Find the last occurrence of //
  const lastIndex = path.lastIndexOf("//");

  if (lastIndex !== -1) {
    // Replace // with \ and return the modified path
    return path.substring(0, lastIndex) + "\\" + path.substring(lastIndex + 2);
  }

  // If // is not found, return the original path
  return path;
}
