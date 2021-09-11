import { Fragment, FunctionComponent, h, RefObject } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { Game } from "./Game";
import { appEvent, appMode, appState, useAppReducer } from "./useAppReducer";
import autosize from "autosize";

export const App = () => {
  const [state, dispatch] = useAppReducer();

  return (
    h(
      "div",
      { className: "content" },
      state.mode === "GAME" && h(GameView, { state, dispatch }),
      state.mode === "EDIT" && h(EditorView, { state, dispatch }),
    )
  );
};

const GameView: FunctionComponent<
  { state: appState; dispatch: (action: appEvent) => void }
> = ({ state, dispatch }) => (
  h(
    Fragment,
    {},
    h(Game, { text: state.text }),
    h(GameControls, { dispatch }),
  )
);

const GameControls: FunctionComponent<
  { dispatch: (action: appEvent) => void }
> = ({ dispatch }) => (
  h(
    "div",
    {},
    h(
      "button",
      { onClick: () => dispatch({ type: "EDIT" }) },
      "Edit",
    ),
  )
);

const EditorView: FunctionComponent<
  { state: appState; dispatch: (action: appEvent) => void }
> = ({ state, dispatch }) => {
  const [text, setText] = useState(state.text);

  const cancel = () => dispatch({ type: "CANCEL" });
  const save = () => dispatch({ type: "SAVE", data: { text: text } });
  const onChange = (e: Event) =>
    setText((<HTMLTextAreaElement> e.target).value);

  return h(
    Fragment,
    {},
    h(Editor, { text, onChange }),
    h(EditorControls, { cancel, save }),
  );
};

const Editor: FunctionComponent<
  { text: string; onChange: (e: Event) => void }
> = ({ text, onChange }) => {
  // const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect(() => {
  //   if (textAreaRef.current) textAreaRef.current.focus();
  // }, [textAreaRef]);

  // useEffect(() => {
  //   textAreaRef.current && autosize<HTMLTextAreaElement>(textAreaRef.current);
  // }, [textAreaRef.current, text]);

  return h(
    "textarea",
    {
      id: "editor",
      onChange,
      value: text,
      // ref: textAreaRef,
    },
  );
};

const EditorControls: FunctionComponent<{
  cancel: () => void;
  save: () => void;
}> = ({ cancel, save }) => {
  return h(
    "div",
    {},
    h("button", { onClick: cancel }, "Cancel"),
    h("button", { onClick: save }, "Save"),
  );
};
