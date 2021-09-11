import { useState } from "preact/hooks";
import { useWindowEventListener } from "./useWindowEventListener";

export const useCapsLockDetection = () => {
  const [capsLockIsOn, setCapsLockIsOn] = useState(undefined);

  useWindowEventListener("keydown", (e) => {
    // If getModifierState is not defined, don't even try.
    if (!e.getModifierState) return;

    // We assume that the game was unlocked by pressing a key.
    if (e.key === "CapsLock") {
      setCapsLockIsOn(!capsLockIsOn);
    } else {
      setCapsLockIsOn(e.getModifierState("CapsLock"));
    }
  }, [capsLockIsOn, setCapsLockIsOn]);

  return capsLockIsOn;
};
