const formatGuess = function(puzz, answers) {
  let output = [];
  for(let i = 0; i < puzz.length; i++) {
    const string = 'box-'+(i+1);
    if(answers[string]) {
      output.push(parseInt(answers[string]));
    } else {
      output.push(puzz[i]);
    }
  }
  console.log(output);
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

const checkAnswer = function(puzz,answers, key) {
  // console.log(answers);
  const guess = formatGuess(puzz,answers);
  const isRight = sudokuSolutionCheck(guess,key);
  console.log('guess', guess);
  console.log('key', key);
  if (isRight){
    console.log('correct');
    return true;
  } else {
    return false;
  }
}

module.exports = checkAnswer;
