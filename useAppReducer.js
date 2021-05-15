import { useReducer } from "https://cdn.skypack.dev/preact/hooks";

export const appModes = {
  GAME: "GAME",
  EDIT: "EDIT"
}

export const appEvents = {
  SAVE: "SAVE",
  CANCEL: "CANCEL",
  EDIT: "EDIT"
}

const initialState = {
  text:
    "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.",
  mode: appModes.GAME,
}

const transitions = {
  [appModes.GAME]: {
    [appEvents.EDIT]: function (state) {
      return {
        ...state,
        mode: appModes.EDIT
      }
    }
  },
  [appModes.EDIT]: {
    [appEvents.SAVE]: function (state, event) {
      return {
        ...state,
        mode: appModes.GAME,
        text: event.data.text
      }
    },
    [appEvents.CANCEL]: function (state) {
      return {
        ...state,
        mode: appModes.GAME
      }
    },
  }
}

export function useAppReducer() {
  function reducer(state, event) {
    const transition = transitions[state.mode][event.type]
    return transition ? transition(state, event) : state
  }

  return useReducer(reducer, initialState)
}
