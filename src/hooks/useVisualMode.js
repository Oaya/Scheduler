import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const mode = history[history.length - 1];

  const transition = (newMode, replace) => {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = () => {
    if (history.length >= 1) {
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
}
