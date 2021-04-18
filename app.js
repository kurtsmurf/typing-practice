import { useEffect } from "https://cdn.skypack.dev/preact/hooks";
import { h, render } from "https://cdn.skypack.dev/preact";
import modes from './modes.js'
import { useGame } from "./useGame.js";

const text =
  "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.";

render(h(Game, { text }), document.getElementById("app"));

function Game({ text }) {
  const [state, onKeyDown, reset] = useGame(text)

  useEffect(() => {
    document.body.addEventListener('keydown', onKeyDown)
    return () => document.body.removeEventListener('keydown', onKeyDown)
  }, [state, onKeyDown])

  return h(
    "div",
    { "data-mode": state.mode },
    h(Prompt, { mode: state.mode, reset }),
    h(Text, { text, position: state.position })
  );
}

function Prompt({ mode, reset }) {
  const displayed = [modes.LOST, modes.WON].includes(mode);
  const message = mode === modes.LOST ? "You failed." : "You succeeded!";
  const nbsp = "\u00a0";

  return (
    displayed &&
    h(
      "div",
      { className: "prompt" },
      h("strong", {}, message),
      nbsp,
      h("button", { onClick: reset }, "Reset")
    )
  );
}

function Text({ text, position }) {
  const tokens = text.split("")
  const classFrom = index => index < position
    ? "typed"
    : index === position
      ? "cursor"
      : ""

  return h(
    "div",
    { className: "text" },
    tokens.map((char, index) =>
      h(
        "span",
        { className: classFrom(index) },
        char
      )
    )
  );
}
