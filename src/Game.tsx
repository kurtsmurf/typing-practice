import { FunctionComponent } from "preact";
import { useEffect, useRef } from "preact/hooks";
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
    const prefersReducedMotion =
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (!prefersReducedMotion && state.mode === "WON") canvasConfetti();
  }, [state.mode]);

  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    if (!cursor) return;
    const cursorRect = cursor.getBoundingClientRect();
    const fullyVisible = cursorRect.top >= 0 &&
      cursorRect.left >= 0 &&
      cursorRect.bottom <=
        (window.innerHeight ||
          document.documentElement.clientHeight) && /* or $(window).height() */
      cursorRect.right <=
        (window.innerWidth ||
          document.documentElement.clientWidth); /* or $(window).width() */

    if (!fullyVisible) cursor.scrollIntoView({ block: "center" });
  }, [state.position]);

  useWindowEventListener(
    "keydown",
    (e: Event) => {
      // @ts-ignore
      const isButton = e.target.tagName.toLowerCase() === "button";

      // @ts-ignore
      if (e.key === " " && !isButton) e.preventDefault();

      if (!isButton) {
        dispatch({ type: "KEY_DOWN", keyboardEvent: e as KeyboardEvent });
      }
    },
  );

  return (
    <div data-mode={state.mode}>
      <TopBar state={state} dispatch={dispatch} />
      <div className="text-wrapper">
        <GameText state={state} />
        <TextForeground state={state} />
      </div>
    </div>
  );
};

const TopBar: FunctionComponent<
  { state: gameState; dispatch: (action: gameEvent) => void }
> = ({ state, dispatch }) => (
  <div style="min-height: 1.5rem; position: sticky; top: 0; background-color: color-mix(in srgb, canvas 90%, transparent); z-index: 1;">
    <progress style="width: 100%;" value={state.position / state.text.length} />
    {state.mode === "PAUSED" && <PausedPrompt dispatch={dispatch} />}
    {state.mode === "LOST" && <LostPrompt state={state} dispatch={dispatch} />}
    {state.mode === "WON" && <WonPrompt dispatch={dispatch} />}
    {state.mode === "PLAYING" && <ProgressIndicator state={state} />}
  </div>
);

const ProgressIndicator: FunctionComponent<{ state: gameState }> = (
  { state },
) => {
  const ratio = state.position / state.text.length;
  const percent = Math.floor(100 * ratio);

  return (
    <div>
      <strong>{percent + "%"}</strong>
    </div>
  );
};

const PausedPrompt: FunctionComponent<
  { dispatch: (action: gameEvent) => void }
> = ({ dispatch }) => {
  useWindowEventListener(
    "keypress",
    () => dispatch({ type: "RESUME" }),
  );

  return <strong>Press any key to continue.</strong>;
};

const nbsp = "\u00a0";

const LostPrompt: FunctionComponent<
  { state: gameState; dispatch: (action: gameEvent) => void }
> = ({ state, dispatch }) => (
  <div>
    <strong>
      {`You typed ${
        state.keyOfDeath?.trim() ? `"${state.keyOfDeath}"` : "space"
      }.`}
    </strong>
    {nbsp}
    <ResetButton dispatch={dispatch} />
  </div>
);

const WonPrompt: FunctionComponent<{
  dispatch: (action: gameEvent) => void;
}> = ({ dispatch }) => (
  <div>
    <strong>You succeeded!</strong>
    {nbsp}
    <ResetButton dispatch={dispatch} />
  </div>
);

const ResetButton: FunctionComponent<
  { dispatch: (action: gameEvent) => void }
> = ({ dispatch }) => {
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    button.current?.focus();
  }, [button.current]);

  return (
    <button ref={button} onClick={() => dispatch({ type: "RESET" })}>
      Reset
    </button>
  );
};

const GameText: FunctionComponent<{ state: gameState }> = ({ state }) => {
  const GameChar = (char: string, index: number) => (
    <span
      className={fromClassNameList(
        index < state.position && "typed",
        char === " " && "space",
        index === state.position && "cursor",
      )}
    >
      {char}
    </span>
  );

  return (
    <div className="text">
      {state.text.split("").map(GameChar)}
    </div>
  );
};

/**
 * why does this exist
 *
 * in order to have the cursor remain clear on lose game
 * ie not blurred along with the rest of the text
 * we need an un-blurred version of the cursor to show
 * in front of the blurred text.
 *
 * to that end
 * we hang a duplicate of the game text
 * in front of the game text
 * that is invisible mostly
 * most of the time
 * except for the current character
 * which is visible when you lose
 *
 * @param param0
 * @returns
 */
const TextForeground: FunctionComponent<{ state: gameState }> = ({ state }) => {
  const GameChar = (char: string, index: number) => (
    <span
      className={fromClassNameList(
        char === " " && "space",
        index === state.position && "cursor",
      )}
    >
      {char}
    </span>
  );

  return (
    <div className="text-foreground">
      {state.text.split("").map(GameChar)}
    </div>
  );
};

const fromClassNameList = (...classNames: (string | boolean)[]) => {
  return classNames.filter((n) => !!n).join(" ");
};
