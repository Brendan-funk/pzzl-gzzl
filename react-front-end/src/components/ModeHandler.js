import React from "react";
import Menu3D from "./Menu3D.js";
import Sudoku from "./Sudoku.js";
import useVisualMode from '../hooks/useVisualMode';


export default function ModeHandler(props) {
  const HOME = "HOME";
  const SUDOKU = "SUDOKU";
  const SUDOKUPRACTICE = "SUDOKUPRACTICE";

  const { mode, transition} = useVisualMode( HOME );

  return (
    <>
      {mode === HOME && <Menu3D transition={(x) => transition(x)} />}
      {mode === SUDOKU && <Sudoku userRank={props.userRank} setUserRank={props.setUserRank} checkAnswer={props.checkAnswer} sudoku={props.dailySudoku} transition={transition} />}
      {mode === SUDOKUPRACTICE && <Sudoku checkAnswer={props.checkAnswer} practice={true} sudoku={props.practiceSudoku} transition={transition} />}
    </>
  );
}