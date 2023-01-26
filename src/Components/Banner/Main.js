import React, { useContext } from "react";
import UserNav from "./UserNav";
import VisitorNav from "./VisitorNav";
import { LoggedInContext } from '../../App';

function Banner() {

  const isLoggedIn = useContext(LoggedInContext);

  return (
    <div className="display-container">
      {
        //Switches between navbars depending on login status
        isLoggedIn?
          <UserNav />
        : <VisitorNav />
      }
    </div>
);
};

export default Banner;