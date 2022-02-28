import { useState } from "react";

// take in an initial mode // set the mode state with the initial mode provided
// return an object with a property mode
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = function (mode, replace) {
    setMode(mode);
    setHistory((prev) => [...prev, mode]);
    if (replace) {
      setHistory(history.splice(history.length - 2, 1, mode));
    }
  };

  const back = () => {
    setMode(history[history.length - 1]);
    if (history.length >= 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
}
