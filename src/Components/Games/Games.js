import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Board from "./Board.js";
import { LoggedInContext, UserContext } from '../../App';

function Games() {
  
  const [games, setGames] = useState([]);

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
      const gmes = await response.json();
      setGames(gmes);
    }
  };

  return (
    <div>
      <div className="game_container">
        <Board game={games[0]} games={games} setGames={setGames} />
      </div>
    </div>
  );
};

export default Games;