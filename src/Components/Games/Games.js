import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Game from './Game.js';
import GameOptions from './GameOptions.js';

import { LoggedInContext, UserContext } from '../../App';

function Games() {
  
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState({});

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
  }, []);
  
  async function fetchGames(userId) {
    const response = await fetch(`users/${userId}/games`);
    if (response.ok) {
      const pkgs = await response.json();
      setGames(pkgs);
      setSelectedGame(pkgs[0]);
    }
  };

  function handleSelect(value) {
    setSelectedGame(games.find((game) => game.game.id == value));
  };

  return (
    <div>
      <div>
        <select onChange={(e) => handleSelect(e.target.value)}>
          {
            games.length > 0 ?
              games.map((game) =>
                <GameOptions
                    key={`game${game.game.id}`}
                    game={game.game}
                    selectedGame={selectedGame}
                    setSelectedGame={setSelectedGame}
                />
              )
            : <option value={null}>No games available</option>

          }
        </select>
      </div>
      {
        Object.keys(selectedGame).length > 0 ?
          <Game gamePkg={selectedGame} />
        : <></>
      }
    </div>
  );
};

/*
      {
        isLoaded ?
          <div className="game_container">
            <Board gameInit={games[0].game} boardInit={games[0].board} setGames={setGames} />
          </div>
        : <h3>Loading...</h3>
      } 
*/
export default Games;