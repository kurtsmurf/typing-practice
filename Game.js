import { h } from "https://cdn.skypack.dev/preact";
import { useEffect } from "https://cdn.skypack.dev/preact/hooks";
import { gameEvents, gameModes, useGameReducer } from "./useGameReducer.js";
import { useCapsLockDetection } from "./useCapsLockDetection.js";
import { useWindowFocusDetection } from "./useWindowFocusDetection.js";
import { useWindowEventListener } from "./useWindowEventListener.js";

export function Game({ text }) {
  const [state, dispatch] = useGameReducer(text);
  const windowHasFocus = useWindowFocusDetection();
  const capsLockIsOn = useCapsLockDetection();

  useEffect(() => {
    if (!windowHasFocus) {
      dispatch({ type: gameEvents.PAUSE });
    }
  }, [windowHasFocus]);

  useWindowEventListener(
    "keydown",
    (e) => dispatch({ type: gameEvents.KEY_DOWN, e }),
  );

  return h(
    "div",
    { "data-mode": state.mode },
    state.mode !== gameModes.PAUSED && capsLockIsOn && h(CapsLockIndicator),
    state.mode === gameModes.PAUSED && h(ResumePrompt, { dispatch }),
    h(Prompt, { mode: state.mode, dispatch }),
    h(GameText, { text: state.text, position: state.position }),
  );
}

const ResumePrompt = ({ dispatch }) => {
  useWindowEventListener(
    "keypress",
    () => dispatch({ type: gameEvents.RESUME }),
  );

  return h("strong", {}, "Press any key to continue.");
};

function CapsLockIndicator() {
  return h("strong", { style: "color: red;" }, "caps lock");
}

function Prompt({ mode, dispatch }) {
  if (![gameModes.LOST, gameModes.WON].includes(mode)) return;

  const nbsp = "\u00a0";
  const message = mode === gameModes.LOST ? "You failed." : "You succeeded!";

  function action() {
    dispatch({ type: gameEvents.RESET });
  }

  return h(
    "div",
    { className: "prompt" },
    h("strong", {}, message),
    nbsp,
    h("button", { onClick: action }, "Reset"),
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
          className: index < position
            ? "typed"
            : index === position
            ? "cursor"
            : "",
        },
        char,
      )
    ),
  );
}
