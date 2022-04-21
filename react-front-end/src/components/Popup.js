import React from "react";
import './Popup.scss'

export default function Popup(props) {

  return (
    <div class='popup'>
      <p>{props.message}</p>
    </div>
  );
}