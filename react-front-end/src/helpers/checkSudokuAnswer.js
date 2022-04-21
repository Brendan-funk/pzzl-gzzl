const formatGuess = function(puzz, answers) {
  let output = [];
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

module.exports = { formatGuess, sudokuSolutionCheck } 