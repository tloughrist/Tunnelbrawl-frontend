import React, { useContext } from "react";
import UserNav from "./UserNav";
import VisitorNav from "./VisitorNav";
import { LoggedInContext } from '../../App';

function Banner() {

  const isLoggedIn = useContext(LoggedInContext);

  return (
    <div id="banner_container">
      <div id="banner_img_container">
        <img id="banner_img" src="./logo.png" alt="TunnelBrawl" />
      </div>
      <div id="banner_navbar">
        {
          //Switches between navbars depending on login status
          isLoggedIn?
            <UserNav />
          : <VisitorNav />
        }
      </div>
    </div>
);
};

export default Banner;