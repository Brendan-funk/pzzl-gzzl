import React, { useState } from "react";
import './Sudoku.scss';
import './Footer.scss';
import Rank from "./Rank";
import Timer from "./Timer";
import Failure from "./Failure";
import Footer from "./Footer";
import rating from "../helpers/ratingIncrease";
import axios from 'axios';
export default function Nav(props) {

  const [seconds, setSeconds] = useState(0);
  const [showRank, setShowRank] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [rankChange, setRankChange] = useState('');
  
  let attempts = 0;
  let sudoku = {}
  sudoku = props.sudoku;

  const puzzleArr = sudoku.puzzle;
  const formattedPuzzle = puzzleArr.map((elm, i) => {
    let output = elm;
    if (elm === null) {
      output = <input type='text'  name={`box-${i + 1}`} min='0' max='9' maxLength='1' autocomplete="off"></input>;
    }

    return <td>{output}</td>;
  });
  
  const onSubmit = function(event) {
    event.preventDefault();
    setShowFail(false);
    attempts++;
    let answers = {}
    for (let i = 1; i < 82; i++) {
      const string = 'box-'+i;
      if(document.getElementsByName(string).length !== 0) {
        answers[string] = document.getElementsByName(string)[0].value;
      }
    }
    
    const isRight = props.checkAnswer(puzzleArr, answers, sudoku.solution);
    if (isRight) {
      // console.log(attempts)
      const deltaRating = rating(seconds, attempts);
      // console.log(deltaRating);
      axios.post(`http://localhost:8001/rating`, {
        id: 1,
        ratingChange: deltaRating 
      });
      setShowRank(true);
    } else {
      setShowFail(true);
    }
  }

  // TEST RATING SYSTEM temp code
  const testSubmit = function(event) {
    event.preventDefault();
    setShowFail(false);

    const secondsTest = 1;
    const attemptsTest = 1;
    const isRight = true;
    if (isRight) {
      const deltaRating = rating(secondsTest, attemptsTest);
      const formatRating = (deltaRating >= 0) ? `+${deltaRating}` : `-${deltaRating}`;
      // console.log('rating change', deltaRating);
      setRankChange(formatRating);
      axios.post(`http://localhost:8001/rating`, {
        id: 1,
        ratingChange: deltaRating
      });
      // console.log('HIT');
      setShowRank(true);
    } else {
      setShowFail(true);
    }
  }

  const generateSudokuGrid = () => {
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const row4 = [];
    const row5 = [];
    const row6 = [];
    const row7 = [];
    const row8 = [];
    const row9 = [];

    for (let i = 0; i < formattedPuzzle.length; i++) {
      switch(true) {
        case (i < 9):
          row1.push(formattedPuzzle[i]);
          break;
        case (i < 18):
          row2.push(formattedPuzzle[i]);
          break;
        case (i < 27):
          row3.push(formattedPuzzle[i]);
          break;
        case (i < 36):
          row4.push(formattedPuzzle[i]);
          break;
        case (i < 45):
          row5.push(formattedPuzzle[i]);
          break;
        case (i < 54):
          row6.push(formattedPuzzle[i]);
          break;
        case (i < 63):
          row7.push(formattedPuzzle[i]);
          break;
        case (i < 72):
          row8.push(formattedPuzzle[i]);
          break;
        case (i < 81):
          row9.push(formattedPuzzle[i]);
          break;
        default:
          console.log('Something Went Wrong...');
      }
    }

    const gridArr = [
      row1,
      row2,
      row3,
      row4,
      row5,
      row6,
      row7,
      row8,
      row9
    ];

    return gridArr;
  }

  let gameMode = props.practice ? '(Casual)' : '(Ranked)';

  const sudokuRows = generateSudokuGrid();

  return (
    <section>
      <div className='spacer'></div>
      <form id='sudokuForm'>
        <Timer title='Sudoku' gameMode={gameMode} seconds={seconds} setSeconds={(x) => setSeconds(x)} />
        <table cellSpacing={0} cellPadding={0}>
          <tbody>
            <tr>
              {sudokuRows[0]}
            </tr>
            <tr>
              {sudokuRows[1]}
            </tr>
            <tr>
              {sudokuRows[2]}
            </tr>
            <tr>
              {sudokuRows[3]}
            </tr>
            <tr>
              {sudokuRows[4]}
            </tr>
            <tr>
              {sudokuRows[5]}
            </tr>
            <tr>
              {sudokuRows[6]}
            </tr>
            <tr>
              {sudokuRows[7]}
            </tr>
            <tr>
              {sudokuRows[8]}
            </tr>
          </tbody>
        </table>
        <button class="button-54" type='submit' onClick={(e) => onSubmit(e)}>
          Submit
        </button>
        <button class="button-54" type='submit' onClick={testSubmit}>
          Test
        </button>
        { showFail ? <Failure message='Try again!' hideFailPopup={() => setShowFail(false)} /> : <></>}
      </form>
      <Rank value={rankChange}  show={showRank} transition={props.transition}/>
      <Footer />
    </section>
  );
}