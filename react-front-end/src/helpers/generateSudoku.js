const sudoku = require('sudoku');

const generateSudoku = function () {
  const temp = sudoku.makepuzzle()
  console.log(sudoku.solvepuzzle(temp))
  return { 
    puzzle: temp,
    solution: sudoku.solvepuzzle(temp)
  }
  
}

module.exports = { generateSudoku };