import { useReducer } from "preact/hooks";

export type appMode = "GAME" | "EDIT";
export type appEvent =
  | { type: "SAVE"; text: string }
  | { type: "CANCEL" }
  | { type: "EDIT" };
export type appState = { text: string; mode: appMode };

const sanitizeText = (text: string) =>
  text
    .trim()
    .replaceAll(/[\s\r\n]+/g, " ");

const transitions = (mode: appMode, event: appEvent) =>
  (state: appState): appState => {
    switch (mode) {
      case "GAME": {
        switch (event.type) {
          case "EDIT": {
            return {
              ...state,
              mode: "EDIT",
            };
          }
          default: {
            return state;
          }
        }
      }
      case "EDIT": {
        switch (event.type) {
          case "CANCEL": {
            return {
              ...state,
              mode: "GAME",
            };
          }
          case "SAVE": {
            return {
              ...state,
              mode: "GAME",
              text: sanitizeText(event.text) || state.text,
            };
          }
          default: {
            return state;
          }
        }
      }
      default: {
        return state;
      }
    }
  };

const initialState: appState = {
  text: "Perfect practice makes perfect.",
  mode: "GAME",
};

const saveText = (text: string) => localStorage.setItem("text", text);
const getSavedText = () => localStorage.getItem("text");

function reducer(state: appState, event: appEvent) {
  const nextState = transitions(state.mode, event)(state);

  if (nextState.text !== state.text) saveText(nextState.text);

  return nextState;
}

export function useAppReducer() {
  const savedText = getSavedText();

  if (savedText) initialState.text = savedText;

  return useReducer(reducer, initialState);
}
