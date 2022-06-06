const axios = require('axios');

export default function getLeaderboard() {
  return axios.get("http://localhost:8080/leaderboard")
}