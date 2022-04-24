import React from "react";
import Menu3D from "./Menu3D.js";
import Sudoku from "./Sudoku.js";
import useVisualMode from '../hooks/useVisualMode';


export default function ModeHandler(props) {
  const HOME = "HOME";
  const SUDOKU = "SUDOKU";

  const { mode, transition} = useVisualMode( HOME );


  // transition(SUDOKU);
 
  return (
    <>
      {mode === HOME && <Menu3D transition={(x) => transition(x)} />}
      {mode === SUDOKU && <Sudoku checkAnswer={props.checkAnswer} sudoku={props.sudoku} transition={transition} />}
    </>
  );
}