const sudoku = require('sudoku');

const generateSudoku = function () {
  const temp = sudoku.makepuzzle()
  return { 
    puzzle: temp,
    solution: sudoku.solvepuzzle(temp)
  }
}

module.exports = { generateSudoku };