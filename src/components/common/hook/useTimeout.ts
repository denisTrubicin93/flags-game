import { useEffect, useRef } from 'react';

export function useTimeout(
  callback: (() => void) | undefined,
  time: number
): void {
  const fn = useRef(callback);
  useEffect(() => {
    fn.current = callback;
  }, [callback]);
  useEffect(() => {
    if (time < 0) {
      return;
    }

    const trigger = () => fn.current && fn.current();
    const tick = setTimeout(trigger, time);
    return () => clearTimeout(tick);
  }, [time]);
}
