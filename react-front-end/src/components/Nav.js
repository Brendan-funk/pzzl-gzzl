import React from "react";
import './Nav.scss'
import SideDrawer from "./SideDrawer.js";

export default function Nav(props) {

  return (
    <nav>
      <ul>
        <li><a href="#/">Logo</a></li>
        <li><a href="#/">tagline</a></li>
        <li></li>
        <h3>Username</h3>
        <span id='trophy-icon'>
          <SideDrawer />
        </span>
      </ul>
    </nav>
  );
}