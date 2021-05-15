import { h } from "https://cdn.skypack.dev/preact";
import { useEffect } from "https://cdn.skypack.dev/preact/hooks";
import { useGameReducer, gameModes, gameEvents } from "./useGameReducer.js";

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
    h(Prompt, { mode: state.mode, dispatch }),
    h(Text, { text: state.text, position: state.position })
  );
}

function Prompt({ mode, dispatch }) {
  const displayed = [gameModes.LOST, gameModes.WON].includes(mode);
  const message = mode === gameModes.LOST ? "You failed." : "You succeeded!";
  const nbsp = "\u00a0";

  return (
    displayed &&
    h(
      "div",
      { className: "prompt" },
      h("strong", {}, message),
      nbsp,
      h("button", { onClick: () => dispatch({ type: gameEvents.RESET }) }, "Reset")
    )
  );
}

function Text({ text, position }) {
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