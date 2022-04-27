import React from "react";
import Menu3D from "./Menu3D.js";
import Sudoku from "./Sudoku.js";
import useVisualMode from '../hooks/useVisualMode';


export default function ModeHandler(props) {
  const HOME = "HOME";
  const SUDOKU = "SUDOKU";
  const SUDOKUPRACTICE = "SUDOKUPRACTICE";

  const { mode, transition} = useVisualMode( HOME );


  // transition(SUDOKU);
 
  return (
    <>
      {mode === HOME && <Menu3D transition={(x) => transition(x)} />}
      {mode === SUDOKU && <Sudoku checkAnswer={props.checkAnswer} sudoku={props.dailySudoku} transition={transition} />}
      {mode === SUDOKUPRACTICE && <Sudoku checkAnswer={props.checkAnswer} sudoku={props.practiceSudoku} transition={transition} />}
    </>
  );
}