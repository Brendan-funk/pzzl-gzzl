import React from "react";
import './Footer.scss'

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export default function Nav(props) {

  return (
    <footer>
      <span id='help-icon'>
        <a href='#/'>
          <FontAwesomeIcon icon={faQuestion} />
          <p>help</p>
        </a>
      </span>
    </footer>
  );
}