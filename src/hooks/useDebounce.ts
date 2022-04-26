import { useRef, useCallback } from "react";

export const useDebounce = (f: CallableFunction, ms: number = 500) => {
 const timeout: { current: NodeJS.Timeout | null } = useRef(null);

  return useCallback((...arg: any) => {
    clearTimeout(timeout.current as NodeJS.Timeout);
    if (typeof ms === 'number') {
      timeout.current = setTimeout(() => f(...arg), ms);
    }
  }, [ms, f]);
}
