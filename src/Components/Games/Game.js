import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { UserContext } from '../../App';
import HostButtonsMid from './GameControls/HostBtnsMid.js';
import HostButtonsBegin from './GameControls/HostBtnsBegin.js';
import GuestButtons from './GameControls/GuestBtns.js';
import PlayingField from './Board/PlayingField.js';
import { convert } from './Converters.js';

export const GameContext = createContext();
export const BoardContext = createContext();
export const ColorContext = createContext();

export default function Game({gamePkg}) {

  const user = useContext(UserContext);

  const [game, _setGame] = useState(gamePkg.game);
  const [board, _setBoard] = useState(convert(gamePkg.board));
  const [color, _setColor] = useState(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);

  const gameRef = useRef(game);
  const boardRef = useRef(board);
  const colorRef = useRef(color);

  function setGame(data) {
    _setGame(data);
    gameRef.current = data;
  };

  function setBoard(data) {
    _setBoard(data);
    boardRef.current = data;
  };

  function setColor(data) {
    _setColor(data);
    colorRef.current = data;
  };

  useEffect(() => {
    setGame(gamePkg.game);
    setBoard(convert(gamePkg.board));
    setColor(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
  }, [gamePkg])

  const isHost = gamePkg.game.host_id === user.id;

  return (
    <GameContext.Provider value={game}>
      <BoardContext.Provider value={board}>
        <ColorContext.Provider value={color}>
          <div>
            {
              isHost ?
                game.status === "pending" ?
                  <HostButtonsBegin setGame={setGame} setBoard={setBoard} />
                : <HostButtonsMid setGame={setGame} setBoard={setBoard}/>
              : <GuestButtons setGame={setGame} />
            }
            <PlayingField />
          </div>
        </ColorContext.Provider>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
};