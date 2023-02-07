import React, {useContext} from "react";
import {startGame, cancelGame} from "./ButtonFunctions.js";
import { UserContext } from '../../../App.js';
import { GameContext } from '../Game.js';

export default function HostButtonsBegin({setGame, setBoard}) {

  const user = useContext(UserContext);
  const game = useContext(GameContext);

  return (
    <div>
      <button onClick={(e) => startGame(game.id, setGame, setBoard)}>Start Game</button>
      <button onClick={(e) => cancelGame(game.id)}>Cancel Game</button>
      <button>Invite Players</button>
      <button>Remove Players</button>
      <button>Message Players</button>
    </div>
  );
};