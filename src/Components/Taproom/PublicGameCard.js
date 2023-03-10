import React, { useContext } from "react";
import joinGame from "./Fetching/JoinGame.js";
import { UserContext } from '../../App';

function PublicGameCard( game, handleJoin ) {

  const current_game = game.game;
  const user = useContext(UserContext);

  function handleClick() {
    const publicGames = joinGame(current_game.id, user.id);
    handleJoin(publicGames);
  };

  return (
    <div className="game_card">
      <p><b>{current_game.title}</b></p>
      <p><b>Players:</b></p>
      {current_game.players.map((player) => <p>{player}</p>)}
      <p><b>Game Type: </b>{current_game.email_notifications ? "asynchronous" : "synchronous"}</p>
      <button onClick={(e) => handleClick()}>Join</button>
    </div>
  );
};

export default PublicGameCard;