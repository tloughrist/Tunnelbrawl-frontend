import React from "react";

function PublicGameCard( game ) {

  const current_game = game.game

  function joinGame() {
    
  }

  return (
    <div className="game_card">
      <p><b>{current_game.title}</b></p>
      <p><b>Players:</b></p>
      {current_game.players.map((player) => <p>{player}</p>)}
      <p><b>Game Type: </b>{current_game.email_notifications ? "asynchronous" : "synchronous"}</p>
      <button onClick={joinGame()}>Join</button>
    </div>
  );
};

export default PublicGameCard;