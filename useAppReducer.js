import { useReducer } from "https://cdn.skypack.dev/preact/hooks";

export const modes = {
  GAME: "GAME",
  EDIT: "EDIT"
}

export const events = {
  SAVE: "SAVE",
  CANCEL: "CANCEL",
  EDIT: "EDIT"
}

const initialState = {
  text:
    "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.",
  mode: modes.GAME,
}

const transitions = {
  [modes.GAME]: {
    [events.EDIT]: function (state) {
      return {
        ...state,
        mode: modes.EDIT
      }
    }
  },
  [modes.EDIT]: {
    [events.SAVE]: function (state, event) {
      return {
        ...state,
        mode: modes.GAME,
        text: event.data.text
      }
    },
    [events.CANCEL]: function (state) {
      return {
        ...state,
        mode: modes.GAME
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
