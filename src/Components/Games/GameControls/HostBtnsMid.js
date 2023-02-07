import React, { useContext } from "react";
import { restartGame, cancelGame } from "./ButtonFunctions.js";
import { UserContext } from '../../../App';

export default function HostButtonsMid({gameData}) {

  const user = useContext(UserContext);

  return (
    <div>
      <button onClick={(e) => restartGame(gameData)}>Restart Game</button>
      <button onClick={(e) => cancelGame(gameData)}>Cancel Game</button>
      <button>Message Players</button>
    </div>
  );
};