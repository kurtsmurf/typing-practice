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
    h(
      "div",
      { style: "min-height: 1.4rem;" }, // PromptOrHeadsUpDisplay
      state.mode === gameModes.PAUSED && h(ResumePrompt, { dispatch }),
      [gameModes.LOST, gameModes.WON].includes(state.mode) &&
        h(ResetPrompt, { state, dispatch }),
      state.mode === gameModes.PLAYING &&
        h(
          "div",
          { className: "heads-up-display" }, // HeadsUpDisplay
          h(ProgressIndicator, { state }),
          capsLockIsOn && h(CapsLockWarning),
        ),
    ),
    h(GameText, { state }),
  );
}

const CapsLockWarning = () =>
  h("strong", { className: "caps-lock-warning" }, "caps lock");

const ResumePrompt = ({ dispatch }) => {
  useWindowEventListener(
    "keypress",
    () => dispatch({ type: gameEvents.RESUME }),
  );

  return h("strong", {}, "Press any key to continue.");
};

const ProgressIndicator = ({ state }) => {
  const ratio = state.position / state.text.length;
  const percent = Math.round(100 * ratio);

  return h("strong", {}, percent + "%");
};

const ResetPrompt = ({ state, dispatch }) => {
  const nbsp = "\u00a0";
  const message = state.mode === gameModes.LOST
    ? "You failed."
    : "You succeeded!";

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
};

const GameText = ({ state }) => {
  const isSpace = state.text[state.position] === " "

  return h(
    "div",
    { className: "text" },
    state.text.split("").map((char, index) =>
      h(
        "span",
        {
          className: fromClassNameList(
            index < state.position && "typed",
            isSpace && "space",
            index === state.position && "cursor"
          )
        },
        char,
      )
    ),
  );
};

const fromClassNameList = (...classNames) => {
  return classNames.filter(n => !!n).join(" ")
}
