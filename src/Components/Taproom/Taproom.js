import React, { useContext } from "react";
import { LoggedInContext, FriendsContext } from '../../App';

function Taproom() {

  const isLoggedIn = useContext(LoggedInContext);
  const friends = useContext(FriendsContext);

  console.log(friends)

  return (
    <div>
      <h3>Taproom</h3>
    </div>
  );
};

export default Taproom;