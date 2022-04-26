import React from "react";
import './Instructions.scss';

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Popup(props) {

  return (
    <div className="instructions-wrap">
      <div className="instructions" onClick={props.hideInstructions}>
        <FontAwesomeIcon icon={faXmark} id='x-left'/>
          <h1>
            Select a puzzle with the arrow keys and hit enter to play!
          </h1>
        <FontAwesomeIcon icon={faXmark} id='x-right'/>
      </div>
    </div>
  );
}