import { useEffect, useRef } from 'react';

export function useInterval(
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
    const tick = setInterval(trigger, time);
    return () => clearTimeout(tick);
  }, [time]);
}
