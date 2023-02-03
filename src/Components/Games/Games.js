import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board.js";
import { LoggedInContext, UserContext } from '../../App';

function Games() {
  
  const [games, setGames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const isLoggedIn = useContext(LoggedInContext);
  const user = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchGames(user.id);
    }
  }, [user]);

  useEffect(() => {
    function sendHome(logStatus) {
      if (logStatus === false) {
        navigate("/home");
      }
    }
    sendHome(isLoggedIn);
  }, [])
  
  async function fetchGames(userId) {
    const response = await fetch(`users/${userId}/games`);
    if (response.ok) {
      const pkgs = await response.json();
      setGames(pkgs);
      setIsLoaded(true);
    }
  };

  return (
    <div>
      {
        isLoaded ?
          <div className="game_container">
            <Board game={games[0].game} board={games[0].board} setGames={setGames} />
          </div>
        : <h3>Loading...</h3>
      } 
    </div>
  );
};

export default Games;