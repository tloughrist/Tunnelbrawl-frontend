import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import HostButtonsMid from './GameControls/HostBtnsMid.js';
import HostButtonsBegin from './GameControls/HostBtnsBegin.js';
import GuestButtons from './GameControls/GuestBtns.js';
import PlayingField from './Board/Components/PlayingField.js';
import { UserContext } from '../../App.js';
import { GamesContext } from './Games.js';
import { convert } from './Helpers/Converters.js';

export const GameContext = createContext();
export const BoardContext = createContext();
export const ColorContext = createContext();
export const BoardIdContext = createContext();
export const ActivePieceContext = createContext();

export default function Game({ gamePkg, setGames }) {

  const [boardId, setBoardId] = useState(gamePkg.board.id);
  const user = useContext(UserContext);
  const games = useContext(GamesContext);
  const setterBundle = {setGames: setGames, setActivePiece: setActivePiece};
  const [game, _setGame] = useState(gamePkg.game);
  const [board, _setBoard] = useState(convert(gamePkg.board, setterBundle));
  const [color, _setColor] = useState(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
  const [activePiece, _setActivePiece] = useState();
  const isHost = gamePkg.game.host_id === user.id;
  const gameRef = useRef(game);
  const boardRef = useRef(board);
  const colorRef = useRef(color);
  const activeRef = useRef(activePiece);

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

  function setActivePiece(data) {
    _setActivePiece(data);
    activeRef.current = data;
  };

  useEffect(() => {
    if (Object.keys(gamePkg).length > 0) {
      setGame(gamePkg.game);
      setBoard(convert(gamePkg.board, setterBundle));
      setBoardId(gamePkg.board.id)
      setColor(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
    }
  }, [gamePkg])
  
  return (
    <GameContext.Provider value={gameRef.current}>
      <BoardContext.Provider value={boardRef.current}>
        <ColorContext.Provider value={colorRef.current}>
          <BoardIdContext.Provider value={boardId}>
            <ActivePieceContext.Provider value={activeRef.current}>
              <div>
                {
                  isHost ?
                    game.status === "pending" ?
                      <HostButtonsBegin games={games} setGames={setGames} />
                    : <HostButtonsMid games={games} setGames={setGames} />
                  : <GuestButtons />
                }
                <PlayingField setterBundle={setterBundle} />
              </div>
            </ActivePieceContext.Provider>
          </BoardIdContext.Provider>
        </ColorContext.Provider>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
};