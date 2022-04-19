import React from "react";
import './Nav.scss'
import SideDrawer from "./SideDrawer.js";

export default function Nav(props) {

  return (
    <nav>
      <ul>
        <li><a href="#/">Logo</a></li>
        <li><a href="#/">tagline</a></li>
        <span id='trophy-icon' onClick={() => console.log('test')}>
          <SideDrawer />
        </span>
      </ul>
    </nav>
  );
}