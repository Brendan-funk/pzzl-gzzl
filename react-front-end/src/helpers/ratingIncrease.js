const rating = function(time, tries) {
  let ratingChange = 0;
  switch (true) {
    case time < 300:
      ratingChange += 25;
      break;
    case (time < 450):
      ratingChange += 15;
      break;
    case time >= 450:
      ratingChange += 0;
    break;
    default :
    ratingChange += 12;
  }

  switch(true) {
    case tries === 1:
      ratingChange += 25;
      break;
    case tries === 2:
      ratingChange += 15;
      break;
    case tries === 3:
      ratingChange += 5;
      break;
    case tries > 3:
      ratingChange -= (tries - 3) * 5;
      break;
    default : 
    ratingChange += 12;
  }
  return ratingChange;
}
module.exports = rating;