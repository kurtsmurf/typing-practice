import { useReducer } from "https://cdn.skypack.dev/preact/hooks";
import modes from "./modes.js";
import events from "./events.js";

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
    [events.REACH_END]: (state) => ({
      ...state,
      mode: modes.WON,
      position: state.position + 1,
    }),
    [events.RESET]: (_) => initialState,
  },
  [modes.WON]: {
    [events.RESET]: (_) => initialState,
  },
  [modes.LOST]: {
    [events.RESET]: (_) => initialState,
  },
};

function reducer(state, event) {
  const transition = transitions[state.mode][event];
  return transition ? transition(state) : state;
}

export default function useGameReducer() {
  return useReducer(reducer, initialState);
}