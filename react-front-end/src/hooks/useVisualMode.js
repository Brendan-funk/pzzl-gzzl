import { useState } from 'react';

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);

  const transition = (newMode) => {
    setMode(newMode);
  };

  // const home = () => {
  //   setMode()
  // };

  return { 
    mode,
    transition,
  };
}