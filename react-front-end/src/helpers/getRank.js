const axios = require('axios');

export default function getRank() {
  

  return axios.get("http://localhost:8001/1/rating")
  
}