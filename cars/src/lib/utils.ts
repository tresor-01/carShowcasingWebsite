import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parsePrice(price: string): number {
  return parseInt(price.replace(/[^0-9]/g, "")) || 0;
}

export function parseSpeed(speed: string): number {
  return parseInt(speed.replace(/[^0-9]/g, "")) || 0;
}

export function parseHP(hp: string): number {
  return parseInt(hp.replace(/[^0-9]/g, "")) || 0;
}

export function parseAcc(acc: string): number {
  const match = acc.match(/(\d+\.\d+|\d+)/);
  return match ? parseFloat(match[0]) : 0;
}