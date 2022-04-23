import React from "react";
import './Rank.scss'

export default function Rank(props) {

  return (
    <div id='blur-buddy'>
      <div id="rank">
        <div id='rank-title'>
          <h1>Ranked Rating</h1>
          <p>{props.rank}</p>
        </div>
        <div class='wrapper'>
          <h2>{props.value}</h2>
          <button class="button-54">continue</button>
        </div>
      </div>
    </div>
  );
}