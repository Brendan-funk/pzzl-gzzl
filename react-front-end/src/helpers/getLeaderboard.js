const axios = require('axios');
const { useState } = require('react');
const useEffect = require('react').useEffect
export default function getLeaderboard() {
  const [names, setNames] = useState(['gunga', 'ginga']);
  let tempNames = []
  
  
  useEffect(() => {
  Promise.all([axios.get("http://localhost:8001/leaderboard")])
  .then(leaders => {
    
    
  
    
    for(const leader of leaders[0].data){
      tempNames.push(leader.name);
    }
    setNames(tempNames);
    
    });
  }, [])
  
  return {names};
}