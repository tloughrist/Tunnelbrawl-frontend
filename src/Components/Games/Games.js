import React, { useState, useEffect, useContext } from "react";
import Board from "./Board.js";
import { LoggedInContext, UserContext } from '../../App';

function Games() {
  
  const [games, setGames] = useState([]);

  const isLoggedIn = useContext(LoggedInContext);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchGames(user.id);
    }
  }, [user]);
  
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