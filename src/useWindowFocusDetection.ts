import { useState } from "preact/hooks";
import { useWindowEventListener } from "./useWindowEventListener";

export const useWindowFocusDetection = () => {
  const [hasFocus, setHasFocus] = useState(true);

  useWindowEventListener("focus", () => {
    setHasFocus(true);
  });
  useWindowEventListener("blur", () => {
    setHasFocus(false);
  });

  return hasFocus;
};
