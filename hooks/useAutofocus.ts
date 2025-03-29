import { useEffect, useState } from "react";

export function useAutofocus() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isRefreshing) {
      const timeout = setTimeout(() => {
        setIsRefreshing(false);
      }, 300); // Slight delay to simulate refocus

      return () => clearTimeout(timeout); // Clean up
    }
  }, [isRefreshing]);

  const onTap = () => {
    setIsRefreshing(true);
  };

  return { isRefreshing, onTap };
}
