import * as React from 'react';
import './SideDrawer.scss';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import getLeaderboard from '../helpers/getLeaderboard';

const useState = require('react').useState;

export default function SideDrawer() {
  
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    names: ['gunga', 'ginga']
  });
  
  
  const toggleDrawer = (anchor, open) => (event) => {
    
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    let tempNames = []
    getLeaderboard()
    .then(leaders => {
      let count = 1;
      for(const leader of leaders.data){
        tempNames.push(`${count}. ${leader.name} ${leader.rating}`);
        count++;
      }
      console.log(tempNames);
      
      setState({ ...state, [anchor]: open , names: tempNames});
      });
    
    console.log(state);
  };
  
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
         {state.names.map((text, index) => (  
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  
  return (
    <div>
      <FontAwesomeIcon icon={faTrophy} onClick={toggleDrawer('right', true)} className='side-drawer-trophy'/>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
