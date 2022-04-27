import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Nav from "./Nav.js";
import checkAnswer from '../helpers/checkSudokuAnswer';
import { generateSudoku } from "../helpers/generateSudoku";
import ModeHandler from './ModeHandler';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  getPracticeSudoku = () => {
    const sudoku = generateSudoku();
    console.log('---Sudoku generated---');
    console.log('practice generation', sudoku);
    return sudoku;
  }

  getDailySudoku = () => {
    const sudoku = {
      puzzle: [null, null, null, null, 7, null, null, null, 1, null, 8, 2, null, null, null, null, 3, null, null, null, null, null, null, 9, 5, null, null, null, 6, null, null, null, null, null, 7, 5, null, null, 8, null, null, null, 3, null, null, 1, 3, null, 9, null, null, 2, null, 4, null, 1, null, null, 5, null, null, null, null, null, null, null, 2, null, null, null, 8, null, null, null, null, 6, null, 3, 4, null, null],
      solution: [5, 4, 3, 8, 7, 6, 9, 2, 1, 9, 8, 2, 5, 4, 1, 7, 3, 6, 6, 7, 1, 3, 2, 9, 5, 4, 8, 4, 6, 9, 1, 3, 2, 8, 7, 5, 7, 2, 8, 4, 6, 5, 3, 1, 9, 1, 3, 5, 9, 8, 7, 2, 6, 4, 2, 1, 4, 7, 5, 8, 6, 9, 3, 3, 5, 6, 2, 9, 4, 1, 8, 7, 8, 9, 7, 6, 1, 3, 4, 5, 2]
    };
    return sudoku;
    // console.log('puzz len', sudoku.puzzle.length, 'solution len', sudoku.solution.length);
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    return (
      <div className="App">
        <Nav/>
        <ModeHandler checkAnswer={checkAnswer} dailySudoku={this.getDailySudoku()} practiceSudoku={this.getPracticeSudoku()} />
      </div>
    );
  }
}

export default App;
