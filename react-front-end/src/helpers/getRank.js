const axios = require('axios');
const { useState } = require('react');
const useEffect = require('react').useEffect

export default function getRank() {
  const [rank, setRank] = useState(11);
  
  useEffect(() => {
  Promise.all([axios.get("http://localhost:8001/1/rating")])
  .then(rating => {
    console.log(rating[0].data[0].rating);
    setRank(rating[0].data[0].rating);
    
    });
  }, [])
  
  return {rank};
}