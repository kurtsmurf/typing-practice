import { h } from "https://cdn.skypack.dev/preact";
import {
  useEffect,
  useRef,
  useState,
} from "https://cdn.skypack.dev/preact/hooks";
import { Game } from "./Game.js";
import { appEvents, appModes, useAppReducer } from "./useAppReducer.js";
import autosize from "https://cdn.skypack.dev/autosize";

export function App() {
  const [state, dispatch] = useAppReducer();

  if (state.mode === appModes.GAME) {
    return h(GameView, { state, dispatch });
  } else if (state.mode === appModes.EDIT) {
    return h(EditorView, { state, dispatch });
  } else {
    return "Ya broken!!";
  }
}

function GameView({ state, dispatch }) {
  function Controls() {
    return h(
      "div",
      {},
      h("button", {
        onClick: () => dispatch({ type: appEvents.EDIT }),
      }, "Edit"),
    );
  }

  return h("div", { id: "game" }, h(Game, { text: state.text }), h(Controls));
}

function EditorView({ state, dispatch }) {
  const [text, setText] = useState(state.text);

  function Controls() {
    return h(
      "div",
      {},
      h("button", {
        onClick: () => dispatch({ type: appEvents.CANCEL }),
      }, "Cancel"),
      h("button", {
        onClick: () => dispatch({ type: appEvents.SAVE, data: { text: text } }),
      }, "Save"),
    );
  }

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.focus();
  }, [textAreaRef]);

  useEffect(() => {
    autosize(textAreaRef.current);
  }, [textAreaRef.current, text]);

  function Editor() {
    return h("textarea", {
      onChange: (e) => setText(e.target.value),
      value: text,
      ref: textAreaRef,
    });
  }

  return h("div", { id: "editor" }, h(Editor), h(Controls));
}
