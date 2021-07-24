import { h } from "https://cdn.skypack.dev/preact";
import { useEffect, useRef } from "https://cdn.skypack.dev/preact/hooks";
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
      { style: "min-height: 1.5rem;" },
      state.mode === gameModes.PAUSED && h(PausedPrompt, { dispatch }),
      state.mode === gameModes.LOST && h(LostPrompt, { state, dispatch }),
      state.mode === gameModes.WON && h(WonPrompt, { state, dispatch }),
      state.mode === gameModes.PLAYING &&
        h(HeadsUpDisplay, { state, capsLockIsOn }),
    ),
    h(GameText, { state }),
  );
}

const HeadsUpDisplay = ({ state, capsLockIsOn }) => (
  h(
    "div",
    { className: "heads-up-display" },
    h(ProgressIndicator, { state }),
    capsLockIsOn && h(CapsLockWarning),
  )
);

const CapsLockWarning = () =>
  h("strong", { className: "caps-lock-warning" }, "caps lock");

const ProgressIndicator = ({ state }) => {
  const ratio = state.position / state.text.length;
  const percent = Math.round(100 * ratio);

  return h("strong", {}, percent + "%");
};

const nbsp = "\u00a0";

const PausedPrompt = ({ dispatch }) => {
  useWindowEventListener(
    "keypress",
    () => dispatch({ type: gameEvents.RESUME }),
  );

  return h("strong", {}, "Press any key to continue.");
};

const LostPrompt = ({ state, dispatch }) => {
  const wrongKey = state.keyOfDeath.trim() || "space";
  const message = `You typed ${wrongKey}.`;

  return h(
    "div",
    { className: "prompt" },
    h("strong", {}, message),
    nbsp,
    h(ResetButton, { dispatch }),
  );
};

const WonPrompt = ({ dispatch }) => {
  const message = "You succeeded!";

  return h(
    "div",
    { className: "prompt" },
    h("strong", {}, message),
    nbsp,
    h(ResetButton, { dispatch }),
  );
};

const ResetButton = ({ dispatch }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref]);

  const onClick = () => dispatch({ type: gameEvents.RESET });

  return h("button", { onClick, ref: ref }, "Reset");
};

const GameText = ({ state }) => {
  const GameChar = (char, index) => (
    h(
      "span",
      {
        className: fromClassNameList(
          index < state.position && "typed",
          char === " " && "space",
          index === state.position && "cursor",
        ),
      },
      char,
    )
  );

  return h(
    "div",
    { className: "text" },
    state.text.split("").map(GameChar),
  );
};

const fromClassNameList = (...classNames) => {
  return classNames.filter((n) => !!n).join(" ");
};
