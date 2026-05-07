import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

export function formatSpeed(speed: number): string {
  return `${speed} mph`;
}

export function formatHP(hp: number): string {
  return `${hp.toLocaleString()} HP`;
}

export function formatAcc(acc: number): string {
  return `${acc}s (0-60mph)`;
}
