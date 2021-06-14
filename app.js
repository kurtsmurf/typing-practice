import { h, render } from "https://cdn.skypack.dev/preact";
import { useEffect } from "https://cdn.skypack.dev/preact/hooks";
import useGameReducer from "./useGameReducer.js";
import modes from "./modes.js";
import events from "./events.js";

render(h(Game), document.getElementById("app"));

function Game() {
  const text =
    "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.";
  const [state, dispatch] = useGameReducer(text);

  useEffect(() => {
    const onKeyDown = (e) => dispatch({ type: events.KEY_DOWN, e });
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
      h("button", { onClick: () => dispatch({ type: events.RESET }) }, "Reset")
    )
  );
}

function Text({ text, position }) {
  return h(
    "div",
    { className: "text" },
    text.split("").map((char, index) => {
      const classList = [
        index < position && "typed",
        index === position && "cursor",
        char === " " && "space",
      ];

      return h("span", { className: className(classList) }, char);
    })
  );
}

function className(classList) {
  return classList.filter((x) => x).join(" ");
}
