import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, FriendsContext } from '../../App';

function Taproom() {

  const isLoggedIn = useContext(LoggedInContext);
  const friends = useContext(FriendsContext);

  const navigate = useNavigate();

  useEffect(() => {
    function sendHome(logStatus) {
      if (logStatus === false) {
        navigate("/home");
      }
    }
    sendHome(isLoggedIn);
  }, [])

  return (
    <div>
      <h3>Taproom</h3>
    </div>
  );
};

export default Taproom;