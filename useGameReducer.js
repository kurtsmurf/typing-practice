import { useReducer } from "https://cdn.skypack.dev/preact/hooks";
import canvasConfetti from "https://cdn.skypack.dev/canvas-confetti";
import { isValidKeyEvent } from "./utils.js";

export const gameModes = {
  PLAYING: "PLAYING",
  WON: "WON",
  LOST: "LOST",
  PAUSED: "PAUSED",
};

export const gameEvents = {
  KEY_DOWN: "KEY_DOWN",
  RESET: "RESET",
  PAUSE: "PAUSE",
  RESUME: "RESUME",
};

export const useGameReducer = (text) => {
  const initialState = {
    text,
    mode: gameModes.PAUSED,
    position: 0,
    keyOfDeath: undefined,
  };

  const transitions = {
    [gameModes.PLAYING]: {
      [gameEvents.KEY_DOWN]: (state, event) => {
        if (!isValidKeyEvent(event.e)) {
          return state;
        }

        const transitions = {
          ADVANCE: (state) => ({
            ...state,
            position: state.position + 1,
          }),
          LOSE: (state, keyOfDeath) => ({
            ...state,
            mode: gameModes.LOST,
            keyOfDeath
          }),
          WIN: (state) => {
            canvasConfetti();
    
            return {
              ...state,
              mode: gameModes.WON,
              position: state.position + 1,
            };
          },    
        }

        const isCorrect = event.e.key === state.text[state.position];
        const isLastPosition = state.position === state.text.length - 1;

        return isLastPosition && isCorrect
          ? transitions.WIN(state)
          : isCorrect
          ? transitions.ADVANCE(state)
          : transitions.LOSE(state, event.e.key)
      },
      [gameEvents.RESET]: () => initialState,
      [gameEvents.PAUSE]: (state) => ({
        ...state,
        mode: gameModes.PAUSED,
      }),
    },
    [gameModes.WON]: {
      [gameEvents.RESET]: () => initialState,
    },
    [gameModes.LOST]: {
      [gameEvents.RESET]: () => initialState,
    },
    [gameModes.PAUSED]: {
      [gameEvents.RESUME]: (state) => ({
        ...state,
        mode: gameModes.PLAYING,
      }),
    },
  };

  const reducer = (state, event) => {
    const transition = transitions[state.mode][event.type];
    return transition ? transition(state, event) : state;
  }

  return useReducer(reducer, initialState);
}
