import { useReducer } from "https://cdn.skypack.dev/preact/hooks";

export const appModes = {
  GAME: "GAME",
  EDIT: "EDIT",
};

export const appEvents = {
  SAVE: "SAVE",
  CANCEL: "CANCEL",
  EDIT: "EDIT",
};

const transitions = {
  [appModes.GAME]: {
    [appEvents.EDIT]: function (state) {
      return {
        ...state,
        mode: appModes.EDIT,
      };
    },
  },
  [appModes.EDIT]: {
    [appEvents.SAVE]: function (state, event) {
      const sanitizedText = event.data.text.trim().replaceAll(
        /[\s\r\n]+/g,
        " ",
      );

      return {
        ...state,
        mode: appModes.GAME,
        text: sanitizedText || state.text,
      };
    },
    [appEvents.CANCEL]: function (state) {
      return {
        ...state,
        mode: appModes.GAME,
      };
    },
  },
};

const initialState = {
  text: "Perfect practice makes perfect.",
  mode: appModes.GAME,
};

const saveText = text => localStorage.setItem("text", text)
const getSavedText = () => localStorage.getItem("text")

function reducer(state, event) {
  const transition = transitions[state.mode][event.type];
  const nextState = transition ? transition(state, event) : state;

  if (nextState.text !== state.text) saveText(nextState.text)

  return nextState
}

export function useAppReducer() {
  const savedText = getSavedText()

  if (savedText) initialState.text = savedText

  return useReducer(reducer, initialState);
}
