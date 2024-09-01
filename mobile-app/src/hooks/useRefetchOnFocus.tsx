import { useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";

export default function useRefetchOnFocus(refetch: () => void, canRefetch: boolean = true) {
  const [isScreenFocused, setIsScreenFocused] = useState(false);

  useFocusEffect(() => {
    setIsScreenFocused(true);
    return () => setIsScreenFocused(false);
  });

  useEffect(() => {
    if (isScreenFocused && canRefetch) {
      refetch();
    }
  }, [canRefetch, isScreenFocused]);
}
