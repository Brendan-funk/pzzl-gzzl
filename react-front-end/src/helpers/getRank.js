const axios = require('axios');

export default function getRank() {
  let rank = 0;

  axios.get("http://localhost:8001/1/rating")
  .then(rating => {
    console.log(rating.data[0].rating);
    rank = rating.data[0].rating;
  });

  return rank;
}