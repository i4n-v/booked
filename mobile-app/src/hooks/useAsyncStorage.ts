import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type IAsyncStorageSetStateValue<T> = T | ((value: T) => T);
type IAsyncStorageSetState<T> = (value: IAsyncStorageSetStateValue<T>) => Promise<void>;
type IAsyncStorageReturn<T> = [T, IAsyncStorageSetState<T>];

export default function useAsyncStorage<T>(key: string, initialValue: T): IAsyncStorageReturn<T> {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  async function getStoredValue(key: string, initialValue: T) {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      setStoredValue(initialValue);
    }
  }

  useEffect(() => {
    getStoredValue(key, initialValue);
  }, [key, initialValue]);

  const setValue: IAsyncStorageSetState<T> = async (value) => {
    try {
      let valueToStore = value;

      if (value instanceof Function) {
        valueToStore = value(storedValue);
      }

      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
