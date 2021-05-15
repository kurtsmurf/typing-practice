import { h } from "https://cdn.skypack.dev/preact";
import { useState } from "https://cdn.skypack.dev/preact/hooks";
import { Game } from './Game.js'
import { useAppReducer, modes, events } from './useAppReducer.js'

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
