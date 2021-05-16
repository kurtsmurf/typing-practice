import { h } from "https://cdn.skypack.dev/preact";
import { useState } from "https://cdn.skypack.dev/preact/hooks";
import { Game } from './Game.js'
import { useAppReducer, appModes, appEvents } from './useAppReducer.js'

export function App() {
  const [state, dispatch] = useAppReducer()

  if (state.mode === appModes.GAME) {
    return h(GameView, { state, dispatch })
  }
  else if (state.mode === appModes.EDIT) {
    return h(Editor, { state, dispatch })
  }
  else {
    return "Ya broken!!"
  }
}

function GameView({ state, dispatch }) {
  return h(
    'div',
    {},
    h(
      'button',
      { onClick: () => dispatch({ type: appEvents.EDIT }) },
      'Edit'
    ),
    h(Game, { text: state.text })
  )
}

function Editor({ state, dispatch }) {
  const [text, setText] = useState(state.text)

  return h(
    'div',
    {},
    h('button', { onClick: () => dispatch({ type: appEvents.CANCEL }) }, 'Cancel'),
    h('button', { onClick: () => dispatch({ type: appEvents.SAVE, data: { text: text } }) }, 'Save'),
    h('textarea', { onChange: e => setText(e.target.value), value: text })
  )
}
