import React, { useState, useContext } from "react";
import { UserContext } from '../../../App.js';
import createGame from '../Fetching/CreateGame.js';
import Popup from 'reactjs-popup';

export default function NewGameBtns({ games, setGames, setGame }) {

  const user = useContext(UserContext);

  const [title, setTitle] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    const gamePkg = await createGame(user.id, title);
    setGames = [...games, gamePkg];
    setGame(gamePkg);
  };

  return (
    <div>
      <Popup trigger={<button> Create New Game </button>} position="bottom center">
        <div>
          <form onSubmit={(e) => handleSubmit(e, user.id, title)}>
            <label>Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <input type="submit" />
          </form>
        </div>
      </Popup>
    </div>
  );
};