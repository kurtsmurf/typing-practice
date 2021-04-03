import { h, render, Fragment } from "https://cdn.skypack.dev/preact";
import { useState } from "https://cdn.skypack.dev/preact/hooks";

const text =
  "Hello my dude! What is happening? I really would like to know what it is that you think is happening, because I am confused. Specifically, I am confused about what is happening. Can you help me my dude? Many thanks, Eric.";

const Characters = ({ text, position }) =>
  h(
    Fragment,
    {},
    text.split("").map((char, index) => h("span", { className: index < position ? '.float-away' : '' }, char))
  );

const Text = ({ text }) => {
  const [position, setPosition] = useState(0);

  document.body.onkeydown = () => {
    console.log(position)
    setPosition(position + 1)
  }

  return h("div", { className: "text" }, h(Characters, { text, position }));
};

render(h(Text, { text }), document.getElementById("app"));
