import { FunctionComponent } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { Game } from "./Game";
import { appEvent, appState, useAppReducer } from "./useAppReducer";

export const App: FunctionComponent = () => {
  const [state, dispatch] = useAppReducer();

  return (
    <div className="content">
      {state.mode === "GAME" && <GameView state={state} dispatch={dispatch} />}
      {state.mode === "EDIT" &&
        <EditorView state={state} dispatch={dispatch} />}
    </div>
  );
};

const GameView: FunctionComponent<
  { state: appState; dispatch: (action: appEvent) => void }
> = ({ state, dispatch }) => (
  <>
    <Game text={state.text} />
    <GameControls dispatch={dispatch} />
  </>
);

const GameControls: FunctionComponent<
  { dispatch: (action: appEvent) => void }
> = ({ dispatch }) => (
  <div>
    <button onClick={() => dispatch({ type: "EDIT" })}>Edit</button>
  </div>
);

const EditorView: FunctionComponent<
  { state: appState; dispatch: (action: appEvent) => void }
> = ({ state, dispatch }) => {
  const [text, setText] = useState(state.text);

  const cancel = () => dispatch({ type: "CANCEL" });
  const save = () => dispatch({ type: "SAVE", text });
  const onChange = (e: Event) =>
    setText((e.target as HTMLTextAreaElement).value);

  return (
    <>
      <Editor text={text} onChange={onChange} />
      <EditorControls cancel={cancel} save={save} />
    </>
  );
};

const Editor: FunctionComponent<
  { text: string; onChange: (e: Event) => void }
> = ({ text, onChange }) => {
  const textArea = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textArea.current?.focus()
  }, [textArea.current])

  return <textarea id="editor" ref={textArea} onInput={onChange} value={text} />;
};

const EditorControls: FunctionComponent<{
  cancel: () => void;
  save: () => void;
}> = ({ cancel, save }) => {
  return (
    <div class="row">
      <button onClick={cancel}>Cancel</button>
      <button onClick={save}>Save</button>
    </div>
  );
};
