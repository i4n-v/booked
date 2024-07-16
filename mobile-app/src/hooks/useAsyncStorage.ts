import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function useAsyncStorage<T = any>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>();

  async function getStoredValue(key: string, initialValue?: T) {
    try {
      const item = await AsyncStorage.getItem(key);
      const value = item ? JSON.parse(item) : initialValue;
      setStoredValue(value);
    } catch (error) {
      console.log(error);
      setStoredValue(initialValue);
    }
  }

  useEffect(() => {
    getStoredValue(key, initialValue);
  }, [key, initialValue]);

  const setValue = async (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
