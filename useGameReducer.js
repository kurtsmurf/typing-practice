import { useReducer } from "https://cdn.skypack.dev/preact/hooks";
import modes from "./modes.js";
import events from "./events.js";
import canvasConfetti from "https://cdn.skypack.dev/canvas-confetti";

const initialState = {
  mode: modes.PLAYING,
  position: 0,
};

const transitions = {
  [modes.PLAYING]: {
    [events.TYPE_CORRECT_KEY]: (state) => ({
      ...state,
      position: state.position + 1,
    }),
    [events.TYPE_INCORRECT_KEY]: (state) => ({
      ...state,
      mode: modes.LOST,
    }),
    [events.REACH_END]: (state) => {
      canvasConfetti();

      return {
        ...state,
        mode: modes.WON,
        position: state.position + 1,
      };
    },
    [events.RESET]: () => initialState,
  },
  [modes.WON]: {
    [events.RESET]: () => initialState,
  },
  [modes.LOST]: {
    [events.RESET]: () => initialState,
  },
};

function reducer(state, event) {
  const transition = transitions[state.mode][event.type];
  return transition ? transition(state, event) : state;
}

export default function useGameReducer() {
  return useReducer(reducer, initialState);
}
