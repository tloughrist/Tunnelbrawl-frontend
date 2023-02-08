import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Game from './Game.js';
import GameOptions from './GameOptions.js';
import fetchGames from './Fetching/FetchGames.js';
import NewGame from './NewGame.js';

import { LoggedInContext, UserContext } from '../../App';

function Games() {
  
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState({});

  const isLoggedIn = useContext(LoggedInContext);
  const user = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function gameProvider(userId) {
      const gamePkgs = await fetchGames(userId);
      setGames(gamePkgs);
    }
    if (user) {
      gameProvider(user.id);
    }
  }, [user]);
  
  useEffect(() => {
    function sendHome(logStatus) {
      if (logStatus === false) {
        navigate("/home");
      }
    }
    sendHome(isLoggedIn);
  }, [isLoggedIn, navigate]);

  function handleSelect(value) {
    setSelectedGame(games.find((game) => game.game.id == value));
  };

  return (
    <div>
      <div>
        <select onChange={(e) => handleSelect(e.target.value)}>
          <option value={{}}>New Game</option>
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
            : <option value={{}}>No games available</option>
          }
        </select>
      </div>
      {
        Object.keys(selectedGame).length > 0 ?
          <Game gamePkg={selectedGame} />
        : <NewGame games={games} setGames={setGames} setGame={setSelectedGame} />
      }
    </div>
  );
};

export default Games;