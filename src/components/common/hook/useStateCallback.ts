import { useCallback, useEffect, useRef, useState } from 'react';

export function useStateCallback<T>(
  initialState: T,
): [T, (state: T, callbackFunc?: Function) => void] {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<Function | null>(null);

  const setStateCallback = useCallback((state: T, callbackFunc?: Function) => {
    if (callbackFunc) {
      callbackRef.current = callbackFunc;
    }
    setState(state);
  }, []);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, setStateCallback];
}
