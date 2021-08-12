import { useRef, useEffect, useState } from "https://cdn.skypack.dev/preact/hooks"

export const useFocusWithinDetection = () => {
  const ref = useRef()
  const [hasFocusWithin, setHasFocusWithin] = useState(false)

  useEffect(() => {
    ref.current.addEventListener("focusin", () => setHasFocusWithin(true) );
    ref.current.addEventListener("focusout", () => setHasFocusWithin(false) );
  }, [ ref.current ])

  return [ref, hasFocusWithin]
}
