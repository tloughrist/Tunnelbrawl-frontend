import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function UserNav() {
  return (
    <div>
      <nav role="navigation">
        <div id="tab"></div>
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <NavLink to="/home" exact className={useLocation().pathname === "/home" ? "navlink navlink-active" : "navlink"}>Home</NavLink>
            <NavLink to="/game_nights" exact className={useLocation().pathname === "/games" ? "navlink navlink-active" : "navlink"}>Games</NavLink>
            <NavLink to="/friends" exact className={useLocation().pathname === "/taproom" ? "navlink navlink-active" : "navlink"}>Taproom</NavLink>
            <NavLink to="/profile" exact className={useLocation().pathname === "/profile" ? "navlink navlink-active" : "navlink"}>Profile</NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default UserNav;