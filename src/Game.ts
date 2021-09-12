import { FunctionComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { gameEvent, gameState, useGameReducer } from "./useGameReducer";
import { useWindowFocusDetection } from "./useWindowFocusDetection";
import { useWindowEventListener } from "./useWindowEventListener";
import canvasConfetti from "canvas-confetti";

export const Game: FunctionComponent<{ text: string }> = ({ text }) => {
  const [state, dispatch] = useGameReducer(text);
  const windowHasFocus = useWindowFocusDetection();

  useEffect(() => {
    if (!windowHasFocus) dispatch({ type: "PAUSE" });
  }, [windowHasFocus]);

  useEffect(() => {
    if (state.mode === "WON") canvasConfetti();
  }, [state.mode]);

  useWindowEventListener(
    "keydown",
    (e: Event) =>
      dispatch({ type: "KEY_DOWN", keyboardEvent: e as KeyboardEvent }), // hmmm...
  );

  return h(
    "div",
    { "data-mode": state.mode },
    h(TopBar, { state, dispatch }),
    h(GameText, { state }),
  );
};

const TopBar: FunctionComponent<
  { state: gameState; dispatch: (action: gameEvent) => void }
> = ({ state, dispatch }) => {
  return (
    h(
      "div",
      { style: "min-height: 1.5rem;" },
      state.mode === "PAUSED" && h(PausedPrompt, { dispatch }),
      state.mode === "LOST" && h(LostPrompt, { state, dispatch }),
      state.mode === "WON" && h(WonPrompt, { dispatch }),
      state.mode === "PLAYING" && h(HeadsUpDisplay, { state }),
    )
  );
};

const HeadsUpDisplay: FunctionComponent<{ state: gameState }> = ({ state }) => (
  h(
    "div",
    { className: "heads-up-display" },
    h(ProgressIndicator, { state }),
  )
);

const ProgressIndicator: FunctionComponent<{ state: gameState }> = (
  { state },
) => {
  const ratio = state.position / state.text.length;
  const percent = Math.round(100 * ratio);

  return h("strong", {}, percent + "%");
};

const nbsp = "\u00a0";

const PausedPrompt: FunctionComponent<
  { dispatch: (action: gameEvent) => void }
> = ({ dispatch }) => {
  useWindowEventListener(
    "keypress",
    () => dispatch({ type: "RESUME" }),
  );

  return h("strong", {}, "Press any key to continue.");
};

const LostPrompt: FunctionComponent<
  { state: gameState; dispatch: (action: gameEvent) => void }
> = ({ state, dispatch }) => {
  const wrongKey = state.keyOfDeath?.trim() ? `"${state.keyOfDeath}"` : "space";
  const message = `You typed ${wrongKey}.`;

  return h(
    "div",
    {},
    h("strong", {}, message),
    nbsp,
    h(ResetButton, { dispatch }),
  );
};

const WonPrompt: FunctionComponent<{ dispatch: (action: gameEvent) => void }> =
  ({ dispatch }) => {
    const message = "You succeeded!";

    return h(
      "div",
      {},
      h("strong", {}, message),
      nbsp,
      h(ResetButton, { dispatch }),
    );
  };

const ResetButton: FunctionComponent<
  { dispatch: (action: gameEvent) => void }
> = ({ dispatch }) => {
  const onClick = () => dispatch({ type: "RESET" });

  return h("button", { onClick }, "Reset");
};

const GameText: FunctionComponent<{ state: gameState }> = ({ state }) => {
  const GameChar = (char: string, index: number) => (
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

const fromClassNameList = (...classNames: (string | boolean)[]) => {
  return classNames.filter((n) => !!n).join(" ");
};
