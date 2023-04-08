import React from "react";
import BlankBoard from '../Board/blankboard.js';
import NewGameButtons from '../GameControls/newgamebtns.js';

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