const sudoku = require('sudoku');

//creates a puzzle with its solution
const change0To9 = function(sudoku) {
  let output = [];
  for (let num of sudoku) {
    if (num === 0) {
      output.push(9);
    } else {
      output.push(num);
    }
  }
  return output;
}
const generatePuzzle = function () {
  const temp = sudoku.makepuzzle();
  const tempSolution = sudoku.solvepuzzle(temp);
  const pzzl = change0To9(temp);
  const pzzlSolution = change0To9(tempSolution);
  

  return { 
    puzzle: pzzl,
    solution: pzzlSolution
  }
}

//checks the solution
const sudokuSolutionCheck = function(submission, answer) {
  
  if (submission.length !== answer.length) {
    return false;
  }
  for( let i = 0; i < answer.length; i++) {
    if(submission[i] !== answer[i]) {
      return false;
    }
  }
  return true;
}

// changes the 0s to 9s when a puzzle is generated by sudoku
const formatGuess = function(puzz, answers) {
  output = [];
  for(let i = 0; i < puzz.length; i++) {
    const string = 'box-'+(i+1);
    if(answers[string]) {
      output.push(answers[string]);
    } else {
      output.push(puzz[i]);
    }
  }
  return output;
}
const puzzle = generatePuzzle();
const guesses = {
  "box-1" :4
}

module.exports = { generatePuzzle, sudokuSolutionCheck, change0To9, formatGuess };