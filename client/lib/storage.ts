import { STORAGE } from './constants';

export const setAccessTokenStorage = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE.ACCESS_TOKEN, token);
  }
};

export const getAccessTokenStorage = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE.ACCESS_TOKEN);
  }
  return null;
};

export const removeAccessTokenStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE.ACCESS_TOKEN);
  }
};
