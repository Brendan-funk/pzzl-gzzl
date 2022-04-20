const sudoku = require('sudoku');

//creates a puzzle with its solution
const generatePuzzle = function () {
  const temp = sudoku.makepuzzle()
  return { 
    puzzle: temp,
    solution: sudoku.solvepuzzle(temp)
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

module.exports = { generatePuzzle, sudokuSolutionCheck };