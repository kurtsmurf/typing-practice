import { useReducer } from "https://cdn.skypack.dev/preact/hooks";
import canvasConfetti from "https://cdn.skypack.dev/canvas-confetti";
import { isValidKeyEvent } from "./utils.js";

export const gameModes = {
  PLAYING: "PLAYING",
  WON: "WON",
  LOST: "LOST",
};

export const gameEvents = {
  KEY_DOWN: "KEY_DOWN",
  TYPE_CORRECT_KEY: "TYPE_CORRECT_KEY",
  TYPE_INCORRECT_KEY: "TYPE_INCORRECT_KEY",
  REACH_END: "REACH_END",
  RESET: "RESET",
};

export function useGameReducer(text) {
  const initialState = {
    text,
    mode: gameModes.PLAYING,
    position: 0,
  };

  const transitions = {
    [gameModes.PLAYING]: {
      [gameEvents.KEY_DOWN]: (state, event) => {
        if (!isValidKeyEvent(event.e)) {
          return state;
        }

        const isCorrect = event.e.key === state.text[state.position];
        const isLastPosition = state.position === state.text.length - 1;

        return isLastPosition && isCorrect
          ? reducer(state, { type: gameEvents.REACH_END })
          : isCorrect
            ? reducer(state, { type: gameEvents.TYPE_CORRECT_KEY })
            : reducer(state, { type: gameEvents.TYPE_INCORRECT_KEY });
      },
      [gameEvents.TYPE_CORRECT_KEY]: (state) => ({
        ...state,
        position: state.position + 1,
      }),
      [gameEvents.TYPE_INCORRECT_KEY]: (state) => ({
        ...state,
        mode: gameModes.LOST,
      }),
      [gameEvents.REACH_END]: (state) => {
        canvasConfetti();

        return {
          ...state,
          mode: gameModes.WON,
          position: state.position + 1,
        };
      },
      [gameEvents.RESET]: () => initialState,
    },
    [gameModes.WON]: {
      [gameEvents.RESET]: () => initialState,
    },
    [gameModes.LOST]: {
      [gameEvents.RESET]: () => initialState,
    },
  };

  function reducer(state, event) {
    const transition = transitions[state.mode][event.type];
    return transition ? transition(state, event) : state;
  }

  return useReducer(reducer, initialState);
}
