import { useState } from "react";

// Take in an initial mode
// Set the mode state with the initial mode provided
// Return an object with a property mode
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = function (newMode, replace = false) {
    setMode(newMode);
    setHistory((prev) => [...prev, mode]);
    if (replace) {
      setHistory(
        history.splice(history.length - 2, 1, mode)
      );
    }
  };

  const back = () => {
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
}
