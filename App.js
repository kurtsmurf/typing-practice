import { h, Fragment } from "https://cdn.skypack.dev/preact";
import {
  useEffect,
  useRef,
  useState,
} from "https://cdn.skypack.dev/preact/hooks";
import { Game } from "./Game.js";
import { appEvents, appModes, useAppReducer } from "./useAppReducer.js";
import autosize from "https://cdn.skypack.dev/autosize";

export const App = () => {
  const [state, dispatch] = useAppReducer();

  return (
    h(
      Fragment,
      {},
      state.mode === appModes.GAME && h(GameView, { state, dispatch }),
      state.mode === appModes.EDIT && h(EditorView, { state, dispatch })
    )
  )
};

const GameView = ({ state, dispatch }) => (
  h(
    "div",
    { id: "game" },
    h(Game, { text: state.text }),
    h(GameControls, { dispatch }),
  )
);

const GameControls = ({ dispatch }) => (
  h(
    "div",
    {},
    h(
      "button",
      { onClick: () => dispatch({ type: appEvents.EDIT }) },
      "Edit",
    ),
  )
);

const EditorView = ({ state, dispatch }) => {
  const [text, setText] = useState(state.text);

  const cancel = () => dispatch({ type: appEvents.CANCEL });
  const save = () => dispatch({ type: appEvents.SAVE, data: { text: text } });
  const onChange = (e) => setText(e.target.value);

  return h(
    "div",
    { id: "editor" },
    h(Editor, { text, onChange }),
    h(EditorControls, { cancel, save }),
  );
};

const Editor = ({ text, onChange }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) textAreaRef.current.focus();
  }, [textAreaRef]);

  useEffect(() => {
    autosize(textAreaRef.current);
  }, [textAreaRef.current, text]);

  return h(
    "textarea",
    {
      onChange,
      value: text,
      ref: textAreaRef,
    },
  );
}

const EditorControls = ({ cancel, save }) => {
  return h(
    "div",
    {},
    h("button", { onClick: cancel }, "Cancel"),
    h("button", { onClick: save }, "Save"),
  );
}
