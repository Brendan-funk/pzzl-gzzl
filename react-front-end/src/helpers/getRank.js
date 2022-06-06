const axios = require('axios');

export default function getRank() {
  

  return axios.get("http://localhost:8080/1/rating")
  // .then((response) => {
  //   console.log("console:", response)
  // }
  
}