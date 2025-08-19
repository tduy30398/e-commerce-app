import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formattedCapitalize = (str: string) => {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
};

export const calculatePercentage = (num1: number, num2: number) => {
  if (num2 === 0) {
    return 0;
  }
  return Math.round(100 - (num1 / num2) * 100);
};

export const delay = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
