import React, { useState } from 'react';
import './App.css';
import Nav from "./Nav.js";
import checkAnswer from '../helpers/checkSudokuAnswer';
import { generateSudoku } from "../helpers/generateSudoku";
import getRank from "../helpers/getRank";
import ModeHandler from './ModeHandler';

function App() {

  const [userRank, setUserRank] = useState(0);
  getRank()
  .then(rating => {
    setUserRank(rating.data[0].rating);
  });
  
  const getPracticeSudoku = () => {
    const sudoku = generateSudoku();
    return sudoku;
  }

  // daily sudoku puzzle
  const getDailySudoku = () => {
    const sudoku = {
      puzzle: [null, null, null, null, 7, null, null, null, 1, null, 8, 2, null, null, null, null, 3, null, null, null, null, null, null, 9, 5, null, null, null, 6, null, null, null, null, null, 7, 5, null, null, 8, null, null, null, 3, null, null, 1, 3, null, 9, null, null, 2, null, 4, null, 1, null, null, 5, null, null, null, null, null, null, null, 2, null, null, null, 8, null, null, null, null, 6, null, 3, 4, null, null],
      solution: [5, 4, 3, 8, 7, 6, 9, 2, 1, 9, 8, 2, 5, 4, 1, 7, 3, 6, 6, 7, 1, 3, 2, 9, 5, 4, 8, 4, 6, 9, 1, 3, 2, 8, 7, 5, 7, 2, 8, 4, 6, 5, 3, 1, 9, 1, 3, 5, 9, 8, 7, 2, 6, 4, 2, 1, 4, 7, 5, 8, 6, 9, 3, 3, 5, 6, 2, 9, 4, 1, 8, 7, 8, 9, 7, 6, 1, 3, 4, 5, 2]
    };
    return sudoku;
  }

    return (
      <div className="App">
        <Nav userRank={userRank} />
        <ModeHandler userRank={userRank} setUserRank={setUserRank} checkAnswer={checkAnswer} dailySudoku={getDailySudoku()} practiceSudoku={getPracticeSudoku()} />
      </div>
    );
}

export default App;
