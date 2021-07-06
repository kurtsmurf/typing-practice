import { useEffect, useState } from "https://cdn.skypack.dev/preact/hooks";
import { useWindowEventListener } from "./useWindowEventListener.js"

export const useCapsLockDetection = () => {
  const [capsLockIsOn, setCapsLockIsOn] = useState(undefined);

  const onKeyDown = (e) => {
    setCapsLockIsOn(e.getModifierState && e.getModifierState( 'CapsLock' ));
  };
  
  useWindowEventListener("keydown", onKeyDown);
  
  return capsLockIsOn;
};
