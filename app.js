import { h, render } from "https://cdn.skypack.dev/preact";
import { isValidKeyEvent } from "./utils.js";
import useGameReducer from "./useGameReducer.js";
import modes from './modes.js'
import events from './events.js'

const text =
  "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.";

render(h(Game, { text }), document.getElementById("app"));

function Game({ text }) {
  const [state, dispatch] = useGameReducer();
  const isCorrect = (key) => key === text[state.position];
  const isLastPosition = state.position === text.length - 1;

  function type(key) {
    if (isLastPosition && isCorrect(key)) {
      dispatch(events.REACH_END);
    } else if (isCorrect(key)) {
      dispatch(events.TYPE_CORRECT_KEY);
    } else {
      dispatch(events.TYPE_INCORRECT_KEY);
    }
  }

  document.body.onkeydown = function (e) {
    if (isValidKeyEvent(e)) {
      type(e.key);
    }
  };

  return h(
    "div",
    {
      "data-mode": state.mode,
    },
    h(Prompt, { mode: state.mode, dispatch }),
    h(Text, { text, position: state.position })
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
      h("button", { onClick: () => dispatch(events.RESET) }, "Reset")
    )
  );
}

function Text({ text, position }) {
  return h(
    "div",
    {
      className: "text",
    },
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
