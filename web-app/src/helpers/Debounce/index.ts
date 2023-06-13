import { useRef } from "react";

export default function useDebounce(
  fn: (...args: any[]) => any,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function debouncedFn(...args: any[]) {
    clearTimeout(timeoutRef.current as NodeJS.Timeout);
    timeoutRef.current = setTimeout(() => {
      fn(...args);
    }, delay);
  }
  return debouncedFn;
}
