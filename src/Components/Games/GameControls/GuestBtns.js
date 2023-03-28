import React, {useContext} from "react";
import {leaveGame} from "./ButtonFunctions.js";
import { UserContext } from '../../../App';

export default function GuestButtons({ game, setGames, setSelectedGame }) {

  const user = useContext(UserContext);

  const player = game.players.find((player) => player.user_id === user.id);

  async function handleClick() {
    const gamesPkg = await leaveGame(player.id);
    console.log(gamesPkg)
    setGames(gamesPkg);
    setSelectedGame("none");
  };

  return (
    <div>
      {
        game.status === "pending" ?
          <button onClick={handleClick}>Leave Game</button>
        : <></>
      }
        </div>
  );
};