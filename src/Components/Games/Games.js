import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Game from './Game.js';
import GameOptions from './GameOptions.js';
import NewGame from './NewGame.js';
import fetchGames from './Fetching/FetchGames.js';
import submitUser from './Fetching/UpdateUser.js';
import { LoggedInContext, UserContext } from '../../App';

function Games({ setUser }) {
  
  const isLoggedIn = useContext(LoggedInContext);
  const user = useContext(UserContext);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    async function gameProvider(userId) {
      const gamePkgs = await fetchGames(userId);
      setGames(gamePkgs);
    }
    if (Object.keys(user).length > 0) {
      gameProvider(user.id);
      setSelectedGame(user.current_game);
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

  async function handleSelect(value) {
    setSelectedGame(value);
    const updatedUser = await submitUser(user.id, {...user, current_game: value})
    setUser(updatedUser);
  };
  console.log(games)

  return (
    <div>
      <div>
        <select onChange={(e) => handleSelect(e.target.value)}>
          <option value={"none"}>New Game</option>
          {
            games.length > 0 ?
              games.map((game) =>
                <GameOptions
                  key={`game${game.game.id}`}
                  game={game.game}
                  selectedGame={selectedGame}
                />
              )
            : <option value={{}}>No games available</option>
          }
        </select>
      </div>
        {
          selectedGame !== "none" && games.length > 0 ?
            <Game gamePkg={games.find((game) => game.game.id == parseInt(selectedGame))} games={games} setGames={setGames} />
          : <NewGame games={games} setGames={setGames} setGame={setSelectedGame} />
        }
    </div>
  );
};

export default Games;