import React from "react";
import './Timer.scss'
import { useEffect, useState } from "react";

export default function Timer(props) {

  // deconstruct props
  let {seconds, setSeconds} = props;

  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  // eslint-disable-next-line no-unused-vars
  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    toggle();
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div class='timer'>
        {/* <div id='pause-timer' onClick={toggle}>{isActive ? 'Pause Timer' : 'Resume Timer'}</div> */}
        <p>{props.title}</p>
        <p>{props.gameMode}</p>
        <p>{seconds}</p>
    </div>
  );
}