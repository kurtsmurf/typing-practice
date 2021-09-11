import { h, Fragment } from "preact";
import {
  useEffect,
  useRef,
  useState,
} from "preact/hooks";
import { Game } from "./Game";
import { appEvents, appModes, useAppReducer } from "./useAppReducer";
import autosize from "autosize";

export const App = () => {
  const [state, dispatch] = useAppReducer();

  return (
    h(
      "div",
      { className: "content" },
      state.mode === appModes.GAME && h(GameView, { state, dispatch }),
      state.mode === appModes.EDIT && h(EditorView, { state, dispatch })
    )
  )
};

const GameView = ({ state, dispatch }) => (
  h(
    Fragment,
    {},
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
    Fragment,
    {},
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
      id: "editor",
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
