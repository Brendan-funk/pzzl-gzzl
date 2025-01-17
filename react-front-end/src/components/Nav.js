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
          <li><a href="/" id='nav-logo'><FontAwesomeIcon icon={faPuzzlePiece} /></a></li>
          <li><a href="/">Pzzl Gzzl</a></li>
          <li><h1>Denda</h1><p>-</p><h2>Rating {props.userRank}</h2></li>
          <li id='trophy-icon'>
            <SideDrawer/>
          </li>
        </ul>
      </nav>
    </div>
  );
}