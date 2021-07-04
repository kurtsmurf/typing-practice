import { h } from "https://cdn.skypack.dev/preact";
import { useEffect } from "https://cdn.skypack.dev/preact/hooks";
import { useGameReducer, gameModes, gameEvents } from "./useGameReducer.js";
import { useCapsLockDetection } from "./useCapsLockDetection.js"

export function Game({ text }) {
  const [state, dispatch] = useGameReducer(text);

  useEffect(() => {
    const onKeyDown = (e) => dispatch({ type: gameEvents.KEY_DOWN, e });
    document.body.addEventListener("keydown", onKeyDown);
    return () => document.body.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  return h(
    "div",
    { "data-mode": state.mode },
    h(CapsLockIndicator),
    h(GamePrompt, { mode: state.mode, dispatch }),
    h(GameText, { text: state.text, position: state.position })
  );
}

function CapsLockIndicator() {
  const capsLockIsOn = useCapsLockDetection()

  return capsLockIsOn && h("strong", { style: "color: red;" }, "CAPS LOCK")
}

function GamePrompt({ mode, dispatch }) {
  if (![gameModes.LOST, gameModes.WON].includes(mode)) {
    return
  }

  const message = mode === gameModes.LOST ? "You failed." : "You succeeded!";

  function action() { dispatch({ type: gameEvents.RESET }) }

  return h(Prompt, { message, action })
}

function Prompt({ message, action }) {
  const nbsp = "\u00a0";
  return (
    h(
      "div",
      { className: "prompt" },
      h("strong", {}, message),
      nbsp,
      h("button", { onClick: action }, "Reset")
    )
  );
}

function GameText({ text, position }) {
  return h(
    "div",
    { className: "text" },
    text.split("").map((char, index) =>
      h(
        "span",
        {
          className:
            index < position ? "typed" : index === position ? "cursor" : "",
        },
        char
      )
    )
  );
}
