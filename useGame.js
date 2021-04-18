import useGameReducer from "./useGameReducer.js";
import { isValidKeyEvent } from "./utils.js";
import events from './events.js'

export const useGame = (text) => {
  const [state, dispatch] = useGameReducer();
  const isCorrect = (key) => key === text[state.position];
  const isLastPosition = state.position === text.length - 1;

  function dispatchKeyEvent(key) {
    if (isLastPosition && isCorrect(key)) {
      dispatch(events.REACH_END);
    } else if (isCorrect(key)) {
      dispatch(events.TYPE_CORRECT_KEY);
    } else {
      dispatch(events.TYPE_INCORRECT_KEY);
    }
  }

  const onKeyDown = function (e) {
    if (isValidKeyEvent(e)) {
      dispatchKeyEvent(e.key);
    }
  }

  const reset = () => dispatch(events.RESET)

  return [state, onKeyDown, reset]
}