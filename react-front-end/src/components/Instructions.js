import React from "react";
import './Instructions.scss';
import classNames from "classnames";

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Popup(props) {
  // set class name for the popup
  const instructionsClass = classNames('instructions', {
    'instructions--hide': props.hide
 });

  return (
    <div className="instructions-wrap">
      <div className={instructionsClass} onClick={props.hideInstructions}>
        <FontAwesomeIcon icon={faXmark} id='x-left'/>
          <h1>
            Select a puzzle with the arrow keys and hit enter to play!
          </h1>
        <FontAwesomeIcon icon={faXmark} id='x-right'/>
      </div>
    </div>
  );
}