import { useEffect } from "https://cdn.skypack.dev/preact/hooks";

export const useWindowEventListener = (event, listener) => {
  useEffect(() => {
    window.addEventListener(event, listener);
    return () => window.removeEventListener(event, listener);
  }, []);
};
