import { useEffect } from "preact/hooks";

export const useWindowEventListener = (
  event: string,
  listener: (e: Event) => void,
  deps = [],
) => {
  useEffect(() => {
    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  }, deps);
};
