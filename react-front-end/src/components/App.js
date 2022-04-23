import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Nav from "./Nav.js";
import Rank from "./Rank.js";
import Menu from "./Menu.js";
import Menu3D from "./Menu3D.js";
import Footer from "./Footer.js";
import Sudoku from "./Sudoku.js"
import checkAnswer from '../helpers/checkSudokuAnswer';
import { generateSudoku } from "../helpers/generateSudoku";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  getSudoku = () => {
    const sudoku = generateSudoku();
    console.log('---Sudoku generated---')
    return sudoku;
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
        {/* <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>        */}
        <Nav/>
        {/* <Menu/> */}
        {/* <Menu3D/> */}
        <Rank />
        <Sudoku checkAnswer={checkAnswer} sudoku={this.getSudoku()} />
        <Footer />
      </div>
    );
  }
}

export default App;
