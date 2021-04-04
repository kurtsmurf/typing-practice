import { h, render, Fragment } from "https://cdn.skypack.dev/preact";
import { useReducer } from "https://cdn.skypack.dev/preact/hooks";
import { isValidKeyEvent } from "./utils.js";

const text =
  "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.";

const modes = {
  PLAYING: "PLAYING",
  WON: "WON",
  LOST: "LOST",
};

const events = {
  TYPE_RIGHT: "TYPE_RIGHT",
  TYPE_WRONG: "TYPE_WRONG",
  REACH_END: "REACH_END",
  RESET: "RESET",
};

const initialState = {
  mode: modes.PLAYING,
  position: 0,
};

function reducer(state, event) {
  switch (state.mode) {
    case modes.PLAYING:
      return playingReducer(state, event);
    case modes.WON:
      return wonReducer(state, event);
    case modes.LOST:
      return lostReducer(state, event);
    default:
      return state;
  }
}

function playingReducer(state, event) {
  switch (event) {
    case events.TYPE_RIGHT:
      return {
        ...state,
        position: state.position + 1,
      };
    case events.TYPE_WRONG:
      return {
        ...state,
        mode: modes.LOST,
      };
    case events.REACH_END:
      return {
        ...state,
        mode: modes.WON,
        position: state.position + 1,
      };
    case events.RESET:
      return initialState;
    default:
      return state;
  }
}

function wonReducer(state, event) {
  switch (event) {
    case events.RESET:
      return initialState;
    default:
      return state;
  }
}

function lostReducer(state, event) {
  switch (event) {
    case events.RESET:
      return initialState;
    default:
      return state;
  }
}

render(h(Text, { text }), document.getElementById("app"));

function Text({ text }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const isCorrect = (key) => key === text[state.position];
  const isLastPosition = state.position === text.length - 1;

  function play(key) {
    if (isLastPosition && isCorrect(key)) {
      dispatch(events.REACH_END);
    } else if (isCorrect(key)) {
      dispatch(events.TYPE_RIGHT);
    } else {
      dispatch(events.TYPE_WRONG);
    }
  }

  document.body.onkeydown = function (e) {
    if (isValidKeyEvent(e)) {
      play(e.key);
    }
  };

  return h(
    "div",
    {
      className: "text",
      "data-mode": state.mode,
    },
    state.mode === modes.LOST &&
    h(
      "div",
      { className: "prompt" },
      h("strong", {}, "You failed."),
      h("button", { onClick: () => dispatch(events.RESET) }, "Reset")
    ),
    state.mode === modes.WON &&
    h(
      "div",
      { className: "prompt" },
      h("strong", {}, "You succeeded!"),
      h("button", { onClick: () => dispatch(events.RESET) }, "Reset")
    ),
    h(Characters, { text, position: state.position })
  );
}

function Characters({ text, position }) {
  return h(
    Fragment,
    {},
    text.split("").map((char, index) =>
      h(
        "span",
        {
          className:
            index < position ? "typed" : index === position ? "cursor" : "",
        },
        char
      )
    )
  );
}
