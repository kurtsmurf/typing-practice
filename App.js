import { h, Fragment } from "https://cdn.skypack.dev/preact";
import { useState } from "https://cdn.skypack.dev/preact/hooks";
import { Game } from './Game.js'
import { useAppReducer, appModes, appEvents } from './useAppReducer.js'

export function App() {
  const [state, dispatch] = useAppReducer()

  if (state.mode === appModes.GAME) {
    return h(GameView, { state, dispatch })
  }
  else if (state.mode === appModes.EDIT) {
    return h(EditorView, { state, dispatch })
  }
  else {
    return "Ya broken!!"
  }
}

function GameView({ state, dispatch }) {
  function Controls() {
    return h('div', {},
      h('button', {
        onClick: () =>
          dispatch({ type: appEvents.EDIT })
      }, 'Edit')
    )
  }

  return h(Fragment, {},
    h(Controls),
    h(Game, { text: state.text })
  )
}

function EditorView({ state, dispatch }) {
  const [text, setText] = useState(state.text)

  function Controls() {
    return h('div', {},
      h('button', {
        onClick: () =>
          dispatch({ type: appEvents.CANCEL })
      }, 'Cancel'),
      h('button', {
        onClick: () =>
          dispatch({ type: appEvents.SAVE, data: { text: text } })
      }, 'Save')
    )
  }

  function Editor() {
    return h('div', { id: 'editor' },
      h('textarea',
        {
          onChange: e =>
            setText(e.target.value), value: text,
          rows: 3
        }
      )
    )
  }

  return h(Fragment, {},
    h(Controls),
    h(Editor)
  )
}