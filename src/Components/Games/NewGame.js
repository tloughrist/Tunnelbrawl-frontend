import React from "react";
import BlankBoard from './Board/Components/BlankBoard.js';
import NewGameButtons from './GameControls/NewGameBtns.js';

export default function NewGame({ games, setGames, setGame }) {

  return (
    <div>
      <div>
        <NewGameButtons  games={games} setGames={setGames} setGame={setGame} />
      </div>
      <div>
        <BlankBoard />
      </div>
    </div> 
  );
};