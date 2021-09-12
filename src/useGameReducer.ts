import { useReducer } from "preact/hooks";
import { isValidKeyEvent } from "./utils";

export type gameMode =
  | "PLAYING"
  | "WON"
  | "LOST"
  | "PAUSED";

export type gameEvent =
  | { type: "KEY_DOWN"; keyboardEvent: KeyboardEvent }
  | { type: "RESET" }
  | { type: "PAUSE" }
  | { type: "RESUME" };

export type gameState = {
  text: string;
  mode: gameMode;
  position: number;
  keyOfDeath: undefined | string;
};

export const useGameReducer = (text: string) => {
  const initialState: gameState = {
    text,
    mode: "PAUSED",
    position: 0,
    keyOfDeath: undefined,
  };

  const keyDownReducer = (state: gameState, event: gameEvent): gameState => {
    if (event.type !== "KEY_DOWN" || !isValidKeyEvent(event.keyboardEvent)) {
      return state;
    }

    const isCorrect = event.keyboardEvent.key === state.text[state.position];
    const isLastPosition = state.position === state.text.length - 1;

    // WIN
    if (isCorrect && isLastPosition) {
      return {
        ...state,
        mode: "WON",
        position: state.position + 1,
      };
    }

    // ADVANCE
    if (isCorrect) {
      return {
        ...state,
        position: state.position + 1,
      };
    }

    // LOSE
    return {
      ...state,
      mode: "LOST",
      keyOfDeath: event.keyboardEvent.key,
    };
  };

  const reducer = (state: gameState, event: gameEvent): gameState => {
    switch (state.mode) {
      case "LOST": {
        switch (event.type) {
          case "RESET": {
            return initialState;
          }
          default: {
            return state;
          }
        }
      }
      case "PAUSED": {
        switch (event.type) {
          case "RESUME": {
            return {
              ...state,
              mode: "PLAYING",
            };
          }
          default: {
            return state;
          }
        }
      }
      case "PLAYING": {
        switch (event.type) {
          case "KEY_DOWN": {
            return keyDownReducer(state, event);
          }
          case "PAUSE": {
            return {
              ...state,
              mode: "PAUSED",
            };
          }
          default: {
            return state;
          }
        }
      }
      case "WON": {
        switch (event.type) {
          case "RESET": {
            return initialState;
          }
          default: {
            return state;
          }
        }
      }
    }
  };

  return useReducer(reducer, initialState);
};
