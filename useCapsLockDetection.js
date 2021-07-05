import { useEffect, useState } from "https://cdn.skypack.dev/preact/hooks";

export const useCapsLockDetection = () => {
  const [capsLockIsOn, setCapsLockIsOn] = useState(undefined);

  const onKeyDown = (e) => {
    const isCapsLockModifier = e.getModifierState("CapsLock");
    const isCapsLockKey = e.key === "CapsLock";

    setCapsLockIsOn(isCapsLockModifier !== isCapsLockKey);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", onKeyDown);
    return () => document.body.removeEventListener("keydown", onKeyDown);
  }, [setCapsLockIsOn]);

  return capsLockIsOn;
};
