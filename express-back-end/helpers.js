const sudoku = require('sudoku');

generatePuzzle = function () {
  const temp = sudoku.makepuzzle()
  return { 
    puzzle: temp,
    solution: sudoku.solvepuzzle(temp)
  }
}

module.exports = { generatePuzzle };