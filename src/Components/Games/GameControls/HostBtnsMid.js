import React, { useContext } from "react";
import { restartGame, cancelGame } from "./ButtonFunctions.js";
import { UserContext } from '../../../App';
import { GameContext } from '../Game.js';

export default function HostButtonsMid({ games, setGames, setSelectedGame }) {

  const user = useContext(UserContext);
  const game = useContext(GameContext);

  async function handleRestart() {
    const gamePkg = await restartGame(game.id);
    const gamesSans = games.filter((pkg) => pkg.game.id !== gamePkg.game.id);
    const newGames = [...gamesSans, gamePkg];
    setGames(newGames);
  };

  async function handleCancel() {
    const gamePkgs = await cancelGame(game.id);
    setSelectedGame("none");
    setGames(gamePkgs);
  };

  return (
    <div>
      <button onClick={handleRestart}>Restart Game</button>
      <button onClick={handleCancel}>Cancel Game</button>
    </div>
  );
};