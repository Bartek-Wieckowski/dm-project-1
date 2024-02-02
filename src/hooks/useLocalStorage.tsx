import { useState, useEffect, Dispatch, SetStateAction } from "react";

type UseLocalStorageType<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorage<T>(initialState: T, key: string): UseLocalStorageType<T> {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
