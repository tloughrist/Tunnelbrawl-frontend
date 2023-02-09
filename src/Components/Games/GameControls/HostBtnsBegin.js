import React, {useContext} from "react";
import {startGame, cancelGame} from "./ButtonFunctions.js";
import { UserContext } from '../../../App.js';
import { GameContext } from '../Game.js';
import { convert } from '../Helpers/Converters.js';

export default function HostButtonsBegin({ games, setGames }) {

  const user = useContext(UserContext);
  const game = useContext(GameContext);

  async function handleStart() {
    const gamePkg = await startGame(game.id);
    const gamesSans = games.filter((pkg) => pkg.game.id !== gamePkg.game.id);
    const newGames = [...gamesSans, gamePkg];
    setGames(newGames);
  };

  async function handleCancel() {
    cancelGame(game.id);
  }

  return (
    <div>
      <button onClick={handleStart}>Start Game</button>
      <button onClick={handleCancel}>Cancel Game</button>
      <button>Invite Players</button>
      <button>Remove Players</button>
      <button>Message Players</button>
    </div>
  );
};