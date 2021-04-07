import { useReducer } from "https://cdn.skypack.dev/preact/hooks";
import modes from './modes.js'
import events from './events.js'

const initialState = {
  mode: modes.PLAYING,
  position: 0,
};

export default function useGameReducer() {
  return useReducer(reducer, initialState);
}

function reducer(state, event) {
  switch (state.mode) {
    case modes.PLAYING:
      return playingReducer(state, event);
    case modes.WON:
      return wonReducer(state, event);
    case modes.LOST:
      return lostReducer(state, event);
    default:
      return state;
  }
}

function playingReducer(state, event) {
  switch (event) {
    case events.TYPE_CORRECT_KEY:
      return {
        ...state,
        position: state.position + 1,
      };
    case events.TYPE_INCORRECT_KEY:
      return {
        ...state,
        mode: modes.LOST,
      };
    case events.REACH_END:
      return {
        ...state,
        mode: modes.WON,
        position: state.position + 1,
      };
    case events.RESET:
      return initialState;
    default:
      return state;
  }
}

function wonReducer(state, event) {
  switch (event) {
    case events.RESET:
      return initialState;
    default:
      return state;
  }
}

function lostReducer(state, event) {
  switch (event) {
    case events.RESET:
      return initialState;
    default:
      return state;
  }
}
