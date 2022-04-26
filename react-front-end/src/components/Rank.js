import React from "react";
import './Rank.scss';
import classNames from "classnames";
import getRank from "../helpers/getRank";


export default function Rank(props) {
  const {rank} = getRank();
  // if props.show is true, the componenet will render
  const blurClass = classNames('blur', {
    'blur--show': props.show
 });

  return (
    <div className={blurClass} >
      <div id="rank">
        <div id='rank-title'>
          <h1>Ranked Rating</h1>
          <p>{rank}</p>
        </div>
        <div class='wrapper'>
          <h2>{props.value}</h2>
          <button class="button-54" onClick={() => props.transition("HOME")}>continue</button>
        </div>
      </div>
    </div>
  );
}