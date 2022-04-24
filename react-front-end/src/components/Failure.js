import React from "react";
import './Failure.scss'
import Popup from "./Popup";

export default function Failure(props) {

  return (
    <div class='failure-main' onClick={props.hideFailPopup}>
      <Popup failure={true} message={props.message} />
    </div>
  );
}