import { h } from "https://cdn.skypack.dev/preact";
import { useReducer, useState } from "https://cdn.skypack.dev/preact/hooks";
import { Game } from './Game.js'

const text =
  "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.";

const modes = {
  GAME: "GAME",
  EDIT: "EDIT"
}

const events = {
  SAVE: "SAVE",
  CANCEL: "CANCEL",
  EDIT: "EDIT"
}

const initialState = {
  text, mode: modes.GAME,
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

function useAppReducer() {
  function reducer(state, event) {
    console.log(state, event)
    const transition = transitions[state.mode][event.type]
    const next = transition ? transition(state, event) : state
    console.log(next)
    return next
  }

  return useReducer(reducer, initialState)
}

export function App() {
  const [state, dispatch] = useAppReducer()

  return state.mode === modes.GAME
    ? h(
      'div',
      {},
      h(
        'button',
        { onClick: () => dispatch({ type: events.EDIT }) },
        'Edit'
      ),
      h(Game, { text: state.text })
    )
    : state.mode === modes.EDIT
      ? h(Editor, { dispatch, currentText: state.text })
      : "Ya broken!!"
}

function Editor({ dispatch, currentText }) {
  const [text, setText] = useState(currentText)

  return h(
    'div',
    {},
    h('button', { onClick: () => dispatch({ type: events.CANCEL }) }, 'Cancel'),
    h('button', { onClick: () => dispatch({ type: events.SAVE, data: { text: text } }) }, 'Save'),
    h('textarea', { onChange: e => setText(e.target.value), value: text })
  )
}
