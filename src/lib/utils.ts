import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BASE_PATH = process.env.NODE_ENV === "production" ? "/aziz-el-mire-website" : "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
