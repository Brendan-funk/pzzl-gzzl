import React from "react";
import './Nav.scss'

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

export default function Nav(props) {

  return (
    <nav>
      <ul>
        <li><a href="#/">Logo</a></li>
        <li><a href="#/">tagline</a></li>
        <span id='trophy-icon'>
          <FontAwesomeIcon icon={faTrophy}/>
        </span>
      </ul>
    </nav>
  );
}