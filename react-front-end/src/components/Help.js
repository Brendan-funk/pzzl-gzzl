import React, { useState } from "react";
import './Help.scss';

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";


export default function Help(props) {

  const renderOutput = (display) => {
    if(!display) return null;
    return (
      <div id="help">
        <div id='help-bubble'>
          <div class='text-wrap'>
            <h1>Need Help? <FontAwesomeIcon id='x-icon' icon={faXmark} onClick={props.hideHelpPopup} /></h1>
            <p>
              My name is Puzz, and i'm here to help! <br></br><br></br>
              Use the left and right arrow keys ( ← → ) to swap between different puzzles, and hit 'Enter' to select a puzzle.<br></br><br></br>
              Clicking on the trophy ( <FontAwesomeIcon icon={faTrophy} /> ) in the top-right will open the player leaderboard. These are where the highest ranking users are displayed.
            </p>
          </div>
        </div>
      </div>
    )
  };
 
  return (
    <>
      {renderOutput(props.showHelp)}
    </>
    
  );
}