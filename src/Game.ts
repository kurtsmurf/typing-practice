import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { gameEvents, gameModes, useGameReducer } from "./useGameReducer";
import { useCapsLockDetection } from "./useCapsLockDetection";
import { useWindowFocusDetection } from "./useWindowFocusDetection";
import { useWindowEventListener } from "./useWindowEventListener";
import canvasConfetti from "canvas-confetti";

export function Game({ text }) {
  const [state, dispatch] = useGameReducer(text);
  const windowHasFocus = useWindowFocusDetection();

  useEffect(() => {
    if (!windowHasFocus) {
      dispatch({ type: gameEvents.PAUSE });
    }
  }, [windowHasFocus]);

  useEffect(() => {
    if (state.mode === gameModes.WON) canvasConfetti()
  }, [state.mode])

  useWindowEventListener(
    "keydown",
    (e) => dispatch({ type: gameEvents.KEY_DOWN, e }),
  );

  return h(
    "div",
    { "data-mode": state.mode },
    h(TopBar, { state, dispatch }),
    h(GameText, { state }),
  );
}

const TopBar = ({ state, dispatch }) => {
  const capsLockIsOn = useCapsLockDetection();

  return (
    h(
      "div",
      { style: "min-height: 1.5rem;" },
      state.mode === gameModes.PAUSED && h(PausedPrompt, { dispatch }),
      state.mode === gameModes.LOST && h(LostPrompt, { state, dispatch }),
      state.mode === gameModes.WON && h(WonPrompt, { state, dispatch }),
      state.mode === gameModes.PLAYING && h(HeadsUpDisplay, { state, capsLockIsOn }),
    )
  )
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
  const wrongKey = state.keyOfDeath.trim() ? `"${state.keyOfDeath}"` : "space";
  const message = `You typed ${wrongKey}.`;

  return h(
    "div",
    {},
    h("strong", {}, message),
    nbsp,
    h(ResetButton, { dispatch }),
  );
};

const WonPrompt = ({ dispatch }) => {
  const message = "You succeeded!";

  return h(
    "div",
    {},
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
