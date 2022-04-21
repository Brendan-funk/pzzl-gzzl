import React from "react";
import './Popup.scss';
import classNames from "classnames";

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Popup(props) {
  // set class name for the popup
  const popupClass = classNames('popup', {
    'popup--failure': props.failure
 });

  return (
    <div className={popupClass}>
      <p>
        <FontAwesomeIcon icon={faXmark} id='x-left'/>
          {props.message}
        <FontAwesomeIcon icon={faXmark} id='x-right'/>
      </p>
    </div>
  );
}