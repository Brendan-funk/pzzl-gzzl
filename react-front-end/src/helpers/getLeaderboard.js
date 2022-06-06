const axios = require('axios');
export default function getLeaderboard() {
  
  return axios.get("http://localhost:8080/leaderboard")
  /*.then(leaders => {
    let count = 1;
    for(const leader of leaders.data){
      tempNames.push(`${count}. ${leader.name} ${leader.rating}`);
      count++;
    }
    console.log(tempNames);
    return tempNames;
    
    });
    */
}