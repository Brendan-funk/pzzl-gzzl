const sudoku = require('sudoku');

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

const generateSudoku = function () {
  const temp = sudoku.makepuzzle();
  const tempSolution = sudoku.solvepuzzle(temp);

  return { 
    puzzle: change0To9(temp),
    solution: change0To9(tempSolution)
  }
}

module.exports = { generateSudoku };