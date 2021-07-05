import { useState } from "https://cdn.skypack.dev/preact/hooks";
import { useWindowEventListener } from "./useWindowEventListener.js";

export const useWindowFocusDetection = () => {
  const [hasFocus, setHasFocus] = useState(true);

  useWindowEventListener("focus", () => { setHasFocus(true) });
  useWindowEventListener("blur", () => { setHasFocus(false) });

  return hasFocus;
};
