import { h, render, Fragment } from "https://cdn.skypack.dev/preact";
import { useState } from "https://cdn.skypack.dev/preact/hooks";
import { isValidKeyEvent } from './utils.js'

const text =
  "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.";

const states = {
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST',
}

const events = {
  TYPE_RIGHT: 'TYPE_RIGHT',
  TYPE_WRONG: 'TYPE_WRONG',
  REACH_END: 'REACH_END',
  RESET: 'RESET',
}

const stateMachine = {
  initial: states.PLAYING,
  states: {
    [states.PLAYING]: {
      on: {
        [events.TYPE_RIGHT]: states.PLAYING,
        [events.TYPE_WRONG]: states.LOST,
        [events.REACH_END]: states.WON
      }
    },
    [states.WON]: {
      on: {
        [events.RESET]: states.PLAYING,
      }
    },
    [states.LOST]: {
      on: {
        [events.RESET]: states.PLAYING,
      }
    }
  }
}

const Characters = ({ text, position }) =>
  h(
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

const Text = ({ text }) => {
  const [position, setPosition] = useState(0);

  const play = (key) => {
    if (position === text.length) {
      alert('Success!')
      setPosition(0);
    } else if (key === text[position]) {
      setPosition(position + 1);
    } else {
      alert('You have failed.')
      setPosition(0);
    }
  };

  document.body.onkeydown = (e) => {
    if (isValidKeyEvent(e)) {
      play(e.key);
    }
  };

  return h("div", { className: "text" }, h(Characters, { text, position }));
};

render(h(Text, { text }), document.getElementById("app"));