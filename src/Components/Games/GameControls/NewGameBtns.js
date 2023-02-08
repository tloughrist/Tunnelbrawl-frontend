import React, { useState, useContext } from "react";
import { UserContext } from '../../../App.js';
import createGame from '../Fetching/CreateGame.js';
import Popup from 'reactjs-popup';

export default function NewGameBtns({ games, setGames, setGame }) {

  const user = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [publicity, setPublicity] = useState(false);
  const [email, setEmail] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    const gamePkg = await createGame(user.id, title, publicity, email);
    setGames = [...games, gamePkg];
    setGame(gamePkg);
  };

  return (
    <div>
      <Popup trigger={<button> Create New Game </button>} position="bottom center">
        <div>
          <form onSubmit={(e) => handleSubmit(e, user.id, title, publicity, email)}>
            <label>Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>Email Notifications?
              <input
                type="checkbox"
                checked={email}
                onChange={(e) => setEmail(!email)}
              />
            </label>
            <label>Public?
              <input
                type="checkbox"
                checked={publicity}
                onChange={(e) => setPublicity(!publicity)}
              />
            </label>
            <input type="submit" />
          </form>
        </div>
      </Popup>
    </div>
  );
};