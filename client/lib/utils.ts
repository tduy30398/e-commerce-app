import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ROUTES } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoute = (route: string, locale: string) => {
  if (route === ROUTES.HOME) {
    return `/${locale}`;
  }
  return `/${locale}${route}`;
};

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

export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const formatKebabSegment = (segment: string) => {
  return segment
    .split('-') // split by hyphen
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
    .join(' ');
};

export function formatNumberWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
