import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import HostButtonsMid from './GameControls/HostBtnsMid.js';
import HostButtonsBegin from './GameControls/HostBtnsBegin.js';
import GuestButtons from './GameControls/GuestBtns.js';
import PlayingField from './Board/Components/PlayingField.js';
import { UserContext } from '../../App.js';
import { convert } from './Helpers/Converters.js';

export const GameContext = createContext();
export const BoardContext = createContext();
export const ColorContext = createContext();
export const BoardIdContext = createContext();
export const ActivePieceContext = createContext();

export default function Game({ gamePkg, setGames }) {

  const [boardId, setBoardId] = useState();

  const user = useContext(UserContext);

  const [game, _setGame] = useState(gamePkg.game);
  const [board, _setBoard] = useState(convert(gamePkg.board, setBoard, setActivePiece, setGames, setGame));
  const [color, _setColor] = useState(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
  const [activePiece, _setActivePiece] = useState();

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
      setBoard(convert(gamePkg.board, setBoard, setActivePiece, setGames, setGame));
      setBoardId(gamePkg.board.id)
      setColor(gamePkg.game.players.find(({user_id}) => user_id === user.id).color);
    }
  }, [gamePkg])

  const isHost = gamePkg.game.host_id === user.id;

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
                      <HostButtonsBegin setGame={setGame} setBoard={setBoard} />
                    : <HostButtonsMid setGame={setGame} setBoard={setBoard}/>
                  : <GuestButtons setGame={setGame} />
                }
                <PlayingField setBoard={setBoard} />
              </div>
            </ActivePieceContext.Provider>
          </BoardIdContext.Provider>
        </ColorContext.Provider>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
};