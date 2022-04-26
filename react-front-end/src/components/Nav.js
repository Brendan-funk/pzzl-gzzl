import React from "react";
import './Nav.scss';
import SideDrawer from "./SideDrawer.js";

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";


export default function Nav(props) {
  
  return (
    <div id="nav-container">
      <nav>
        <ul>
<<<<<<< HEAD
          <li><a href="/" id='nav-logo'><FontAwesomeIcon icon={faPuzzlePiece} /></a></li>
          <li><a href="/">Pzzl Gzzl</a></li>
          <li><h3>Ernő Rubik</h3></li>
=======
          <li><a href="#/" id='nav-logo'><FontAwesomeIcon icon={faPuzzlePiece} /></a></li>
          <li><a href="#/">Pzzl Gzzl</a></li>
          <li><h3>Denda</h3></li>
>>>>>>> 234236894ef31f51298af2783d87002a1b9a80e7
          <li id='trophy-icon'>
            <SideDrawer/>
          </li>
        </ul>
      </nav>
    </div>
  );
}