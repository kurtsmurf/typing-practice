import { useReducer } from "https://cdn.skypack.dev/preact/hooks";
import canvasConfetti from "https://cdn.skypack.dev/canvas-confetti";
import modes from "./modes.js";
import events from "./events.js";
import { isValidKeyEvent } from "./utils.js";

export default function (text) {
  const initialState = {
    text,
    mode: modes.PLAYING,
    position: 0,
  };

  const transitions = {
    [modes.PLAYING]: {
      [events.KEY_DOWN]: (state, event) => {
        if (!isValidKeyEvent(event.e)) {
          return state;
        }

        const isCorrect = event.e.key === state.text[state.position];
        const isLastPosition = state.position === state.text.length - 1;

        return isLastPosition && isCorrect
          ? reducer(state, { type: events.REACH_END })
          : isCorrect
          ? reducer(state, { type: events.TYPE_CORRECT_KEY })
          : reducer(state, { type: events.TYPE_INCORRECT_KEY });
      },
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

  return useReducer(reducer, initialState);
}
