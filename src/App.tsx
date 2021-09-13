import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { Game } from "./Game";
import { appEvent, appState, useAppReducer } from "./useAppReducer";

export const App: FunctionComponent = () => {
  const [state, dispatch] = useAppReducer();

  return (
    <div className="content">
      { state.mode === "GAME" && <GameView state={state} dispatch={dispatch} /> }
      { state.mode === "EDIT" && <EditorView state={state} dispatch={dispatch} /> }
    </div>
 );
};

const GameView: FunctionComponent<
  { state: appState; dispatch: (action: appEvent) => void }
> = ({ state, dispatch }) => (
  <Fragment>
    <Game text={state.text} />
    <GameControls dispatch={dispatch} />
  </Fragment>
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
    <Fragment>
      <Editor text={text} onChange={onChange} />
      <EditorControls cancel={cancel} save={save} />
    </Fragment>
  );
};

const Editor: FunctionComponent<
  { text: string; onChange: (e: Event) => void }
> = ({ text, onChange }) => {
  return (
    <textarea id="editor" onChange={onChange} value={text} />
  );
};

const EditorControls: FunctionComponent<{
  cancel: () => void;
  save: () => void;
}> = ({ cancel, save }) => {
  return (
    <div>
      <button onClick={cancel}>Cancel</button>
      <button onClick={save}>Save</button>
    </div>
  );
};
