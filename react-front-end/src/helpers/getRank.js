const axios = require('axios');
const { useState } = require('react');
const useEffect = require('react').useEffect

export default function getRank() {
  let rank = 0;

  Promise.all([axios.get("http://localhost:8001/1/rating")])
  .then(rating => {
    console.log(rating[0].data[0].rating);
    rank = rating[0].data[0].rating;
  });

  return rank;
}